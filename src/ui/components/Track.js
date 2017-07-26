import React from 'react';
import SequenceEditor from './SequenceEditor';
import TrackHeader from './TrackHeader';


/**
 * Expected props:
 * - trackId, trackName, sequence, isCollapsed
 */
export default class Track extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isCollapsed: false
        };
    }

    render() {
        const { isCollapsed } = this.state;
        const { trackName, 
                trackId, 
                sequence } = this.props;

        const status = (isCollapsed ? "collapse" : "");

        return (<div className={"mrt-track " + status}> 
            <TrackHeader trackId={trackId} trackName={trackName} isCollapsed={isCollapsed} onCollapseUpdate={(x) => this.collapse(x)} />
            <TrackBody trackId={trackId} sequence={sequence} />
        </div>);
    }

    collapse(isCollapsed) {
        this.setState((prevState) => ({
            isCollapsed: isCollapsed
        }));
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