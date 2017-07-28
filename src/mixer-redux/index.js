import { Map } from 'immutable';

export { mixerMiddleware } from './middleware';
export { mixerSubscribe } from './subscriber';

function createMixerState() {
    return {
        instruments: Map({})
    };
}