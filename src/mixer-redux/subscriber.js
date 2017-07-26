import Tone from "tone";
import Rx from "rxjs";
import { updateTick } from './actions';
import { createLoop } from "../mixer";
import { List } from "immutable";
import { runAsync } from "../utils/func";

const OPTIONS = {
    interval: 8,
    measureCount: 4
};

var mainSynth = new Tone.MembraneSynth({
			"pitchDecay" : 0.008,
			"octaves" : 2,
			"envelope" : {
				"attack" : 0.0006,
				"decay" : 0.5,
				"sustain" : 0
			}
		}).toMaster();

export function mixerSubscribe(store) {
    const loop = createLoop(OPTIONS);
    const tick$ = loop.tick$;

    const state$ = Rx.Observable.from(store);
    const track$ = state$.map(x => List(x.tracksById.values()));

    const tickTracks$ = Rx.Observable
        .zip(tick$, 
             track$.sample(tick$), 
             (tick, tracks) => ({ tick, tracks }))
        .subscribe(
            ({ tick, tracks }) => {
                runAsync(() => store.dispatch(updateTick(tick)));
                runAsync(() => playTracks(tick, tracks));
            }
        );

    loop.start(0);
    Tone.Transport.start("+1");
}

// TODO refactor: this, SequenceEditor.js
function mapTickToSequence(tick, sequence) {
    const tickInterval = tick.interval;
    const tickIdx = tick.idx;
    const sequenceInterval = sequence.get('interval');

    // get tickInterval / sequenceInterval ratio
    const ratio = sequenceInterval / tickInterval;

    // apply to tickIdx
    return tickIdx * ratio;
}

function playTracks(tick, tracks) {
    tracks
        .map(x => () => playTrack(tick, x))
        .forEach(runAsync);
}

function playTrack(tick, track) {
    const sequence = track.get("sequence");
    const seqIdx = mapTickToSequence(tick, sequence);
    if(sequence.get("beats").get(seqIdx).get("active")) {
        play(mainSynth, tick.time);
    }
}

function play(synth, time) {
    synth.triggerAttack("G3", time, Math.random()*0.5 + 0.5);
}