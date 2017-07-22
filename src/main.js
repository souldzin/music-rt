import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as Tone from 'tone';
import { List } from 'immutable';
import rootReducer from './reducers';
import App from './components/App';

// DEV ----
// this code initializes the state for testing
// --------

const initState = {
    tracks: List([
        {
            id: 'A',
            name: "Drum track"
        },
        {
            id: 'B',
            name: "Lead track"
        },
        {
            id: 'C',
            name: "Bogus"
        }
    ]),
    selectedTrackId: 'B'
};

const store = createStore(rootReducer, initState);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

Tone.Transport.start();