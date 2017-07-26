import io from 'socket.io-client';

// --- exports --------------
export {
    clientMiddleware
};

function clientMiddleware() {
    return ({ getState, dispatch }) => {
        const socket = io();

        // --- initialize state with server
        socket.on('init', ({state}) => {
            dispatch({
                type: 'SET_STATE',
                payload: state
            });
        });

        return next => {
            // --- we got an action from the server :)
            socket.on('action', x => {
                next(x);
            });

            return action => {
                // --- we need to sync this action with the server
                if(action.sync) {
                    socket.emit('action', action);
                } 
                // --- this action doesn't need syncing (e.g. TICK_UPDATE)
                else {
                    next(action);
                }
            }
        }
    }    
}
