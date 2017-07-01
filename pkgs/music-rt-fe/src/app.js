import React from "react";
import ReactDOM from "react-dom";
import * as Tone from "tone";
import {ButtonGrid} from "./components/button-grid";
import {Scheduler} from "./scheduler";

const scheduler = new Scheduler();
const controller = scheduler.newButtonController();

ReactDOM.render(
    <div>
        <ButtonGrid controller={controller} />
        <ButtonGrid controller={controller} />
    </div>,
    document.getElementById('app')
);

Tone.Transport.start();