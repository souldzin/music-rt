import React from 'react';

export default class TrackItem extends React.Component {
    render() {
        const status = this.props.isSelected ? "selected" : "";
        const track = this.props.track;

        return <div className={"mrt-track " + status} 
                    onClick={this.props.onClick}>
            <span className="mrt-track-title">{track.name}</span>
        </div>;
    }


}