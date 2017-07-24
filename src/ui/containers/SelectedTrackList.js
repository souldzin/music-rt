import { connect } from 'react-redux';
import TrackList from '../components/TrackList';
import { selectTrackId } from '../actions/tracks';

function mapStateToProps(state) {
    return {
        tracks: state.tracks,
        selectedTrackId: state.selectedTrackId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onTrackSelected: (track) => {
            dispatch(selectTrackId(track));
        }
    }
}

const SelectedTrackList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackList);

export default SelectedTrackList;