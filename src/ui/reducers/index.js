import { fromJS } from 'immutable';
import { combineReducers } from 'redux';
import { tracksById, tracks } from './tracks';
import { tickPosition } from './tick';
import { SET_STATE } from '../actions/names';

const appReducer = combineReducers({
    tracks,
    tracksById,
    tickPosition
});

function rootReducer(state, action) {
    if(action.type === SET_STATE) {
        // --- we need to make this immutable...
        //     except for the top level fields
        const state = action.payload;

        for(var p in state) {
            state[p] = fromJS(state[p]);
        }

        return state;
    }

    return appReducer(state, action);
}

export default rootReducer;