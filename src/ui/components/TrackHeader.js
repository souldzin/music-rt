import React from "react";
import { connect } from "react-redux";
import { removeTrack,
         updateTrackEditing, 
         updateTrackName,
         updateTrackCollapsed } from "../actions/tracks";

const KEY_CODE_ENTER = 13;

/**
 * Expected props:
 * - trackId, trackName, isEditing
 */
export class TrackHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

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
                {this.renderActions()}
            </div>
        )      
    }

    renderCollapseButton() {
        const { isCollapsed, onCollapseUpdate } = this.props;

        return <span className="mrt-track-toggle" onClick={() => onCollapseUpdate(!isCollapsed)}></span>
    }

    renderTitle() {
        const { trackName } = this.props;
        const { isEditing } = this.state;

        if(isEditing) {
            // setup some props here for readability
            const onKeyPress = (e) => {
                if(e.charCode === KEY_CODE_ENTER) {
                    this.stopEditing();
                }                
            };

            return (
                <span className="mrt-track-title-wrapper">
                    <input className="mrt-track-title"
                        type="text" 
                        value={trackName} 
                        ref={(e) => {this.nameInput = e}}
                        onChange={(e) => this.updateName(e.target.value)}
                        onKeyPress={onKeyPress}
                        onBlur={() => this.stopEditing()} />
                </span>
            );
        } else {
            return (
                <span className="mrt-track-title-wrapper">
                    <span className="mrt-track-title"
                        onDoubleClick={() => this.startEditing()} >
                        {trackName || "(unnamed)"}
                    </span>
                    <span className="mrt-edit-btn"
                        onClick={() => this.startEditing()}>
                    </span>
                </span>
            );
        }
    }

    renderActions() {
        return (
            <span className="mrt-track-actions">
                <span className="mrt-delete-btn" onClick={() => this.remove()}></span>
            </span>
        )
    }

    // --- methods for events ---------------------------

    startEditing() {
        this.updateEditing(true);
    }
    
    stopEditing() {
        this.updateEditing(false);
    }

    updateEditing(val) {
        this.setState((prevState) => ({
            isEditing: val
        }));
    }

    updateName(val) {
        const {onNameUpdate} = this.props;
        const {isEditing} = this.state;

        if(onNameUpdate) {
            onNameUpdate(val);
        }
    }

    focusOnInput() {
        if(this.nameInput) {
            this.nameInput.focus();
        }
    }

    remove() {
        const {onRemove} = this.props;
        if(onRemove) {
            onRemove();
        }
    }
}

function mapStateToProps(state, ownProps) {
    return ownProps;
}

function mapDispatchToProps(dispatch, ownProps) {
    const {trackId} = ownProps;
    return {
        onNameUpdate: (name) => {
            dispatch(updateTrackName(trackId, name));
        },
        onRemove: () => {
            dispatch(removeTrack(trackId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackHeader);