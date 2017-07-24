function getNextPosition(interval, measures, pos) {
    if(!pos) {
        return {
            measure: 1,
            beat: 1,
            interval: interval,
            idx: 0
        };
    }

    const isNextMeasure = pos.beat >= interval;
    const isFirstMeasure = isNextMeasure && pos.measure >= measures;
    const nextMeasure = isFirstMeasure ? 1 
                      : isNextMeasure ? pos.measure + 1
                      : pos.measure;
    const nextBeat = isNextMeasure ? 1
                   : pos.beat + 1;
    const nextIdx = isFirstMeasure ? 0 : pos.idx + 1;

    return {
        measure: nextMeasure,
        beat: nextBeat,
        interval: interval,
        idx: nextIdx
    };
}

export default class Conductor {
    constructor({interval, measures}) {
        this._interval = interval;
        this._measures = measures;
        this._position = null;
    }

    next(time) {
        return {
            time: time,
            position: this._movePosition()
        };
    }

    _movePosition() {
        this._position = getNextPosition(this._interval, this._measures, this._position);

        return this._position;
    }
}