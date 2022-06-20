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

    async proxyActiveFlats(myProp, value) {
        const myArr = this.activeFlats
        const proxy = new Proxy(this.flats, {
            get (target, prop) {
                target.forEach(flat => {
                    if (!myProp) {
                        myArr.push(flat)
                        return
                    }
                    if (myProp === 'price' && flat[myProp] < value) {
                        myArr.push(flat)
                        return
                    }
                    if (myProp === 'rooms' && flat[myProp] === value) {
                        myArr.push(flat)
                        return
                    }
                    if (myProp === 'street' && flat[myProp] === value) {
                        myArr.push(flat)
                        return
                    }
                })
            }
        })
        return proxy[myProp]
    }
}