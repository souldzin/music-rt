import { Map, List } from "immutable";

export class Scheduler {
    constructor() {
        this._state = Map({
            tick: 0,
            buttonGrids: List()
        });
    }

    newButtonGridController() {

    }
}