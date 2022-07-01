import CreateForm from "./dynamic-add-info"
import Actions from "./block-functions"

export default class FiltersForm {

    constructor() {
        this.infoForm = new CreateForm()
        this.range = new Actions()
        this.card = document.querySelector('.cards')
    }

    initStreetList(jsonFlats) {   // all methods for functional selects street and rooms and inputs
        this.infoForm.createSelectStreet(jsonFlats)  // create select street
        this.infoForm.openCloseModalStreet()  // open and close street
        this.infoForm.openCloseModalRooms()  // open and close rooms
        this.infoForm.loaded(jsonFlats[0])  // add to info block first card
        this.infoForm.loaded(jsonFlats[1])  // add to info block second card


        this.range.renderPriceValue(jsonFlats)
        this.range.inputValue()  // logic for inputs number
        this.range.inputRangeValue()  // logic for inputrs range
    }

    windowScroll(jsonFlats) {  // dynamic add card on scroll document
        let j = 2
        window.addEventListener('scroll', () => {
            const documentRec = document.documentElement.getBoundingClientRect()
            if (documentRec.bottom < document.documentElement.clientHeight + 100) {
                this.infoForm.loaded(jsonFlats[j])
                j++
            }
        })
    }
}