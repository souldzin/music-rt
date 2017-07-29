import { Map } from 'immutable';
import Tone from 'tone';
import { runAsync } from '../utils/func';
import { createLoop } from './mixer-loop';
import * as Player from './player';
import * as Synths from './synths';

function createSynth(settings) {
    return Synths.getSynth(settings.type).get("create")();
}

// --- "reducers" ----

function updateSynth(synth, settings) {
    if(settings.type) {
        return createSynth(settings);
    } else {
        return synth;
    }
}

function addSynth(synths, track) {
    return synths.set(track.id, createSynth(track.synthSettings));
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

    updateSynth(id, settings) {
        this._synths = this._synths.update(id, (synth) => updateSynth(synth, settings));

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
            .map(x => () => Player.playTrack(x, tick))
            .forEach(runAsync);

        return this;
    }

    getState() {
        return {
            synths: this._synths
        };
    }
}