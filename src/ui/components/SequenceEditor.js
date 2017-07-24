import React from 'react';
import { connect } from 'react-redux';

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
 * - tick, trackId, sequence, onToggle
 */
export class DrumSequenceEditor extends React.Component {
    render() {
        const {tickPosition, trackId, sequence, onToggle} = this.props;
        const tickIdx = mapTickToSequence(tickPosition, sequence);

        return (
            <div className="mrt-drum-editor">
                {sequence.get("beats").map((beat, idx) => renderDrumButton({
                    idx: idx,
                    isActive: beat.get("isActive"),
                    isTick: idx === tickIdx,
                    onClick: () => {}
                }))}
            </div>
        )
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

export default connect(mapStateToProps)(SequenceEditor);