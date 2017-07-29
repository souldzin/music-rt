import createIdGenerator from "../../utils/idgen";
import { repeat } from "../../utils/array";
import {
    TRACKS_ADD,
    TRACKS_REMOVE,
    TRACKS_UPDATE_NAME,
    TRACKS_UPDATE_EDITING,
    TRACKS_UPDATE_COLLAPSED,
    TRACKS_UPDATE_SEQUENCE,
    TRACKS_UPDATE_SYNTH
} from "./names";

const idgen = createIdGenerator();

function createNewTrack({ trackName, interval, measures }) {
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
        synthSettings: {
            type: 'membrane',
            volume: 0,
            rootNote: 'C3',
            props: {}
        }
    };
}

export function addTrack(trackInfo) {
    return {
        type: TRACKS_ADD,
        sync: true,
        track: createNewTrack(trackInfo)
    }
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

export function updateTrackSequence(trackId, beat) {
    return {
        type: TRACKS_UPDATE_SEQUENCE,
        sync: true,
        trackId: trackId,
        beat: beat
    };
}

export function updateTrackSynth(trackId, obj) {
    return {
        type: TRACKS_UPDATE_SYNTH,
        sync: true,
        trackId: trackId,
        synthSettings: obj
    };
}