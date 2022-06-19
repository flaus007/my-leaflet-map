import Range from './range-options'

export default class Actions {

    constructor() {
        this.rangeInput = document.querySelectorAll('.price-range__input')
        this.priceInput = document.querySelectorAll('.price-bottom__input')
        this.price = document.querySelector('.price')
        this.bot = document.querySelector('.price-bottom')
        this.input = new Range(this.rangeInput, this.priceInput)
    }

    async openCloseModalStreet() {
        const list = document.querySelector('.streetlist')
        const li = document.querySelectorAll('.streetlist__li')
        const search = document.querySelector('.streetlist__search')
        console.log(li)
        document.addEventListener('click', (e) => {
            li.forEach(st => {
                console.log(st)
                if (e.target === st) {
                    search.value = st.outerText;
                }
            })
            if (e.target === search && !list.classList.contains('show')) {
                list.classList.add('show')
                li.forEach(street => street.classList.add('active'))
                return
            } else {
                list.classList.remove('show')
                li.forEach(street => street.classList.remove('active'))
                return
            }
        })
    }

    openCloseModalRooms() {
        const list = document.querySelector('.rooms-filter-options')
        const li = document.querySelectorAll('.rooms-filter-options__value')
        const first = document.querySelector('.open__zero')
        document.addEventListener('click', (e) => {
            li.forEach(l => {
                if (e.target === l) {
                    first.innerHTML = l.outerText
                }
            })
            if (e.target === first && !list.classList.contains('open')) {
                list.classList.add('open')
                li.forEach(l => l.classList.add('open'))
                return
            } else {
                list.classList.remove('open')
                li.forEach(l => l.classList.remove('open'))
                return
            }
        })
    }

    minMaxPrice(json, action) {
        const arr = []
        json.map(flat => arr.push(flat))
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