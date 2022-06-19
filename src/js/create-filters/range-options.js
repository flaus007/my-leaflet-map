export default class Range {

    minPrice
    maxPrice

    constructor(inputRange, inputPrice) {
        this.priceGap = 5000
        this.range = document.querySelector('.price-slider .price-slider__progress')
        this.inputRange = inputRange
        this.inputPrice = inputPrice
        this.fixedMin = inputPrice[0].value
    }

    rangePosition(e, input, inputS, min, max) {
        if (e.target.classList.contains('js-min')) {
            input[0].value = min
            this.range.style.left = (((min - this.fixedMin) / (inputS[0].max - this.fixedMin)) * 100) + '%'
        }
        if (e.target.classList.contains('js-max')) {
            input[1].value = max
            this.range.style.right = 100 - ((max - this.fixedMin) / (inputS[1].max - this.fixedMin)) * 100 + '%'
        }
    }

    inputValue(e) {
        this.minPrice = parseInt(this.inputPrice[0].value),
        this.maxPrice = parseInt(this.inputPrice[1].value)
        if ((this.maxPrice - this.minPrice >= this.priceGap) && this.maxPrice <= this.inputRange[1].max) {
            this.rangePosition(e, this.inputRange, this.inputRange, this.minPrice, this.maxPrice)
        }
    }

    inputSlider(e) {
        this.minPrice = parseInt(this.inputRange[0].value),
        this.maxPrice = parseInt(this.inputRange[1].value)
        if ((this.maxPrice - this.minPrice) < this.priceGap) {
            if (e.target.classList.contains('range-min')) {
                this.inputRange[0].value = this.maxPrice - this.priceGap
            } else {
                this.inputRange[1].value = this.minPrice + this.priceGap
            }
        } else {
            this.rangePosition(e, this.inputPrice, this.inputRange, this.minPrice, this.maxPrice)
        }
    }
}