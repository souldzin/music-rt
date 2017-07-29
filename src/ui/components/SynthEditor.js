import { connect } from 'react-redux';
import React from 'react';
import { updateTrackSynth } from '../../ui-state/actions';
import { isValidNoteOctave } from '../../mixer/notes';
import { synths } from '../../mixer/synths';
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
                    display: "Root Note",
                    validFn: isValidNoteOctave,
                    inputFn: (x) => <input {...x} type="text" maxLength="3" />,
                    valueFn: x => x.target.value
                })}
                {this.renderField({
                    key: "volume",
                    display: "Volume",
                    inputFn: (x) => (<div style={{ display: 'inline-block', width: '300px', verticalAlign: 'middle' }}>
                            <InputRange {...x} maxValue={30} minValue={-30} />
                        </div>),
                    valueFn: x => x
                })}
                {this.renderField({
                    key: "type",
                    display: "Synth Type",
                    inputFn: (x) => (<select {...x}>
                        {synths.map((s, idx) => <option key={idx} value={s.get("id")}>{s.get("display")}</option>)}
                    </select>),
                    valueFn: x => x.target.value
                })}
            </div>
        );
    }

    renderField({ key, display, inputFn, validFn, valueFn }) {
        const { synthSettings, onChange } = this.props;
        const value = synthSettings.get(key);
        const isValid = validFn ? validFn(value) : true;
        const status = !isValid ? "error" : "";
        
        return (
            <label className={"mrt-field " + status}>
                <span className="mrt-name">{display}: </span>
                {inputFn({
                    value: value,
                    onChange: (x) => onChange({ [key]: valueFn(x) })
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