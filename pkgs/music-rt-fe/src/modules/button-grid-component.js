import React from "react";

export class ButtonGrid extends React.Component {
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

    render() {
        return (
            <div className="mrt-sq-button-grid">
                {this.state.buttons.map(this.renderButton.bind(this))}
            </div>
        );
    }

    renderButton(button, n) {
        const tick = this.state.tick;
        const status = tick === n
            ? "tick"
            : button.status;
        const cls = "mrt-sq-button " + status;
        return (
            <div key={n} className={cls} />
        );
    }
}