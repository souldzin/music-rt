import { TRACK_SEQUENCE_UPDATE } from "./names";

export function updateTrackSequence(trackId, beat) {
    return {
        type: TRACK_SEQUENCE_UPDATE,
        sync: true,
        trackId: trackId,
        beat: beat
    };
}