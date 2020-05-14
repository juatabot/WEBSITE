import React from 'react';
import './AlbumCover.css';
import { getImageURL } from '../Utils';

class AlbumCover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            src: null,
        };
    }

    componentDidMount() {
        getImageURL('media,albums,' + this.state.title + ',cover.jpg')
            .then(url => {
                this.setState({ src: url })
            })
    }

    render() {
        return (
            <div>
                <img class="responsive" src={this.state.src}></img>
                <p class="title">{this.state.title}</p>
            </div >
        )
    }
}
export default AlbumCover;
