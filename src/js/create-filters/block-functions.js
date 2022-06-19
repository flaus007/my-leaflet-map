import Range from './range-options'

export default class Actions {

    openCloseModalStreet() {
        const list = document.querySelector('.streetlist')
        const li = document.querySelectorAll('.streetlist__li')
        const search = document.querySelector('.streetlist__search')
        document.addEventListener('click', (e) => {
            li.forEach(st => {
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

    renderMinMaxPrice(json) {
        const arr = []
        json.map(flat => arr.push(flat.price))
        let minPrice = Math.min(...arr),
            maxPrice = Math.max(...arr)

        const rangeInput = document.querySelectorAll('.price-range__input'),
            priceInput = document.querySelectorAll(".price-bottom__input")

        priceInput[0].value = minPrice
        priceInput[1].value = maxPrice

        rangeInput[0].min = minPrice
        rangeInput[0].max = maxPrice
        rangeInput[1].min = minPrice
        rangeInput[1].max = maxPrice
        rangeInput[0].value = minPrice
        rangeInput[1].value = maxPrice
    }

    inputPrice() {
        const rangeInput = document.querySelectorAll(".price-range__input"),
            priceInput = document.querySelectorAll(".price-bottom__input"),
            price = document.querySelector('.price'),
            bot = document.querySelector('.price-bottom'),
            input = new Range(rangeInput, priceInput)

        price.addEventListener('input', event => {
            input.inputSlider(event)
        })

        bot.addEventListener('input', event => {
            input.inputValue(event)
        })
    }
}