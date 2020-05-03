import React from 'react';
import './Image.css';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = { src: null };
    }

    componentDidMount() {
        console.log("componentDidMount")
        // this.sendData();
        this.getImageURL('/api/slideshow/first-image').then(newurl => {
            this.setState({ src: newurl })
        });
    }

    sendData() {
        const width = document.getElementById('image').clientWidth;
        const height = document.getElementById('image').clientHeight;
        const data = { 'width': width, 'height': height };
        fetch('/api/get-resolution', {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    getImageURL(url) {
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
    }

    render() {
        return (
            <div>
                <img class="responsive" onClick={() => this.nextPhoto()} src={this.state.src}></img>
            </div>

        );
    }
} export default Image;
