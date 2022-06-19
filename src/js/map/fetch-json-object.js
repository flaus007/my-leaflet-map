import Appartaments from './create-object'

export default class flatJson {

        flats = []
        activeFlats = []
 // version 1.0 фетч с соседней папки
    async fetchFlats() {
        try {
            const response = await fetch('http://site-constructor.stage/appartaments.json')
            const json = (response.status === 200 && response.ok) ? await response.json() : new Error(response.statusText)
            this.flats = await json.map(flat => new Appartaments(flat))
        } catch (e) {
            throw new Error(`Error is - ${e}`);
        }
    }
}