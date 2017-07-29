import { connect } from 'react-redux';
import React from 'react';
import { updateTrackSynth } from '../../ui-state/actions';
import { isValidNoteOctave } from '../../mixer/notes';
import InputRange from 'react-input-range';

class SynthEditor extends React.Component {
    render() {
        const { synthSettings, onChange } = this.props;
        const type = synthSettings.get("type");
        const synthProps = synthSettings.get("props");
        
        return (
            <div className="mrt-panel mrt-synth-editor">
                {this.renderField({
                    key: "rootNote",
                    display: "Root Note: ",
                    validFn: isValidNoteOctave,
                    inputFn: (x) => <input {...x} type="text" maxLength="3" />
                })}
                <label className="mrt-field">
                    <span className="mrt-name">Synth Type: </span>
                    <select>
                        <option value="am">AM Synth</option>
                        <option value="fm">FM Synth</option>
                        <option value="membrane">Memberane Synth</option>
                        <option value="metal">Metal Synth</option>
                        <option value="mono">Mono Synth</option>
                        <option value="noise">Noise Synth</option>
                    </select>
                </label>
            </div>
        );
    }

    renderField({ key, display, inputFn, validFn }) {
        const { synthSettings, onChange } = this.props;
        const value = synthSettings.get(key);
        const isValid = validFn(value);
        const status = !isValid ? "error" : "";
        
        return (
            <label className={"mrt-field " + status}>
                <span className="mrt-name">{display}</span>
                {inputFn({
                    value: value,
                    onChange: (x) => onChange({ [key]: x.target.value.toUpperCase() })
                })}
            </label>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onChange: (obj) => {
            dispatch(updateTrackSynth(ownProps.trackId, obj));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SynthEditor);