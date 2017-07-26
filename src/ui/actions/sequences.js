export const TRACK_SEQUENCE_UPDATE = "TRACK_SEQUENCE_UPDATE";

export function updateTrackSequence(trackId, beat) {
    return {
        type: TRACK_SEQUENCE_UPDATE,
        trackId: trackId,
        beat: beat
    };
}