import { List, Map } from 'immutable';
import { TRACKS_ADD, 
         TRACKS_REMOVE, 
         TRACKS_UPDATE_EDITING, 
         TRACKS_UPDATE_NAME,
         TRACKS_UPDATE_COLLAPSED } from '../actions/tracks';

function updateTrack(track, action) {
    switch(action.type) {
        case TRACKS_UPDATE_NAME:
            return track.set("name", action.trackName);
        case TRACKS_UPDATE_COLLAPSED:
            return track.set("isCollapsed", action.isCollapsed);
        case TRACKS_UPDATE_EDITING:
            // if we're not editing and there's no name here...
            if(!action.isEditing && !track.get("name")) {
                track = track.set("name", "(unnamed)");
            }
            return track.set("isEditing", action.isEditing);
        default:
            return track;
    }
}

export function tracksById(state = Map(), action) {
    switch(action.type) {
        case TRACKS_ADD:
            return state.set(action.track.get("id"), action.track);
        case TRACKS_REMOVE:
            return state.remove(action.trackId);
        case TRACKS_UPDATE_NAME:
        case TRACKS_UPDATE_EDITING:
        case TRACKS_UPDATE_COLLAPSED:
            return state.update(action.trackId, (x) => updateTrack(x, action));
        default:
            return state;
    }
}

export function tracks(state = List(), action) {
    switch(action.type) {
        case TRACKS_ADD:
            return state.push(action.track.get("id"));
        case TRACKS_REMOVE:
            return state.filterNot(x => x.get("id") === action.trackId);
        default:
            return state;
    }
}