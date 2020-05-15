import React from 'react';
import './Album.css';

class Album extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <div>{this.state.match.params.album} album goes here</div>
        )
    }
}
export default Album;
