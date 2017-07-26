import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { mixerMiddleware, mixerSubscribe } from '../mixer-redux';
import { connect, clientMiddleware } from '../mixer-client';
import App from './components/App';

const config = window.MUSIC_RT_CONFIG || {};
const middlewares = [];

if(!config.local) {
    const {clientMiddleware} = require('../mixer-client');
    middlewares.push(clientMiddleware());
}

middlewares.push(mixerMiddleware);

const store = createStore(rootReducer, applyMiddleware(...middlewares));
mixerSubscribe(store);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);