export default class Detect {

    constructor() {
        this.container = document.querySelector('.container')
    }

    detectChanges() {
        let observer = new MutationObserver(mutationRecords => {
            console.log(mutationRecords)
            mutationRecords.forEach(mut => {
                if(mut.oldValue === 'streetlist__li active--zero open'){
                    console.log(mut.target.lastElementChild.value)
                    return
                }
            })
        })

        const config = {
            subtree: true,
            characterDataOldValue: true,
            attributeOldValue: true
            // attributes: true,
            // characterData: true
        }
        observer.observe(this.container, config)

        return observer
    }
}