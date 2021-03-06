import { TICK_UPDATE } from '../actions/names';

function initTickPosition() {
    return {
        interval: -1,
        idx: -1
    };
}

export function tickPosition(state = initTickPosition(), action) {
    switch(action.type) {
        case TICK_UPDATE:
            return action.payload;
        default:
            return state;
    }
}