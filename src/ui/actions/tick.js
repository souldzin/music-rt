export const TICK_POSITION_UPDATE = "TICK_POSITION_UPDATE";

export function updateTickPosition(position) {
    return {
        type: TICK_POSITION_UPDATE,
        position: position
    }
}