import { getSynth } from "./synths";

export const NOTE_REGEX = "[A-G][\#b]?[0-9]";

export function isValidNote(note) {
    return note.match(RegExp(NOTE_REGEX));
}

/**
 * Utility function that maps a tick's idx to the sequences idx based on interval
 * @param {*} tick 
 * @param {*} sequence 
 */
export function mapTickToSequence(tick, sequence) {
    const tickInterval = tick.interval;
    const tickIdx = tick.idx;
    const sequenceInterval = sequence.get('interval');

    // get tickInterval / sequenceInterval ratio
    const ratio = sequenceInterval / tickInterval;

    // apply to tickIdx
    return tickIdx * ratio;
}

export function getNote(track, sequenceBeat) {
    const synthSettings = track.get("synthSettings");
    return synthSettings.get("rootNote");
}

export function playTrack(track, tick) {
    const sequenceBeat = getSequenceBeat(track, tick);

    if(sequenceBeat.get("active")) {
        const synth = track.get("synth");
        const synthDef = getSynth(track.get("synthSettings").get("type"));
        console.log(synthDef);
        if(synthDef && synthDef.get("isNoise")) {
            playNoise(synth, tick.time);
        } else {
            const note = getNote(track, sequenceBeat);
            console.log(note);
            play(synth, note, tick.time);
        }
    }
}

function playNoise(synth, time) {
    synth.triggerAttackRelease("8n", time, Math.random()*0.5 + 0.5);
}

function play(synth, note, time) {
    if(!isValidNote(note)) {
        return;
    }
    synth.triggerAttackRelease(note, "8n", time, Math.random()*0.5 + 0.5);
}

function getSequenceBeat(track, tick) {
    const sequence = track.get("sequence");
    const seqIdx = mapTickToSequence(tick, sequence);
    return sequence.get("beats").get(seqIdx);
}