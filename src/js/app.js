import initApplication from './map/main-init-map'  // init map
import flatJson from './map/fetch-json-object' // json for all functions
import Content from './map/content' // markers popup
import FunctionalRightBlock from './create-filters/right-block' // init right block
import '../style/style.scss' // link style

const map = document.querySelector('.wrapper')

document.addEventListener('DOMContentLoaded', async () => {
    const app = new initApplication() // left block
    const rightBlock = new FunctionalRightBlock() // right block
    const fjson = new flatJson() // json

    await fjson.fetchFlats()

    rightBlock.initRightBlock(fjson.flats)
    app.init(fjson.flats)
})

map.addEventListener('click', (e) => {
    const app = new Content()
    app.initPopup(e)
})