import FiltersForm from "./init-info-block"

export default class FunctionalRightBlock {

    constructor() {
        this.init = new FiltersForm()
    }

    initRightBlock(jsonFlats) {
        this.init.initStreetList(jsonFlats)
        this.init.windowScroll(jsonFlats)
    }
}