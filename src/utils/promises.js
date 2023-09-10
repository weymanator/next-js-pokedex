export class Queue {
    constructor() {
        this.queue = Promise.resolve()
    }

    add(generator) {
        this.queue = this.queue.then(generator)
    }
}