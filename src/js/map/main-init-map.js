import Functional from "./init-map-and-use-markers"

export default class initApplication {
    
    map

    constructor() {
        this.map = new Functional()
    }

    initMyMap(jsonFlats) {
        try{
            this.map.initMap()
            this.map.initMapAndMarkers(jsonFlats)
        } catch (e) {
            console.log(e)
        }
    }
}