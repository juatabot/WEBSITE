import React from 'react';
import './Image.css';
import { v4 as uuidv4 } from 'uuid';
import { getImageURL } from '../Utils';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: null,
        };
    }

    componentDidMount() {
        this.login(() => {
            var next_image = this.state.image_list[this.state.index];
            getImageURL('media,slideshow-images,' + next_image).then(newurl => {
                this.setState({ src: newurl })
            });
        });
    }

    parseCookie() {
        var fields = document.cookie.split(";").map(x => x.trim());
        var image_list = [];
        console.log(fields);
        fields.forEach(entry => {
            var key = entry.split("=")[0];
            var value = entry.split("=")[1];
            if (value.includes("/")) {
                value.split("/").forEach(pic => {
                    if (pic) {
                        image_list.push(pic);
                    }
                });
                value = image_list;
            }
            else if (!isNaN(value)) {
                value = Number(value);
            }
            this.state[key] = value;
        })
    }

    login(callback) {
        const uuid = uuidv4();
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                'uuid': uuid,
                'resolution': this.getResolution()
            }),
        }).then(() => {
            this.parseCookie();
            callback();
        });
    }

    getResolution() {
        const width = document.getElementById('image').clientWidth;
        const height = document.getElementById('image').clientHeight;
        const data = { 'width': width, 'height': height };
        return data;
    }

    nextPhoto() {
        var new_index = this.state.index + 1;
        this.setState({ index: new_index }, () => {
            var image_list_length = this.state.image_list.length;
            var next_image = this.state.image_list[this.state.index % image_list_length];
            getImageURL('media,slideshow-images,' + next_image).then(newurl => {
                this.setState({ src: newurl })
            });
        });

    }

    render() {
        return (
            <img id='image' class="responsive" onClick={() => this.nextPhoto()} src={this.state.src}></img>
        );
    }
} export default Image;
