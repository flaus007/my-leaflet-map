import CreateForm from "./dynamic-add-info"
import Actions from "./block-functions"

export default class FiltersForm {

    constructor() {
        this.form = new CreateForm()
        this.open = new Actions()
        this.card = document.querySelector('.cards')
    }

    initStreetList(jsonFlats) {
        this.open.openCloseModalStreet()
        this.open.openCloseModalRooms()
        this.open.renderPriceValue(jsonFlats)
        this.open.inputPrice()

        this.form.createSelectStreet(jsonFlats)
        this.form.loaded(jsonFlats[0])
        this.form.loaded(jsonFlats[1])
    }

    windowScroll(jsonFlats) {
        let j = 2
        window.addEventListener('scroll', () => {
            const documentRec = document.documentElement.getBoundingClientRect()
            if (documentRec.bottom < document.documentElement.clientHeight + 100) {
                this.form.loaded(jsonFlats[j])
                j++
            }
        })
    }
}