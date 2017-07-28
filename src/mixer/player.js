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

export function getNote(sequenceBeat, sequence) {
    return sequence.get("baseNote");
}

export function playTrack(tick, track) {
    const sequence = track.get("sequence");
    const synth = track.get("synth");
    const seqIdx = mapTickToSequence(tick, sequence);
    const sequenceBeat = sequence.get("beats").get(seqIdx);
    if(sequenceBeat.get("active")) {
        const note = getNote(sequenceBeat, sequence);
        play(synth, note, tick.time);
    }
}

function play(synth, note, time) {
    synth.triggerAttack(note, time, Math.random()*0.5 + 0.5);
}