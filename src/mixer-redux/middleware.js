import { fromJS } from 'immutable';
import {
    SET_STATE,
    TRACKS_ADD,
    TRACKS_REMOVE
} from '../ui/actions/names';

function handleAction(mixer, action) {
    switch(action.type) {
        case SET_STATE:
            return mixer.setSynths(Object.values(action.payload.tracksById));
        case TRACKS_ADD:
            return mixer.addSynth(action.track);
        case TRACKS_REMOVE:
            return mixer.removeSynth(action.trackId);
        // need to catch default so that we don't end up with 'undefined' mixer in middleware
        default:
            return this;
    }
}

export function mixerMiddleware(mixer) {
    return ({ dispatch, getState }) => next => action => {
        handleAction(mixer, action);
        return next(action);
    }
}

export default mixerMiddleware;