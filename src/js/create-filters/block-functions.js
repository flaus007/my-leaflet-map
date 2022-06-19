import Range from './range-options'

export default class Actions {

    constructor() {
        this.rangeInput = document.querySelectorAll('.price-range__input')
        this.priceInput = document.querySelectorAll('.price-bottom__input')
        this.price = document.querySelector('.price')
        this.bot = document.querySelector('.price-bottom')
        this.input = new Range(this.rangeInput, this.priceInput)
    }

    conditionsForSelects(e, wrapper, list, zeroItem) {
        list.forEach(li => {
            if (e.target === li) {
                if (zeroItem.classList.contains('streetlist__search')) {
                    zeroItem.value = li.outerText;
                } else if (zeroItem.classList.contains('open__zero')) {
                    zeroItem.innerHTML = li.outerText;
                }
            }
        })
        if (e.target === zeroItem && !wrapper.classList.contains('open')) {
            wrapper.classList.add('open')
            list.forEach(street => street.classList.add('open'))
            return
        } else {
            wrapper.classList.remove('open')
            list.forEach(street => street.classList.remove('open'))
            return
        }
    }

    openCloseModalStreet() {
        const list = document.querySelector('.streetlist')
        const li = document.querySelectorAll('.streetlist__li')
        const search = document.querySelector('.streetlist__search')
        document.addEventListener('click', (e) => {
            this.conditionsForSelects(e, list, li, search)
        })
    }

    openCloseModalRooms() {
        const list = document.querySelector('.rooms-filter-options')
        const li = document.querySelectorAll('.rooms-filter-options__value')
        const first = document.querySelector('.open__zero')
        document.addEventListener('click', (e) => {
            this.conditionsForSelects(e, list, li, first)
        })
    }

    minMaxPrice(json, action) {
        const arr = []
        json.map(flat => arr.push(flat.price))
        if (action === 'min') {
            let minPrice = Math.min(...arr)
            return minPrice
        }
        if (action === 'max') {
            let maxPrice = Math.max(...arr)
            return maxPrice
        }
    }

    renderPriceValue(json) {
        this.priceInput[0].value = this.minMaxPrice(json, 'min')
        this.priceInput[1].value = this.minMaxPrice(json, 'max')
        this.rangeInput[0].min = this.minMaxPrice(json, 'min')
        this.rangeInput[0].max = this.minMaxPrice(json, 'max')
        this.rangeInput[1].min = this.minMaxPrice(json, 'min')
        this.rangeInput[1].max = this.minMaxPrice(json, 'max')
        this.rangeInput[0].value = this.minMaxPrice(json, 'min')
        this.rangeInput[1].value = this.minMaxPrice(json, 'max')
    }

    inputPrice() {
        this.price.addEventListener('input', event => {
            this.input.inputSlider(event)
        })

        this.bot.addEventListener('input', event => {
            this.input.inputValue(event)
        })
    }
}