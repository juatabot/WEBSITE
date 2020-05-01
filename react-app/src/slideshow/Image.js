import React from 'react';
import './Image.css';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = { src: null };
    }

    componentDidMount() {
        console.log("componentDidMount")
        this.getImageURL('/api/slideshow/first-image').then(newurl => {
            this.setState({ src: newurl })
        });
    }

    getImageURL(url) {
        console.log("getImageURL")
        return fetch(url)
            .then(response => response.blob())
            .then(images => {
                return URL.createObjectURL(images)
            })
    }

    nextPhoto() {
        
        this.getImageURL('/api/slideshow/next').then(newurl => {
            this.setState({ src: newurl })
        });
        console.log("nextPhoto")
    }

    render() {
        return (
            <img class="responsive" onClick={() => this.nextPhoto()} src={this.state.src}></img>
        );
    }
} export default Image;
