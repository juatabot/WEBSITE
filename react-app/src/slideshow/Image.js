import React from 'react';
import './Image.css';
import { v4 as uuidv4 } from 'uuid';


class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: null,
        };
    }

    componentDidMount() {
        console.log("componentDidMount")
        this.login();
        this.getImageURL('/api/slideshow/first-image').then(newurl => {
            this.setState({ src: newurl })
        });
        this.parseCookie();
    }

    parseCookie() {
        var fields = document.cookie.split(";").map(x => x.trim());
        var image_list = [];
        fields.forEach(entry => {
            var key = entry.split("=")[0];
            var value = entry.split("=")[1];
            if (value.includes("/")) {
                value.split("/").forEach(pic => {
                    image_list.push(pic);
                });
                value = image_list;
            }
            this.state[key] = value;
        })
        console.log(this.state);
    }

    login() {
        const uuid = uuidv4();
        console.log(uuid);
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                'uuid': uuid,
                'resolution': this.getResolution()
            }),
        }).then();
    }

    getResolution() {
        const width = document.getElementById('image').clientWidth;
        const height = document.getElementById('image').clientHeight;
        const data = { 'width': width, 'height': height };
        return data;
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
