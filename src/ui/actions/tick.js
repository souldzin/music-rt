import { TICK_UPDATE } from './names';

export function updateTick(tick) {
    return {
        type: TICK_UPDATE,
        payload: tick
    }
}