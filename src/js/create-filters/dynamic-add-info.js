import phone from '../../../image/phone.svg'
import home from '../../../image/1.jpg'

export default class CreateForm {

    selectStreet

    constructor() {
        this.cards = document.querySelector('.cards')
    }

    createSelectStreet(json) {
        const list = document.querySelector('.streetlist')
        json.map(flat => {
            this.selectStreet = `<li class="streetlist__li">${flat.street}</li>`
            list.innerHTML += this.selectStreet
        })
    }

    loaded(json) {
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
}