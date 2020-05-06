import React from 'react';
import './Image.css';
import { v4 as uuidv4 } from 'uuid';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = { src: null };
    }

    componentDidMount() {
        console.log("componentDidMount")
        this.sendResolution();
        this.getImageURL('/api/slideshow/first-image').then(newurl => {
            this.setState({ src: newurl })
        });
        this.login();
    }

    login() {
        const uuid = uuidv4();
        console.log(uuid);
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ 'uuid': uuid }),
        });
    }

    sendResolution() {
        const width = document.getElementById('image').clientWidth;
        const height = document.getElementById('image').clientHeight;
        const data = { 'width': width, 'height': height };
        fetch('/api/get-resolution', {
            method: 'POST',
            body: JSON.stringify(data),
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
        this.getImageURL('/api/slideshow/next').then(newurl => {
            this.setState({ src: newurl })
        });
    }

    render() {
        return (
            <img id='image' class="responsive" onClick={() => this.nextPhoto()} src={this.state.src}></img>
        );
    }
} export default Image;
