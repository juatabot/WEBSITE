import React from 'react';
import './AlbumSection.css';
import { getImageURL } from '../Utils';


class AlbumSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            src: props.src,
            text: props.text,
        };
    }

    componentDidMount() {
        var src_url = 'media,albums,' + this.state.title + ',' + this.state.src;
        getImageURL(src_url)
            .then(url => {
                this.setState({ src: url })
            })
    }

    render() {
        return (
            <div class="album-section">
                <img class="responsive" src={this.state.src}></img>
                <p class="text">{this.state.text}</p>
            </div >
        )
    }
}
export default AlbumSection;
