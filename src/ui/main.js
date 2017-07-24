import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { attachSequencerToStore } from './sequencer-redux';
import App from './components/App';
import Tone from 'tone';

const store = createStore(rootReducer);
attachSequencerToStore(store);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

Tone.Transport.start();