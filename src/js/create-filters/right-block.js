import Actions from "./block-functions"
import FiltersForm from "./init-info-block"
import CreateForm from "./dynamic-add-info"

export default class FunctionalRightBlock {

    constructor() {
        this.init = new FiltersForm()
        this.refresh = new Actions()
        this.form = new CreateForm()
    }

    initRightBlock(jsonFlats) {
        this.init.initStreetList(jsonFlats)
        this.init.windowScroll(jsonFlats)
    }

    selectFunc() {
        this.init.optionsForSelect()
    }

    initFiltersRightBlock(json) {
        this.init.initCards(json)
        this.init.windowScroll(json)
    }

    refreshingPrice(json) {
        const slider = document.querySelector('.price-slider__progress')
        slider.style.left = 0
        slider.style.right = 0
        this.refresh.renderPriceValue(json)
        this.form.rollbackToTheStandart()
    }

    clearCardsBlock() {
        const block = document.querySelector('.cards')
        block.innerHTML = ''
        block.classList.add('active')
    }

    searchStreet(e) {
        let word = e.target.value.trim()
        const list = document.querySelectorAll('.streetlist__li')
        list.forEach(li => {
            if (li.innerText.toLowerCase().includes(word) || li.innerText.includes(word)) {
                li.classList.add('open')
            } else {
                li.classList.remove('open')
            }
        })
    }
}