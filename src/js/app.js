import initApplication from './map/main-init-map'  // init map
import flatJson from './map/fetch-json-object' // fetch api and create flats and activeFlats
import Content from './map/content' // markers popup
import FunctionalRightBlock from './create-filters/right-block' // init right block

import '../style/style.scss' // import style

document.addEventListener('DOMContentLoaded', async () => { // download web site
    const rightBlock = new FunctionalRightBlock() // instance Right block / right-block
    const app = new initApplication() // left block
    const fjson = new flatJson() // instance flatJson / fetch-json-object
    
    const map = document.querySelector('.wrapper')
    const btn = document.querySelector('.btn-render') 


    await fjson.fetchFlats()  // function for fetch api on dom-content-loaded
    await fjson.proxyActiveFlats()  // function for fetch api and create new array activeFlats

    rightBlock.initRightBlock(fjson.flats)  // initilization right block site
    app.initMyMap() // only initilization map
    app.renderMarkers(fjson.flats) // add or re-render markers on map



    map.addEventListener('click', (e) => { // my popup
        const app = new Content()  // instance Content / content.js
        app.initPopup(e)  // initilization markers popup on map
    })



    btn.addEventListener('click', async (e) => {  // in process, function rerender markers on map

        app.updateMarkers()
    })
})