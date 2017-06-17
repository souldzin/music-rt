const { List } = require('immutable');
const TrackPlayer = require('./track-player');

class Mixer {
    constructor(tracks) {
        this._tracks = List().concat(tracks || []);
    }

    size() {
        return this._tracks.size;
    }

    addTrack(track) {
        return new Mixer(this._tracks.push(track));
    }

    tracks() {
        return this._tracks;
    }

    removeTrack() {

    }

    start(Tone) {
        const players = this._tracks.map(t => new TrackPlayer(t));

        players.forEach(x => {
            // - play the next 16th note of each track
            // - start immediately
            Tone.Transport.scheduleRepeat(x.playNext, "16n", 0);
        })
    }
}

module.exports = Mixer;