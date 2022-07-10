import LogicActions from "./form-actions"

export default class Upload {

    files = []
    newFlat = {}
    logic = new LogicActions()

    constructor() {
        this.input = document.querySelector('#file')
        this.btnOpen = document.querySelector('.btn-open')
        this.btnSend = document.querySelector('.btn-send')
    }

    triggerInput() {
        this.input.click()
    }
    

    openForm(e) {  // open and close form
        const modal = document.querySelector('.modal'),
            add = document.querySelector('.btn-post')

        if (e.target === add || e.target.classList.contains('post')) {
            this.logic.clearInputs()
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
            this.logic.readerUrl(file, gallery)
        })
    }

    deleteImage() {
        const gallery = document.querySelector('.gallery')
        gallery.addEventListener('click', (e) => this.logic.removeImage(e, gallery, this.files))
    }

    collectInfoObject(e) {
        this.logic.repeatableOptions(e, e.target.dataset.info, e.target.name, this.newFlat)
    }

    async sendForm() {
        const inputs = document.querySelectorAll('.js-input')
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value.length === 0) {
                console.log(inputs[i])
                inputs[i].style.border = '1px solid red'
                return
            }
        }
        this.newFlat['date'] = new Date().toLocaleDateString()
        await this.logic.fetchCoordinate(this.newFlat)
        console.log(this.newFlat)
        await this.logic.postFlat(this.newFlat)
    }
}