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
    const tonejsInterval = options.interval + "n";

    // --- state
    const conductor = new Conductor(options);

    return toneLoopObservable(Tone.Transport, tonejsInterval)
        .map(() => conductor.next());
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