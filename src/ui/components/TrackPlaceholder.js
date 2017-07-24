import React from "react";
import { connect } from "react-redux";
import { addTrack } from "../actions/tracks";

export class TrackPlaceholder extends React.Component {
    render() {
        const onAddTrack = this.props.onAddTrack
        const name = "New Track";
        return (
            <div className="mrt-track collapse mrt-track-placeholder">
                <div className="mrt-track-header" onClick={() => onAddTrack({ name })}>
                    <span className="mrt-track-toggle"></span>
                    <span className="mrt-track-title">{name}</span>
                </div>
            </div>
        );
    }
}

// --- connect to redux --------------

function mapStateToProps(state, ownProps) {
    // TODO replace interval / measures with state
    return {
        interval: 8,
        measures: 4
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        withState: ({interval, measures}) => ({
            onAddTrack: (track) => {
                dispatch(addTrack({
                    trackName: track.name,
                    isEditing: true,
                    interval,
                    measures
                }));
            }
        })
    };
}

function merge(stateProps, dispatchProps, ownProps) {
    return Object.assign({}, ownProps, dispatchProps.withState(stateProps));
}

export default connect(mapStateToProps, mapDispatchToProps, merge)(TrackPlaceholder);