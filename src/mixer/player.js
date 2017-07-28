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

export function playTrack(tick, track) {
    const sequence = track.get("sequence");
    const synth = track.get("synth");
    const seqIdx = mapTickToSequence(tick, sequence);
    if(sequence.get("beats").get(seqIdx).get("active")) {
        play(synth, tick.time);
    }
}

function play(synth, time) {
    console.log("let's play our synth :)");
    synth.triggerAttack("G3", time, Math.random()*0.5 + 0.5);
}