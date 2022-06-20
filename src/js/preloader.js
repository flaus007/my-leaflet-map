export default class Preloader {

    loadData() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
    }
}