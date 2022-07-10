export default class LogicActions {

    readerUrl(file, gallery) {
        const reader = new FileReader()

        reader.onload = event => {
            const src = event.target.result
            gallery.insertAdjacentHTML('afterbegin',
                `
                <div class="gallery__image">
                    <div class="gallery__remove" data-close="${file.name}">&times;</div>
                    <img src="${src}" alt="${file.name}" class="js-gallery-photo"/>
                </div>
                `)
        }

        reader.readAsDataURL(file)
    }

    removeImage(e, gallery, files) {  // вынести в другой файл
        if (!e.target.dataset.close) {
            return
        }
        const { close } = e.target.dataset
        files = files.filter(file => file.close !== close)
        const block = gallery.querySelector(`[data-close="${close}"]`).closest('.gallery__image')
        block.remove()
    }

    repeatableOptions(e, selector, option, newFlat) {
        if (selector === 'js-image') {
            if (e.target.files.length !== 0) {
                setTimeout(() => this.getPhoto(newFlat, option), 1500)
            }
        }
        if (e.target.dataset.info === selector) {
            newFlat[option] = e.target.value
            const val = e.target.value
            this.copiedCard(option, val)
        }
    }

    copiedCard(option, val) {
        document.querySelector(`.js-${option}`).innerText = val
    }

    getPhoto(newFlat, option) {
        const photos = document.querySelectorAll('.js-gallery-photo')
        const fullPhoto = []
        photos.forEach(item => fullPhoto.push(item.src))
        newFlat[option] = fullPhoto
        const cardPhoto = document.querySelector('.js-form-photo')
        cardPhoto.src = newFlat.image[0]
    }

    clearInputs() {
        const inputs = document.querySelectorAll('.js-input')
        console.log(inputs)
        inputs.forEach(input => input.value = '')
    }

    async fetchCoordinate(newFlat) {
        const city = newFlat.city
        const street = newFlat.street.split(' ')
        const res = encodeURI(street)
        try {
            await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}%2C%20${res}&key=a5a63ff76d054e639ce9eba2035b526d`)
                .then(response => response.json())
                .then(res => {
                    newFlat.lat = res.results[0].geometry.lat
                    newFlat.lng = res.results[0].geometry.lng
                })
        } catch (error) {
            console.log(error)
        }
    }

    async postFlat(newFlat) {
        const modal = document.querySelector('.modal')
        modal.classList.add('js-hide')
        console.log(newFlat)
        try {
            const response = await fetch('http://site-constructor.stage/addflat.php', {
                method: 'POST',
                body: JSON.stringify(newFlat)
            })
            return response
        } catch(error) {
            console.log(error)
        }
    }
}