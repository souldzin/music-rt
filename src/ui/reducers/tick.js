import { Map } from 'immutable';
import { TICK_POSITION_UPDATE } from '../actions/tick';

function initTickPosition() {
    return {
        interval: -1,
        idx: -1
    };
}

export function tickPosition(state = initTickPosition(), action) {
    switch(action.type) {
        case TICK_POSITION_UPDATE:
            return action.position;
        default:
            return state;
    }
}