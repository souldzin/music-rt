import io from 'socket.io-client';

// --- exports --------------
export {
    clientMiddleware,
    connect
};

// --- connect to socket ----

function connect() {
    const socket = io();

    return {
        socket: socket
    };
}

function clientMiddleware({ socket }) {
    return ({ getState, dispatch }) => {
        // --- initialize state with server
        socket.on('init', ({state}) => {
            console.log('init...');
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
