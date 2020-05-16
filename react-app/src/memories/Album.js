import React from 'react';
import './Album.css';
import Menu from '../menu/Menu';


class Album extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <div class="album">
                <span class='menu'> {Menu()}</span>
                <div class="album-images">{this.state.match.params.album} album goes here</div>
            </div>
        )
    }
}
export default Album;
