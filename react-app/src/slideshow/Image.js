import React from 'react';
import './Image.css';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = { src: null };
    }

    componentDidMount() {
        // get first image api, send cookie
        this.getImageURL('/api/first-image').then(newurl => {
            this.setState({ src: newurl })
        });
    }

    getImageURL(url) {
        return fetch(url)
            .then(response => response.blob())
            .then(images => {
                return URL.createObjectURL(images)
            })
    }

    nextPhoto() {
        this.getImageURL('/api/next').then(newurl => {
            this.setState({ src: newurl })
        });
    }

    render() {
        return (
            <img class="responsive" onClick={this.nextPhoto.bind(this)} src={this.state.src}></img>
        );

    }
} export default Image;
