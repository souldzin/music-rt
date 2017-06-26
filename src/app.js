import React from "react";
import ReactDOM from "react-dom";
import * as Tone from "tone";

const BUTTON_SIZE = 50;
const BUTTON_MARGIN = 12;

// utility functions
// --------------------

function range(n) {
    return Array.from(Array(n).keys());
}

class ButtonGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tick: -1,
            buttons: range(props.count).map(n => {
                return { status: "inactive" };
            })
        };
    }

    componentDidMount() {
        let self = this;
        Tone.Transport.scheduleRepeat((time) => {
            Tone.Transport.schedule(() => {
                self.setState((prevState, props) => {
                    const prevTick = prevState.tick;
                    return { 
                        tick: prevTick === (props.count - 1) 
                            ? 0
                            : prevTick + 1
                    }
                });
            }, time);
        }, "8n", 0);
    }

    getButtonSize() {
        return BUTTON_SIZE;
    }

    getButtonMargin() {
        return BUTTON_MARGIN;
    }

    getGridWidth() {
        const size = this.getButtonSize();
        const margin = this.getButtonMargin();
        const cols = this.getGridCols();
        return cols * size + (cols - 1) * margin;
    }

    getGridHeight() {
        const size = this.getButtonSize();
        const margin = this.getButtonMargin();
        const rows = this.getGridRows();
        return rows * size + (rows - 1) * margin;
    }

    getGridCols() {
        return this.props.cols;
    }

    getGridRows() {
        return Math.floor(this.props.count / this.props.cols);
    }

    render() {
        const style = {
            width: this.getGridWidth() + "px", 
            height: this.getGridHeight() + "px",
            margin: "auto", 
            padding: this.getButtonMargin() + "px",
            display: "block"
        };
        return (
            <div>
                <svg style={style}>
                    {this.state.buttons.map(this.renderButton.bind(this))}
                </svg>
            </div>
        );
    }

    renderButton(button, n) {
        const size = this.getButtonSize();
        const margin = this.getButtonMargin();
        const cols = this.getGridCols();
        const tick = this.state.tick;
        const rowIdx = Math.floor(n / cols);
        const colIdx = n % cols;
        const y = (size + margin) * rowIdx;
        const x = (size + margin) * colIdx;
        const key = (rowIdx + 1) * colIdx;
        const status = tick === n
            ? "tick"
            : button.status;
        const cls = "sqbutton " + status;
        return (
            <use xlinkHref="#svg-sequencer-button" key={n} x={x} y={y} width={size} height={size} className={cls} />
        );
    }
}

ReactDOM.render(
    <div>
        <ButtonGrid cols={8} count={16} />,
        <ButtonGrid cols={8} count={16} />
    </div>,
    document.getElementById('app')
);

Tone.Transport.start();