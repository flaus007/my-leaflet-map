import L, { marker } from 'leaflet';

export default class Functional {

    myIcon
    popup

    constructor() {
        this.map = L.map('map').setView([49.587085, 34.543770], 13)  // create leaflet map
        this.tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)
        this.layer = L.layerGroup().addTo(this.map)
    }

    initMarkers(arrayFlats) {
        arrayFlats.forEach(flat => {
            const info = `<span class="hide" data-street="${flat.street}" data-price="${flat.price}"></span>`

            const iconDiv = L.divIcon({
                className: 'my-div-icon',
                html: info
            })

            L.marker([flat.lat, flat.lng], {
                icon: iconDiv,
                alt: flat.street,
                opacity: 0.9
            }).addTo(this.layer)
        })
    }

    updateLayers() {
        let layerArr = this.layer.getLayers()
        
        this.layer.eachLayer(layer => {
            let layerIndex = layerArr.indexOf(layer)
            
            if (layerIndex !== 0 || layerIndex !== 1) {
                this.layer.removeLayer(layer);
            }
        })
    }
}