import React from 'react';
import './AlbumCover.css';
import { getImageURL } from '../Utils';
import { Link } from 'react-router-dom';


class AlbumCover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            src: null,
        };
    }

    componentDidMount() {
        var url = 'media,albums,' + this.state.title + ',' + this.state.title + '.jpg';
        getImageURL(url, this.getResolution()["width"])
            .then(url => {
                this.setState({ src: url })
            })
    }

    getResolution() {
        const width = document.getElementById('image').clientWidth;
        const height = document.getElementById('image').clientHeight;
        const data = { 'width': width, 'height': height };
        return data;
    }

    render() {
        var link_url = '/memories/' + this.state.title;
        return (
            <div>
                <Link to={link_url} class="link">
                    <img id="image" class="responsive" src={this.state.src}></img>
                </Link>
                <p class="title">{this.state.title.replace("-", " ")}</p>
            </div >
        )
    }
}
export default AlbumCover;
