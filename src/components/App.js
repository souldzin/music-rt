import React from 'react';
import SelectedTrackList from '../containers/SelectedTrackList';

export default class App extends React.Component {
    render() {
        return <div className="mrt-app">
            <div className="mrt-viewport-main">
                <SelectedTrackList />            
            </div>
        </div>;
    }
}