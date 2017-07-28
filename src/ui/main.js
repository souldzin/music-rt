import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { Mixer } from '../mixer';
import { mixerMiddleware, mixerSubscribe } from '../mixer-redux';
import { connect, clientMiddleware } from '../mixer-client';
import App from './components/App';

const config = window.MUSIC_RT_CONFIG || {};
const middlewares = [];

// --- is this local, if not, let's connect the socket-io middleware
if(!config.local) {
    const {clientMiddleware} = require('../mixer-client');
    middlewares.push(clientMiddleware());
}

// --- initialize mixer
const mixer = new Mixer({
    interval: 8,
    measureCount: 4
});

middlewares.push(mixerMiddleware(mixer));

const store = createStore(rootReducer, applyMiddleware(...middlewares));
mixerSubscribe(mixer, store);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

window._mixer = mixer;