import React from "react";
import { connect } from "react-redux";
import { updateTrackEditing, 
         updateTrackName,
         updateTrackCollapsed } from "../actions/tracks";

/**
 * Expected props:
 * - trackId, trackName, isEditing
 */
export class TrackHeader extends React.Component {
    render() {
        return (
            <div className="mrt-track-header">
                {this.renderCollapseButton()}
                {this.renderTitle()}
            </div>
        )      
    }

    renderCollapseButton() {
        const {isCollapsed, onTrackCollapseChange} = this.props;

        return <span className="mrt-track-toggle" onClick={() => onTrackCollapseChange(!isCollapsed)}></span>
    }

    renderTitle() {
        const {isEditing, trackName, onTrackNameChange, onEditingChange} = this.props;

        if(isEditing) {
            return <input className="mrt-track-title"
                   type="text" 
                   value={trackName} 
                   onChange={(e) => onTrackNameChange(e.target.value)}
                   onBlur={() => onEditingChange(false)} />
        } else {
            return <span className="mrt-track-title"
                  onDoubleClick={() => onEditingChange(true)} >
                  {trackName}
            </span>
        }
    }
}

function mapStateToProps(state, ownProps) {
    return ownProps;
}

function mapDispatchToProps(dispatch, ownProps) {
    const {trackId} = ownProps;
    return {
        onTrackNameChange: (name) => {
            dispatch(updateTrackName(trackId, name));
        },
        onTrackCollapseChange: (isCollapsed) => {
            dispatch(updateTrackCollapsed(trackId, isCollapsed));
        },
        onEditingChange: (isEditing) => {
            dispatch(updateTrackEditing(trackId, isEditing));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackHeader);