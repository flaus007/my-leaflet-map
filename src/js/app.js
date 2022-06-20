import initApplication from './map/main-init-map'  // init map
import flatJson from './map/fetch-json-object' // json for all functions
import Content from './map/content' // markers popup
import FunctionalRightBlock from './create-filters/right-block' // init right block
import Preloader from './preloader'  // preloader download
import '../style/style.scss' // link style


const map = document.querySelector('.wrapper')
const load = new Preloader()

document.addEventListener('DOMContentLoaded', async () => { // download web site
    const app = new initApplication() // left block
    const rightBlock = new FunctionalRightBlock() // right block
    const fjson = new flatJson() // json

    await fjson.fetchFlats()
    await fjson.proxyActiveFlats()
    
    rightBlock.initRightBlock(fjson.flats)
    app.init(fjson.activeFlats)
})

map.addEventListener('click', (e) => { // popup
    const app = new Content()
    app.initPopup(e)
})


load.loadData().then(() => {  // preloaded
    let preLoader = document.getElementById('preloader')
    preLoader.classList.add('hidden')
    preLoader.classList.remove('visible')
})