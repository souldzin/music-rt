export const TOGGLE_BEAT = "TOGGLE_BEAT";

export function toggleBeat(track, beatIdx) {
    return {
        type: TOGGLE_BEAT,
        track: track,
        beatIdx: beatIdx
    }
}