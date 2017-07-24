import { combineReducers } from 'redux';
import { tracksById, tracks } from './tracks';
import { tickPosition } from './tick';

export default combineReducers({
    tracks,
    tracksById,
    tickPosition
});