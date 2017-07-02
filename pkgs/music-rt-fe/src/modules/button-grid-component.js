import React from "react";
import { List } from "immutable";

export class ButtonGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: List()
        };
    }

    componentDidMount() {
        let self = this;
        this.props.controller.buttonsObservable().subscribe(
            (buttons) => {
                self.setState(() => ({
                    buttons: buttons
                }));
            }
        )
    }

    render() {
        return (
            <div className="mrt-sq-button-grid">
                {this.state.buttons.map(this.renderButton.bind(this))}
            </div>
        );
    }

    renderButton(button) {
        const self = this;
        const key = button.get("key");
        const isTicked = button.get("isTicked");
        const status = isTicked 
            ? "tick" 
            : button.get("status");
        const cls = "mrt-sq-button " + status;
        return (
            <div key={key} className={cls} onClick={self.onButtonClick.bind(self, key)} />
        );
    }

    onButtonClick(key) {
        this.props.controller.toggleButton(key);
    }
}

function getButtonClass(button) {
    return button.get("isTicked")
        ? button.get("isActive")
        ? "active"
        : "inactive"
        : "tick";
}