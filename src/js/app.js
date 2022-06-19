import initApplication from './map/main-init-map'
import FiltersForm from './create-filters/init-info-block' // form
import flatJson from './map/fetch-json-object'
import Content from './map/content'
import '../style/style.scss' // link style

const map = document.querySelector('.wrapper')

document.addEventListener('DOMContentLoaded', async () => {
    const app = new initApplication() // left block
    const block = new FiltersForm() // right block
    const fjson = new flatJson() // json

    await fjson.fetchFlats()

    block.initStreetList(fjson.flats)
    app.init(fjson.flats)
})

map.addEventListener('click', (e) => {
    const app = new Content()
    app.initPopup(e)
})