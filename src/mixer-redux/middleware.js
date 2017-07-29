import { fromJS } from 'immutable';
import {
    SET_STATE,
    TRACKS_ADD,
    TRACKS_REMOVE,
    TRACKS_UPDATE_SYNTH
} from '../ui-state/actions/names';

function handleAction({ dispatch, getState }, mixer, action) {
    switch(action.type) {
        case SET_STATE:
            return mixer.setSynths(Object.values(action.payload.tracksById));
        case TRACKS_ADD:
            return mixer.addSynth(action.track);
        case TRACKS_REMOVE:
            return mixer.removeSynth(action.trackId);
        case TRACKS_UPDATE_SYNTH:
            const currentSettings = getState().tracksById.get(action.trackId).get("synthSettings");
            return mixer.updateSynth(action.trackId, action.synthSettings, currentSettings);        
            // need to catch default so that we don't end up with 'undefined' mixer in middleware
        default:
            return this;
    }
}

export function mixerMiddleware(mixer) {
    return ({ dispatch, getState }) => next => action => {
        handleAction({ dispatch, getState }, mixer, action);
        return next(action);
    }
}

export default mixerMiddleware;