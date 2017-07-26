import createIdGenerator from "../../utils/idgen";
import { repeat } from "../../utils/array";
import {
    TRACKS_ADD,
    TRACKS_REMOVE,
    TRACKS_UPDATE_NAME,
    TRACKS_UPDATE_EDITING,
    TRACKS_UPDATE_COLLAPSED,
} from "./names";

const idgen = createIdGenerator();

function createNewTrack({ trackName, interval, measures, isEditing }) {
    return {
        id: idgen(),
        name: trackName,
        sequence: {
            interval: interval,
            type: 'drum',
            beats: repeat(interval * measures, { 
                active: false
            })
        },
        isCollapsed: false,
        isEditing: isEditing
    };
}

export function addTrack(trackInfo) {
    return {
        type: TRACKS_ADD,
        sync: true,
        track: createNewTrack(trackInfo)
    }
}

export function updateTrackEditing(trackId, isEditing) {
    return {
        type: TRACKS_UPDATE_EDITING,
        sync: true,
        trackId: trackId,
        isEditing: isEditing
    }
}

export function updateTrackCollapsed(trackId, isCollapsed) {
    return {
        type: TRACKS_UPDATE_COLLAPSED,
        sync: true,
        trackId: trackId,
        isCollapsed: isCollapsed
    };
}

export function updateTrackName(trackId, trackName) {
    return {
        type: TRACKS_UPDATE_NAME,
        sync: true,
        trackId: trackId,
        trackName: trackName
    }
}

export function removeTrack(trackId) {
    return {
        type: TRACKS_REMOVE,
        sync: true,
        trackId: trackId
    };
}