import Tone from "tone";
import { updateTickPosition } from './actions/tick';
import { createTickStream } from "../sequencer";

export function attachSequencerToStore(store) {
    const options = {
        interval: 8,
        measures: 4
    };
    
    const $ticks = createTickStream(options);

    $ticks.subscribe(
        (tick) => {
            store.dispatch(updateTickPosition(tick.position))
        }
    );
}