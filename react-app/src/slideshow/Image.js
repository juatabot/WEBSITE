import React from 'react';
import './Image.css';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = { src: "./DSC00533.jpg" };
    }

    getImageURL(url) {
        return fetch('/api/next')
            .then(response => response.blob())
            .then(images => {
                // Create a local URL for that image and print it 
                console.log(images)
                return URL.createObjectURL(images)
            })
    }

    nextPhoto() {
        this.getImageURL('/api/next').then(newurl => {
            console.log(newurl);
            this.setState({ src: newurl })
        });
    }

    render() {
        return (
            <img class="responsive" onClick={this.nextPhoto.bind(this)} src={this.state.src}></img>
        );

    }
} export default Image;
