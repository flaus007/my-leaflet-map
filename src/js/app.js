import initApplication from './map/main-init-map'  // init map
import flatJson from './map/fetch-json-object' // json for all functions
import Content from './map/content' // markers popup
import FunctionalRightBlock from './create-filters/right-block' // init right block
import Preloader from './preloader'  // preloader download
import '../style/style.scss' // link style
import Detect from './create-filters/detected'


const map = document.querySelector('.wrapper')
const load = new Preloader()

document.addEventListener('DOMContentLoaded', async () => { // download web site
    const app = new initApplication() // left block
    const rightBlock = new FunctionalRightBlock() // right block
    const fjson = new flatJson() // json
    const d = new Detect()

    // d.detectChanges()

    await fjson.fetchFlats()
    await fjson.proxyActiveFlats()

    rightBlock.initRightBlock(fjson.flats)
    app.initMyMap(fjson.activeFlats)
    app.renderMarkers(fjson.activeFlats)
})

map.addEventListener('click', (e) => { // popup
    console.log(e.target)
    const app = new Content()
    app.initPopup(e)
})


load.loadData().then(() => {  // preloaded
    let preLoader = document.getElementById('preloader')
    preLoader.classList.add('hidden')
    preLoader.classList.remove('visible')
})


const btn = document.querySelector('.btn-render')
btn.addEventListener('click', async (e) => {
    const allMarkers = document.querySelectorAll('.my-div-icon')
        console.log(allMarkers)
        allMarkers.forEach(marker => {
            marker.classList.add('hide')
        })
})