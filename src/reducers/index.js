import { combineReducers } from 'redux';
import { tracks, selectedTrackId } from './tracks';

export default combineReducers({
    tracks,
    selectedTrackId
});