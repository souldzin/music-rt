import React from "react";
import { connect } from "react-redux";
import { updateTrackEditing, 
         updateTrackName,
         updateTrackCollapsed } from "../actions/tracks";

const KEY_CODE_ENTER = 13;

/**
 * Expected props:
 * - trackId, trackName, isEditing
 */
export class TrackHeader extends React.Component {
    componentDidMount() {
        this.focusOnInput();
    }

    componentDidUpdate() {
        this.focusOnInput();
    }

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
            // setup some props here for readability
            const onKeyPress = (e) => {
                if(e.charCode === KEY_CODE_ENTER) {
                    this.stopEditing();
                }                
            };

            return <input className="mrt-track-title"
                   type="text" 
                   value={trackName} 
                   ref={(e) => {this.nameInput = e}}
                   onChange={(e) => this.updateName(e.target.value)}
                   onKeyPress={onKeyPress}
                   onBlur={() => this.stopEditing()} />
        } else {
            return <span className="mrt-track-title"
                  onDoubleClick={() => this.startEditing()} >
                  {trackName}
            </span>
        }
    }

    // --- methods for events ---------------------------

    startEditing() {
        this.updateEditing(true);
    }
    
    stopEditing() {
        this.updateEditing(false);
    }

    updateEditing(val) {
        const {onEditingChange} = this.props;
        if(onEditingChange) {
            onEditingChange(val);
        }
    }

    updateName(val) {
        const {onTrackNameChange} = this.props;
        if(onTrackNameChange) {
            onTrackNameChange(val);
        }
    }

    focusOnInput() {
        if(this.nameInput) {
            this.nameInput.focus();
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