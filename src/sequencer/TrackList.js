import Rx from "rxjs/Rx";
import { List } from "immutable";
import { runAsync } from "../utils/func-utils";

function trackIdGen() {
    let curr = 0;

    return function() {
        return curr++;
    }
}

class TrackList {
    constructor() {
        this._tracks = List();
        this._idgen = trackIdGen();
    }

    get() {
        return this._tracks;
    }

    addTrack(track) {
        const newEntry = {
            id: this._idgen(),
            track: track
        };

        this._tracks = this._tracks.push(newEntry);

        return newEntry;
    }

    removeTrack(id) {
        this._tracks = this._tracks.filterNot(x => x.id === id);
    }

    updateTrack(id, fn) {
        this._tracks = this._tracks.update(x => x.id === id ? fn(x) : x);
    }

    play(tick) {
        this._tracks.forEach(t => 
            runAsync(() => t.play(tick))
        );
    }
}