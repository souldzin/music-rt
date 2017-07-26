import Tone from "tone";
import Conductor from "./Conductor";
import TrackList from "./TrackList";
import { toneLoopObservable } from "../utils/tonejs-utils";

const DEFAULT_OPTIONS = {
    interval: 8,
    measures: 4
};

export function createTickStream(opt) {
    // --- get default options
    const options = Object.assign({}, DEFAULT_OPTIONS, opt || {});
    const interval = options.interval;
    const maxIdx = interval * options.measures;

    // --- state

    return toneLoopObservable(Tone.Transport, interval + "n")
        .scan((x, time) => ({
            time: time,
            interval: options.interval,
            idx: nextIdx(x.idx)             
        }), { idx: -1 });

    function nextIdx(idx) {
        return idx >= maxIdx - 1 ? 0 : idx + 1;
    }
}

// --- start function --------
// this is for starting the beats + track handling
// ---------------------------
export function start(opt) {
    const $tick = createTickStream(opt);
    const tracks = new TrackList();

    const trackSubscription = $tick.subscribe(
        (x) => tracks.play(x)
    );

    return new SequencerContext($tick, tracks);
}

export class SequencerContext {
    constructor($tick, tracks) {
        this.$tick = tick;
        this.tracks = tracks;
    }

    start() {
        Tone.Transport.start();
        return this;
    }

    stop() {
        Tone.Transport.stop();
        return this;
    }
}