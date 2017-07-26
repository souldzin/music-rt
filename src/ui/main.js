import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { mixerMiddleware, mixerSubscribe } from '../mixer-redux';
import { connect, clientMiddleware } from '../mixer-client';
import App from './components/App';

const middlewares = [clientMiddleware(connect()), mixerMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
mixerSubscribe(store);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);