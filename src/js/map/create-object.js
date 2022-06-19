export default class Appartaments {
    city
    street
    lat
    lng
    rooms
    date
    price
    status
    zoom

    constructor(jsonData) {
        this.fillObj(jsonData)
    }
    
    fillObj(data) {
        if (data.city) this.city = data.city
        if (data.street) this.street = data.street
        if (data.lat) this.lat = data.lat
        if (data.lng) this.lng = data.lng
        if (data.rooms) this.rooms = data.rooms
        if (data.date) this.date = data.date
        if (data.price) this.price = data.price
        if (data.status) this.status = data.status
        if (data.zoom) this.zoom = data.zoom
    }
}