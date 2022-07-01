export default class Actions {

    minPrice
    maxPrice

    constructor() {
        this.rangeInput = document.querySelectorAll('.price-range__input')  // input range
        this.priceInput = document.querySelectorAll('.price-bottom__input')  // input number price
        this.price = document.querySelector('.price')  // div price hav all inputs  // price-range mb class without price
        this.valuesPrice = document.querySelector('.price-values')  // div, hav 2 input number - price
        this.range = document.querySelector('.price-slider .price-slider__progress')  // div slider range
        this.fixedMin = this.priceInput[0].value  // fixed value min
        this.priceGap = 5000  // fixed range between two-sliders
    }

    minMaxPrice(json, action) {  // method find min and max price
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

    renderPriceValue(json) {  // inputs add attributes
        this.priceInput[0].value = this.minMaxPrice(json, 'min')
        this.priceInput[1].value = this.minMaxPrice(json, 'max')

        this.rangeInput[0].min = this.minMaxPrice(json, 'min')
        this.rangeInput[0].max = this.minMaxPrice(json, 'max')
        this.rangeInput[1].min = this.minMaxPrice(json, 'min')
        this.rangeInput[1].max = this.minMaxPrice(json, 'max')
        this.rangeInput[0].value = this.minMaxPrice(json, 'min')
        this.rangeInput[1].value = this.minMaxPrice(json, 'max')
    }

    // new stuff
    inputValue() {  // method for input number
        this.priceInput.forEach(input => {
            input.addEventListener('input', e => {
                this.minPrice = parseInt(this.priceInput[0].value)
                this.maxPrice = parseInt(this.priceInput[1].value)

                if ((this.maxPrice - this.minPrice >= this.priceGap) && this.maxPrice <= this.rangeInput[1].max) {
                    if (e.target.classList.contains('price-min')) {
                        this.rangeInput[0].value = this.minPrice
                        this.range.style.left = (((this.minPrice - this.fixedMin) / (this.rangeInput[0].max - this.fixedMin)) * 100) + '%'
                    } else {
                        this.rangeInput[1].value = this.maxPrice
                        this.range.style.right = 100 - ((this.maxPrice - this.fixedMin) / (this.rangeInput[1].max - this.fixedMin)) * 100 + '%'
                    }
                }
            })
        })
    }

    inputRangeValue() {  // method for input range
        this.rangeInput.forEach(input => {
            input.addEventListener('input', e => {
                this.minPrice = parseInt(this.rangeInput[0].value)
                this.maxPrice = parseInt(this.rangeInput[1].value)

                if (this.maxPrice - this.minPrice < this.priceGap) {
                    if (e.target.classList.contains('range-min')) {
                        this.rangeInput[0].value = this.maxPrice - this.priceGap
                    } else {
                        this.rangeInput[1].value = this.minPrice + this.priceGap
                    }
                } else {
                    this.priceInput[0].value = this.minPrice
                    this.range.style.left = (((this.minPrice - this.fixedMin) / (this.rangeInput[0].max - this.fixedMin)) * 100) + '%'
                    this.priceInput[1].value = this.maxPrice
                    this.range.style.right = 100 - ((this.maxPrice - this.fixedMin) / (this.rangeInput[1].max - this.fixedMin)) * 100 + '%'
                }
            })
        })
    }
    // new stuff
}