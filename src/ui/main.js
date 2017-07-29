import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Mixer } from '../mixer';
import { createStoreForMixer } from '../ui-state';
import App from './components/App';

const config = window.MUSIC_RT_CONFIG || {};
const mixer = new Mixer({
    interval: 8,
    measureCount: 4
});

const store = createStoreForMixer(mixer, config);
window._store = store;

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);