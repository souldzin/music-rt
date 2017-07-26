export function mixerMiddleware({ dispatch, getState }) {
    return next => action => {
        return next(action);
    }
}

export default mixerMiddleware;