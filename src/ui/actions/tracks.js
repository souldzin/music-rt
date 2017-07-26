import createIdGenerator from "../../utils/idgen";
import { Repeat, Map } from "immutable"; 

export const TRACKS_ADD = "TRACKS_ADD";
export const TRACKS_REMOVE = "TRACKS_REMOVE";
export const TRACKS_UPDATE_NAME = "TRACKS_UPDATE_NAME";
export const TRACKS_UPDATE_EDITING = "TRACKS_UPDATE_EDITING";
export const TRACKS_UPDATE_COLLAPSED = "TRACKS_UPDATE_COLLAPSED";

const idgen = createIdGenerator();

function createNewTrack({ trackName, interval, measures, isEditing }) {
    return new Map({
        id: idgen(),
        name: trackName,
        sequence: createNewSequence(interval, measures),
        isCollapsed: false,
        isEditing: isEditing
    });
}

function createNewSequence(interval, measures) {
    return new Map({
        interval: interval,
        type: 'drum',
        beats: Repeat(createNewBeat(), interval * measures).toList()
    });
}

function createNewBeat() {
    return new Map({
        active: false
    });
}

export function addTrack(trackInfo) {
    return {
        type: TRACKS_ADD,
        track: createNewTrack(trackInfo)
    }
}

export function updateTrackEditing(trackId, isEditing) {
    return {
        type: TRACKS_UPDATE_EDITING,
        trackId: trackId,
        isEditing: isEditing
    }
}

export function updateTrackCollapsed(trackId, isCollapsed) {
    return {
        type: TRACKS_UPDATE_COLLAPSED,
        trackId: trackId,
        isCollapsed: isCollapsed
    };
}

export function updateTrackName(trackId, trackName) {
    return {
        type: TRACKS_UPDATE_NAME,
        trackId: trackId,
        trackName: trackName
    }
}

export function removeTrack(trackId) {
    return {
        type: TRACKS_REMOVE,
        trackId: trackId
    };
}