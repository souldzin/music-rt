import Rx from "rxjs";
import Tone from "tone";
import { range } from "../utils/array";

// assuming time signature is 4/4

export function createLoop({ measureCount, interval }) {
    const idxCount = measureCount * interval;
    const idxs = range(idxCount);
    const noteInterval = interval + "n";

    const tick$ = new Rx.Subject();
    const loop = new Tone.Sequence(function(time, idx){
        tick$.next({ 
            time,
            interval,
            idx
        });
    }, idxs, noteInterval);

    return {
        start: (time) => loop.start(time),
        stop: (time) => loop.stop(time),
        dispose: () => loop.dispose(),
        tick$: tick$
    };
}