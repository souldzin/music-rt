import { connect } from 'react-redux';
import React from 'react';
import { updateTrackSynth } from '../../ui-state/actions';
import { isValidNoteOctave } from '../../mixer/notes';
import { synths } from '../../mixer/synths';

class SynthEditor extends React.Component {
    render() {
        const { synthSettings, onChange } = this.props;
        const type = synthSettings.get("type");
        const synthProps = synthSettings.get("props");
        
        return (
            <div className="mrt-panel mrt-synth-editor">
                {this.renderField({
                    key: "rootNote",
                    display: "Root Note",
                    validFn: isValidNoteOctave,
                    inputFn: (x) => <input {...x} type="text" maxLength="3" />
                })}
                {this.renderField({
                    key: "type",
                    display: "Synth Type",
                    inputFn: (x) => (<select {...x}>
                        {synths.map((s, idx) => <option key={idx} value={s.get("id")}>{s.get("display")}</option>)}
                    </select>)
                })}
            </div>
        );
    }

    renderField({ key, display, inputFn, validFn }) {
        const { synthSettings, onChange } = this.props;
        const value = synthSettings.get(key);
        const isValid = validFn ? validFn(value) : true;
        const status = !isValid ? "error" : "";
        
        return (
            <label className={"mrt-field " + status}>
                <span className="mrt-name">{display}: </span>
                {inputFn({
                    value: value,
                    onChange: (x) => onChange({ [key]: x.target.value })
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