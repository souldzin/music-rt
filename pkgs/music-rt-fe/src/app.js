import React from "react";
import ReactDOM from "react-dom";
import * as Tone from "tone";
import {ButtonGrid} from "./components/button-grid";

ReactDOM.render(
    <div>
        <ButtonGrid cols={8} count={16} />
        <ButtonGrid cols={8} count={16} />
    </div>,
    document.getElementById('app')
);

Tone.Transport.start();