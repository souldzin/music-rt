import React from 'react';
import { connect } from 'react-redux';
import { updateTrackSequence } from '../actions/sequences';

function mapTickToSequence(tickPosition, sequence) {
    const tickInterval = tickPosition.interval;
    const tickIdx = tickPosition.idx;
    const sequenceInterval = sequence.get('interval');

    // get tickInterval / sequenceInterval ratio
    const ratio = sequenceInterval / tickInterval;

    // apply to tickIdx
    return tickIdx * ratio;
}

/**
 * expected props:
 * - tickPosition, trackId, sequence
 */
export class SequenceEditor extends React.Component {
    render() {
        const props = this.props;
        const sequence = props.sequence;
        const sequenceType = sequence ? sequence.get("type") : "";

        if(sequenceType === 'drum') {
            return <DrumSequenceEditor {...props} />;
        } else {
            return <UnsupportedSequenceEditor sequenceType={sequenceType} />;
        }
    }
}

// --- DRUM EDITOR ---------------
// -------------------------------

export function renderDrumButton({idx, onClick, isActive, isTick}) {
    const status = (isActive ? "active " : "") 
                 + (isTick ? "tick " : "");
    
    return (
        <div className={"mrt-drum-btn " + status} onClick={onClick} key={idx}></div>
    );
}

/**
 * expected props:
 * - tick, sequence, onUpdate
 */
export class DrumSequenceEditor extends React.Component {
    render() {
        const {tickPosition, sequence} = this.props;
        const tickIdx = mapTickToSequence(tickPosition, sequence);

        return (
            <div className="mrt-drum-editor">
                {sequence.get("beats").map((beat, idx) => renderDrumButton({
                    idx: idx,
                    isActive: beat.get("active"),
                    isTick: idx === tickIdx,
                    onClick: () => { this.onClick(beat, idx); }
                }))}
            </div>
        )
    }
    
    onClick(beat, idx) {
        const {onUpdate, trackId} = this.props;

        const newBeat = {
            idx: idx,
            active: !beat.get("active")
        };

        onUpdate(trackId, newBeat);
    }
}

// --- UNSUPPORTED EDITOR ---------------
// --------------------------------------

export class UnsupportedSequenceEditor extends React.Component {
    render() {
        const {sequenceType} = this.props;

        return (
            <div>
                <p>The sequence type "{sequenceType || "not found"}" is not yet supported.</p>
            </div>
        )
    }
}

// --- connect to redux -----------------

function mapStateToProps(state, ownProps) {
    return {
        tickPosition: state.tickPosition
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onUpdate: (trackId, beat) => dispatch(updateTrackSequence(trackId, beat))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SequenceEditor);