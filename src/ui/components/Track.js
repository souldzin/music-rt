import React from 'react';
import SequenceEditor from './SequenceEditor';
import TrackHeader from './TrackHeader';


/**
 * Expected props:
 * - trackId, trackName, sequence, isCollapsed
 */
export default class Track extends React.Component {
    render() {
        const { trackName, 
                trackId, 
                sequence,
                isCollapsed,
                isEditing } = this.props;

        const status = (isCollapsed ? "collapse" : "");

        return (<div className={"mrt-track " + status}> 
            <TrackHeader trackId={trackId} trackName={trackName} isEditing={isEditing} isCollapsed={isCollapsed} />
            <TrackBody trackId={trackId} sequence={sequence} />
        </div>);
    }
}


/**
 * Expected props:
 * - trackId, sequence
 */
export class TrackBody extends React.Component {
    render() {
        const {trackId, sequence} = this.props;

        return (
            <div className="mrt-track-body">
                <SequenceEditor trackId={trackId} sequence={sequence} />
            </div>
        )
    }
}