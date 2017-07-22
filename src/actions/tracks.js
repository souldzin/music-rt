export const ADD_TRACK = "ADD_TRACK";
export const SELECT_TRACK = "SELECT_TRACK_ID";

export function addTrack(track) {
    return {
        type: ADD_TRACK,
        track: track
    };
}

export function selectTrackId(track) {
    return {
        type: SELECT_TRACK,
        trackId: track.id
    };
}