import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import { mixerMiddleware, mixerSubscribe } from "../mixer-redux"

export function createStoreForMixer(mixer, config) {
    config = config || {};
    const middlewares = [];

    // --- is this local, if not, let's connect the socket-io middleware
    if(!config.local) {
        const {clientMiddleware} = require('../client');
        middlewares.push(clientMiddleware());
    }

    middlewares.push(mixerMiddleware(mixer));

    const store = createStore(rootReducer, applyMiddleware(...middlewares));
    mixerSubscribe(mixer, store);

    return store;
}