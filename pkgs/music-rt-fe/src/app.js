import React from "react";
import ReactDOM from "react-dom";
import * as Tone from "tone";
import { ButtonGridComponent, ButtonGridController } from "./modules";

const controller = new ButtonGridController();

ReactDOM.render(
    <div>
        <ButtonGridComponent controller={controller} />
        <ButtonGridComponent controller={controller} />
    </div>,
    document.getElementById('app')
);

Tone.Transport.start();