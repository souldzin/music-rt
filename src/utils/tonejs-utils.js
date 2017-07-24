import Rx from "rxjs/Rx";

export function toneLoopObservable(transport, interval, startTime) {
    return Rx.Observable.fromEventPattern(
        function add(h) {
            return transport.scheduleRepeat(h, interval, startTime);
        },
        function remove(h, eventId) {
            transport.clear(eventId);
        }
    )
}