import Tone from "tone";
import Rx from "rxjs";
import { updateTick } from '../ui-state/actions/tick';
import { List } from "immutable";
import { runAsync } from "../utils/func";

export function mixerSubscribe(mixer, store) {
    const loop = mixer.loop();
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
                runAsync(() => mixer.playTracks(tick, tracks));
            }
        );

    loop.start(0);
    Tone.Transport.start("+1");
}