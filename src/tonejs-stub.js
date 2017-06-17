const sinon = require('sinon');

class ToneStub {
    constructor() {
        this.Transport = {
            scheduleRepeat: sinon.spy()
        };
    }
}

module.exports = ToneStub;