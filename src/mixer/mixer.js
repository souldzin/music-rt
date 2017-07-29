import { Map } from 'immutable';
import Tone from 'tone';
import { runAsync } from '../utils/func';
import { createLoop } from './mixer-loop';
import * as Player from './player';
import * as Synths from './synths';

function createSynth(type) {
    return Synths.getSynth(type).get("create")();
}

// --- "reducers" ----

function updateSynth(synth, settings) {
    if(settings.has("type")) {
        synth = createSynth(settings.get("type"));
    } 
    if(settings.has("volume")) {
        synth.volume.value = settings.get("volume");
    }
    return synth;
}

function addSynth(synths, track) {
    return synths.set(track.id, createSynth(track.synthSettings.type));
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

    updateSynth(id, newSettings, oldSettings) {
        if(newSettings.type) {
            newSettings = oldSettings.merge(Map(newSettings));
        } else {
            newSettings = Map(newSettings);
        }

        this._synths = this._synths.update(id, (synth) => updateSynth(synth, newSettings));

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