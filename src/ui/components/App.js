import React from 'react';
import Header from './Header';
import TrackList from './TrackList';

export default class App extends React.Component {
    render() {
        return <div className="mrt-app">
            <Header />
            <TrackList />
        </div>;
    }
}