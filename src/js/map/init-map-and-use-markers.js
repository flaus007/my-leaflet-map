import L, { marker } from 'leaflet';

export default class Functional {
    map
    myIcon
    popup

    initMap() {
        this.map = L.map('map').setView([49.587085, 34.543770], 13)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)
    }

    initMarkers(obj) {
        const info = `
        <span class="hide" data-street="${obj.street}" data-price="${obj.price}"></span>
        `

        const iconDiv = L.divIcon({
            className: 'my-div-icon',
            html: info
        })

        L.marker([obj.lat, obj.lng], {
            icon: iconDiv,
            title: obj.price,
            alt: obj.street,
            opacity: 0.9
        })
            .bindTooltip(obj.street).openTooltip()
            .addTo(this.map)
    }
}