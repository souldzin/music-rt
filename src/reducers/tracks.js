import { List } from 'immutable';
import { ADD_TRACK, SELECT_TRACK } from '../actions/tracks';

export function tracks(state = List(), action) {
    switch(action.type) {
        case ADD_TRACK:
            return state.push(action.track);
        default:
            return state;
    }
}

export function selectedTrackId(state = null, action) {
    switch(action.type) {
        case SELECT_TRACK:
            return action.trackId;
        default:
            return state;
    }
}