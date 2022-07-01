import phone from '../../../image/phone.svg'
import home from '../../../image/1.jpg'

export default class CreateForm {

    selectStreet

    constructor() {
        this.cards = document.querySelector('.cards')
    }

    createSelectStreet(json) {  // create li for select street
        const list = document.querySelector('.streetlist')
        json.map(flat => {
            this.selectStreet = `<li class="streetlist__li">${flat.street}</li>`
            list.innerHTML += this.selectStreet
        })
    }

    loaded(json) {  // create flats cards
        const card = `
                <div class="card" data-street="${json.street}">
                    <div class="card-photo">
                        <img src="./fonts/1.jpg" alt="Flats photo">
                    </div>
                    <div class="card-info">
                        <h2 class="card-info__price">${json.price}$</h2>
                        <h2 class="card-info__city">${json.city}</h2>
                        <h2 class="card-info__street">${json.street}</h2>
                        <h2 class="card-info__rooms">Кількість кімнат - ${json.rooms}
                        <h3 class="card-info__date">${json.date}</h3></h2>
                        <button class="card-info__call">
                            <img src="./fonts/phone.svg" alt="call">
                        </button>
                    </div>
                </div>
                `
        this.cards.insertAdjacentHTML('beforeend', card)
    }

    conditionsForSelects(e, wrapper, list, zeroItem) {  // logic for open and close selects
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

    openCloseModalStreet() {  // method for open & close select street
        const list = document.querySelector('.streetlist')
        const li = document.querySelectorAll('.streetlist__li')
        const search = document.querySelector('.streetlist__search')
        document.addEventListener('click', (e) => {
            this.conditionsForSelects(e, list, li, search)
        })
    }

    openCloseModalRooms() {  // method for open & close select rooms
        const list = document.querySelector('.rooms-filter-options')
        const li = document.querySelectorAll('.rooms-filter-options__value')
        const first = document.querySelector('.open__zero')
        document.addEventListener('click', (e) => {
            this.conditionsForSelects(e, list, li, first)
        })
    }
}