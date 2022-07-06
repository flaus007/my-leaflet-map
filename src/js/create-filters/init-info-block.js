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
        this.infoForm.loaded(jsonFlats[0])  // add to info block first card
        this.infoForm.loaded(jsonFlats[1])  // add to info block second casrc/js/create-filters/dynamic-add-info.jsrd


        this.range.renderPriceValue(jsonFlats)
        this.range.inputValue()  // logic for inputs number
        this.range.inputRangeValue()  // logic for inputrs range
    }

    optionsForSelect() {
        this.infoForm.openCloseModalRooms()  // open and close rooms
    }
    
    initCards(json) {
        json.forEach(item => this.infoForm.loaded(item))
    }

    windowScroll(jsonFlats) {  // dynamic add card on scroll document
        let j = 2
        const cards = document.querySelector('.cards')
        window.addEventListener('scroll', () => {
            if (!cards.classList.contains('active')) {
                const documentRec = document.documentElement.getBoundingClientRect()
                if (documentRec.bottom < document.documentElement.clientHeight + 100) {
                    this.infoForm.loaded(jsonFlats[j])
                    j++
                }
            }
        })
    }
}