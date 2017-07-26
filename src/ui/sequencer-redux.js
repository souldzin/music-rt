import Tone from "tone";
import { updateTickPosition } from './actions/tick';
import { createTickStream } from "../sequencer";
import { List } from "immutable";
import Rx from "rxjs";

var mainSynth = new Tone.MembraneSynth({
			"pitchDecay" : 0.008,
			"octaves" : 2,
			"envelope" : {
				"attack" : 0.0006,
				"decay" : 0.5,
				"sustain" : 0
			}
		}).toMaster();

export function attachSequencerToStore(store) {
    const options = {
        interval: 8,
        measures: 4
    };
    
    const tick$ = createTickStream(options);

    tick$.subscribe(
        (tick) => {
            Tone.Draw.schedule(function(){
                store.dispatch(updateTickPosition(tick))
            }, tick.time);
        }
    );

    const state$ = Rx.Observable.from(store);
    const track$ = state$.map(x => x.tracksById.values());

    const tickTracks$ = Rx.Observable
        .zip(tick$, 
             track$.sample(tick$), 
             (tick, tracks) => ({ tick, tracks }))
        .subscribe(
            ({ tick, tracks }) => playTracks(tick, List(tracks))
        );
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
    tracks.forEach(x => playTrack(tick, x));
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