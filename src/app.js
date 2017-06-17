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
            self.setState((prevState, props) => {
                const prevTick = prevState.tick;
                return { 
                    tick: prevTick === (props.count - 1) 
                        ? 0
                        : prevTick + 1
                }
            });
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
            <svg style={style}>
                <defs>
                    <linearGradient id="svg-grad-inactive">
                        <stop offset="0" stopColor="#e0e0e0" />
                        <stop offset="0.2" stopColor="#ccc" />
                        <stop offset="1" stopColor="#aaa" />
                    </linearGradient>
                    <linearGradient id="svg-grad-active">
                        <stop offset="0" stopColor="#6499c1" />
                        <stop offset="0.3" stopColor="#3e79a7" />
                        <stop offset="1" stopColor="#23689c" />
                    </linearGradient>
                    <linearGradient id="svg-grad-tick">
                        <stop offset="0" stopColor="#fe7579" />
                        <stop offset="0.3" stopColor="#fd4c51" />
                        <stop offset="1" stopColor="#f82227" />
                    </linearGradient>
                </defs>
                {this.state.buttons.map(this.renderButton.bind(this))}
            </svg>
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
        return (
            <rect status={status}
                  x={x} 
                  y={y} 
                  width={size} 
                  height={size} 
                  rx={15}
                  ry={15} 
                  className={"button " + status} />
        );
    }
}

ReactDOM.render(
    <ButtonGrid cols={8} count={16} />,
    document.getElementById('app')
);

Tone.Transport.start();