export const DRUM_SEQUENCER = "DRUM";

export function drumSequencer() {
    return {
        type: DRUM_SEQUENCER,
        activeBeats: List(Array(16).map(drumBeat))
    }
}

export function drumBeat() {
    return Map({
        active: false
    });
}