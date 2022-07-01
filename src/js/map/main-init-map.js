import Functional from "./init-map-and-use-markers"

export default class initApplication {
    
    map

    constructor() {
        this.map = new Functional()
    }

    initMyMap() {
        try{
            this.map.map
        } catch (ex) {
            console.error(ex)
        }
    }

    renderMarkers(jsonFlats) {
        this.map.initMarkers(jsonFlats)
    }

    updateMarkers() {
        this.map.updateLayers()
    }
}