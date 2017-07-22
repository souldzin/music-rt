import React from 'react';
import { List } from 'immutable';
import TrackItem from './TrackItem';

function hasId(track, id) {
    return track.id === id;
}

export default class TrackList extends React.Component {
    // prop methods
    // ---------------

    tracks() {
        return this.props.tracks || List();
    }

    isSelected(track) {
        return track.id === this.props.selectedTrackId;
    }

    onTrackSelected(track) {
        if(this.props.onTrackSelected) {
            this.props.onTrackSelected(track);
        }
    }

    // render methods
    // -----------------

    render() {
        return <div className="mrt-track-list">
            {this.tracks().map((x, idx) => this.renderTrack(x, idx))}
        </div>;
    }

    renderTrack(track, idx) {
        const status = this.isSelected(track) ? "selected" : "";
        const onClick = () => this.onTrackSelected(track);

        return <TrackItem key={idx}
                          track={track}
                          isSelected={this.isSelected(track)}
                          onClick={() => this.onTrackSelected(track)} />
    }
}