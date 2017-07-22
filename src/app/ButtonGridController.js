import Rx from "rx";
import { List, Map, Range } from "immutable";

const initState = Range(0, 16).map(newButton).toList();

export default class ButtonGridController {
    constructor() {
        const initButtons = Range(0, 16)
            .map(newButton)
            .toList();

        this._buttonsObv = new Rx.BehaviorSubject(initButtons);
    }

    toggleButton(key) {
        const buttons = this._buttonsObv.getValue();

        const next = buttons.update(key, x => x.update("status", toggleStatus));

        this._buttonsObv.onNext(next);
    }

    buttonsObservable() {
        return this._buttonsObv.asObservable();
    }
}

function newButton(key) {
    return Map({
        key: key,
        isActive: false,
        isTicked: false
    });
}

function toggleStatus(status) {
    if(status === "inactive") {
        return "active";
    } else {
        return "inactive";
    }
}