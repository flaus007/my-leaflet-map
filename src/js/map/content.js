import photo from '../../../image/2.jpg'

export default class Content {

    constructor() {
        this.wrapper = document.querySelector('.wrapper')
        this.item = document.querySelector('.item')
    }

    popupCard(data) {  // create popup card
        const item = `
            <div class="item" data-street="${data.dataset.street}">
                <img class="item__photo" src="./fonts/2.jpg" alt="home"> 
                    <div class="item__text">
                        <h3 class="item__street">Вулиця - ${data.dataset.street}</h3>
                        <h3 class="item__price">Ціна - ${data.dataset.price}$</h3>
                    </div>
                <span class="item__close">&#10006;</span>
            </div>
            `
        this.wrapper.insertAdjacentHTML('beforeend', item)
    }

    destroy() {  // destroy popup card
        this.item.innerHTML = ''
        this.item.remove()
    }

    initPopup(e) {  // function init my popup
        if (e.target.classList.contains('hide')) {
            this.popupCard(e.target)
        }
        const btn = document.querySelector('.btn-render'),
            loop = document.querySelector('.loop')

        if(e.target === btn || e.target === loop) {
            return
        }

        const close = document.querySelector('.item__close'),
            map = document.querySelector('.block-map'),
            data = this.item.getAttribute('data-street')

        if (e.target === close || e.target === map) {
            this.destroy()
        }
        if (e.target.title != data) {
            this.destroy()
        }
    }
}