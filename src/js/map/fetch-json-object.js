import Appartaments from './create-object'

export default class flatJson {

    flats = []

    async fetchFlats() {
        try {
            const response = await fetch('http://site-constructor.stage/appartaments.json')
            const json = (response.status === 200 && response.ok) ? await response.json() : new Error(response.statusText)
            this.flats = await json.map(flat => new Appartaments(flat))
            console.log(this.flats)
        } catch (e) {
            throw new Error(`Error is - ${e}`);
        }
    }

    proxyActiveFlats(myProp, myValue, minVal, maxVal) {
        const arr = []

        const proxy = new Proxy(this.flats, {
            set(target, prop, value) {
                target.forEach(item => {
                    if ((prop === 'street' || prop === 'rooms') && item[prop] == value) {  // for street filter
                        arr.push(item)
                    }
                    if (prop === 'price') {
                        if (item[prop] >= minVal && item[prop] <= maxVal) {
                            arr.push(item)
                        }
                    }
                })
                return true
            }
        })
        proxy[myProp] = myValue

        return arr
    }
}