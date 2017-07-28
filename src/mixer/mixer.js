import { Map } from 'immutable';
import Tone from 'tone';
import { runAsync } from '../utils/func';
import { createLoop } from './mixer-loop';
import * as Player from './player';

function createSynth(track) {
    return new Tone.MembraneSynth({
        "pitchDecay" : 0.008,
        "octaves" : 2,
        "envelope" : {
            "attack" : 0.0006,
            "decay" : 0.5,
            "sustain" : 0
        }
    }).toMaster();
}

// --- "reducers" ----

function addSynth(synths, track) {
    debugger;
    return synths.set(track.id, createSynth(track));
}

function removeSynth(synths, id) {
    return synths.delete(id);
}

function setSynths(tracks) {
    if(!tracks) {
        return Map({});
    }

    return tracks.reduce(addSynth, Map({}));
}

// --- class -----

export class Mixer {
    constructor(options) {
        this._synths = setSynths([]);
        this._loop = createLoop(options || {});
    }

    loop() {
        return this._loop;
    }

    addSynth(track) {
        this._synths = addSynth(this._synths, track);

        return this;
    }

    removeSynth(id) {
        this._synths = removeSynth(this._synths, id);

        return this;
    }

    setSynths(tracks) {
        this._synths = setSynths(tracks);

        return this;
    }

    getSynth(id) {
        return this._synths.get(id);
    }

    playTracks(tick, tracks) {
        tracks
            .map(x => x.set("synth", this.getSynth(x.get("id"))))
            .map(x => () => Player.playTrack(tick, x))
            .forEach(runAsync);

        return this;
    }

    getState() {
        return {
            synths: this._synths
        };
    }
}