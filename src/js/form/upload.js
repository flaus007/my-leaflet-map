export default class Upload {

    files = []

    constructor() {
        this.input = document.querySelector('#file')
        this.btnOpen = document.querySelector('.btn-open')
    }

    triggerInput() {
        this.input.click()
    }

    openForm(e) {  // open and close form
        const modal = document.querySelector('.modal'),
            add = document.querySelector('.btn-post')

        if (e.target === add || e.target.classList.contains('post')) {
            modal.classList.remove('js-hide')
            return
        }
        if (e.target.classList.contains('overflow') || e.target.classList.contains('close')) {
            modal.classList.add('js-hide')
            return
        }
    }

    createBlockForImage() {
        const gallery = document.createElement('div'),
            spanOpen = document.querySelector('.js-btn-open')
        gallery.classList.add('gallery')
        spanOpen.insertAdjacentElement('afterend', gallery)
    }

    changeHandler(e) {
        const gallery = document.querySelector('.gallery')
        console.log(e.target.files)
        if (!e.target.files.length) {
            return
        }

        this.files = Array.from(e.target.files)

        gallery.innerHTML = ''  // off or on 
        this.files.forEach(file => {
            if (!file.type.match('image')) {
                return
            }
            this.readerUrl(file, gallery)
        })
    }

    readerUrl(file, gallery) {
        const reader = new FileReader()

        reader.onload = event => {
            const src = event.target.result
            gallery.insertAdjacentHTML('afterbegin',
                `
                <div class="gallery__image">
                    <div class="gallery__remove" data-close="${file.name}">&times;</div>
                    <img src="${src}" alt="${file.name}" />
                </div>
                `)
        }

        reader.readAsDataURL(file)
    }

    deleteImage() {
        const gallery = document.querySelector('.gallery')
        gallery.addEventListener('click', (e) => this.removeImage(e, gallery))
    }

    removeImage(e, gallery) {
        if (!e.target.dataset.close) {
            return 
        }
        const { close } = e.target.dataset
        console.log(name)
        this.files = this.files.filter(file => file.close !== close)

        const block = gallery.querySelector(`[data-close="${close}"]`).closest('.gallery__image')

        block.remove()
    }
}