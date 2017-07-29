import React from 'react';
import { connect } from 'react-redux';
import Track from './Track';
import TrackPlaceholder from './TrackPlaceholder';

function hasId(track, id) {
    return track.id === id;
}

// --- component ----------------------------

export class TrackList extends React.Component {
    // prop methods
    // ---------------

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
        const tracks = this.props.tracks;

        return <div className="mrt-track-list">
            {tracks.map((x, idx) => this.renderTrack(x, idx))}
            <TrackPlaceholder />
        </div>;
    }

    renderTrack(track, idx) {
        const trackProps = {
            trackId: track.get("id"),
            trackName: track.get("name"),
            isCollapsed: track.get("isCollapsed"),
            isEditing: track.get("isEditing"),
            sequence: track.get("sequence"),
            synthSettings: track.get("synthSettings")
        };

        return <Track {...trackProps} key={idx} />
    }
}

// --- redux wrapper ----------------

function mapStateToProps(state) {
    return {
        tracks: state.tracks
            .map(id => state.tracksById.get(id))
            .filter(x => x),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onTrackCollapse: (track) => {
            // TODO
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackList);