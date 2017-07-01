import Rx from "rxjs/Rx";
import { List, Map, Range } from "immutable";

export class Button {
    constructor(key) {
        this.key = key;
        this.status = "inactive";
        this.isTicked = false;
    }
}

export class ButtonGridController {
    this() {
        const initButtons = Range(0, 16)
            .map(x => new Button(x))
            .toList();

        this._buttonsObv = new Rx.BehaviorSubject(initButtons);
    }

    toggleButton(key) {
        const buttons = this._buttonsObv.getValue();

        const next = buttons.update(key, x => x.update("status", toggleStatus));

        this._buttonsObv.onNext(next);
    }

    buttonsObservable() {
        return this._buttons.asObservable();
    }
}

function newButton(key) {
    Map({
        key: key,
        status: "inactive",
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