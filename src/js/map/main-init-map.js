import Functional from "./init-map-and-use-markers"

export default class initApplication {
    
    map

    constructor() {
        this.map = new Functional()
    }

    init(jsonFlats) {
        try{
            this.map.initMap()
            jsonFlats.map(flat => {
                this.map.initMarkers(flat)
            })
        } catch (e) {
            console.log(e)
        }
    }
}