import flatJson from './map/fetch-json-object' // fetch api and create flats and activeFlats
import Content from './map/content' // markers popup
import FunctionalRightBlock from './create-filters/right-block' // init right block
import Functional from './map/init-map-and-use-markers'  // init map

import '../style/style.scss' // import style

document.addEventListener('DOMContentLoaded', async () => { // download web site
    const rightBlock = new FunctionalRightBlock() // instance Right block / right-block
    const app = new Functional() // left block and leaflet layer = map
    const fjson = new flatJson() // instance flatJson / fetch-json-object

    const map = document.querySelector('.wrapper'),
        btn = document.querySelector('.btn-render'),
        container = document.querySelector('.container'),
        slider = document.querySelector('.price'),
        search = document.querySelector('.street'),
        wrap = document.querySelector('.app')

    await fjson.fetchFlats()  // function for fetch api on dom-content-loaded

    rightBlock.initRightBlock(fjson.flats)  // initilization right block site
    rightBlock.selectFunc()
    app.initMarkers(fjson.flats) // add or re-render markers on map

    map.addEventListener('click', (e) => { // my popup
        const content = new Content()  // instance Content / content.js
        content.initPopup(e)  // initilization markers popup on map
    })

    btn.addEventListener('click', async () => {  // in process, function rerender markers on map
        const block = document.querySelector('.cards')
        app.updateLayers()
        app.initMarkers(fjson.flats)
        rightBlock.refreshingPrice(fjson.flats)
        rightBlock.clearCardsBlock()
        rightBlock.initRightBlock(fjson.flats)
        block.classList.remove('active')
    })

    // search event

    search.addEventListener('input', e => {
        if (e.target.classList.contains('streetlist__search')) {
            rightBlock.searchStreet(e)
        }
    })

    // filters flats on event

    container.addEventListener('click', async (e) => {
        const zeroStreet = document.querySelector('.streetlist__search')
        const zeroRooms = document.querySelector('.open__zero')
        if (e.target.classList.contains('streetlist__li')) {
            const street = e.target.innerText
            const result = fjson.proxyActiveFlats('street', street)
            console.log(result)
            app.updateLayers()
            app.initMarkers(result)
            zeroRooms.innerHTML = zeroRooms.dataset.first
            rightBlock.refreshingPrice(fjson.flats)
            rightBlock.clearCardsBlock()
            rightBlock.initFiltersRightBlock(result)
        }
        if (e.target.classList.contains('rooms-filter-options__value')) {
            const rooms = e.target.innerText
            const result = fjson.proxyActiveFlats('rooms', rooms)
            app.updateLayers()
            app.initMarkers(result)
            zeroStreet.value = ''
            rightBlock.refreshingPrice(fjson.flats)
            rightBlock.clearCardsBlock()
            rightBlock.initFiltersRightBlock(result)
        }
    })

    slider.addEventListener('input', (e) => {
        const minRange = document.querySelector('.range-min'),
            maxRange = document.querySelector('.range-max'),
            zeroStreet = document.querySelector('.streetlist__search'),
            zeroRooms = document.querySelector('.open__zero')
        if (e.target.classList.contains('price-range__input')) {
            const price = e.target.value
            const result = fjson.proxyActiveFlats('price', price, minRange.value, maxRange.value)
            app.updateLayers()
            app.initMarkers(result)
            zeroStreet.value = ''
            zeroRooms.innerHTML = zeroRooms.dataset.first
            rightBlock.clearCardsBlock()
            rightBlock.initFiltersRightBlock(result)
        }
        if (e.target.classList.contains('price-values__input')) {
            const price = e.target.value
            const result = fjson.proxyActiveFlats('price', price, minRange.value, maxRange.value)
            app.updateLayers()
            app.initMarkers(result)
            zeroStreet.value = ''
            zeroRooms.innerHTML = zeroRooms.dataset.first
            rightBlock.clearCardsBlock()
            rightBlock.initFiltersRightBlock(result)
        }
    })

    // filters flats on event

    // add new cards

    wrap.addEventListener('click', e => {
        const modal = document.querySelector('.modal'),
            add = document.querySelector('.btn-post')

        if (e.target === add || e.target.classList.contains('post')) {
            modal.classList.remove('modal-show')
            return
        }
        if (e.target.classList.contains('overflow') || e.target.classList.contains('close')) {
            modal.classList.add('modal-show')
            return
        }
    })
})