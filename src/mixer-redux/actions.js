export const TICK_UPDATE = "TICK_UPDATE";

export function updateTick(tick) {
    return {
        type: TICK_UPDATE,
        payload: tick
    }
}