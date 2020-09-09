import React from 'react';
import './Image.css';
import { v4 as uuidv4 } from 'uuid';
import { getImageURL } from '../Utils';
import loading from './../anims/loading.gif'
import whitebox from './../anims/whitebox.jpg'

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // temp name for getting resolution on mount. fix this later!
            src: whitebox,
            errored: false,
            first: true,
        };
    }

    componentDidMount() {
        this.login(() => {
            var next_image = this.state.image_list[this.state.index];
            if (this.state.first) {
                this.setState({ first: false });
                getImageURL('media,slideshow-images,' + next_image, 1000).then(newurl => {
                    this.setState({ src: newurl })
                })
            }
            else{
                getImageURL('media,slideshow-images,' + next_image, this.getResolution()["width"]).then(newurl => {
                    this.setState({ src: newurl })
                });
            }
            
        });
    }

    parseCookie() {
        var fields = document.cookie.split(";").map(x => x.trim());
        var image_list = [];
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
        const width = document.getElementById(this.state.src).clientWidth;
        const height = document.getElementById(this.state.src).clientHeight;
        const data = { 'width': width, 'height': height };
        return data;
    }

    nextPhoto() {
        var new_index = this.state.index + 1;
        this.setState({ index: new_index }, () => {
            var image_list_length = this.state.image_list.length;
            var next_image = this.state.image_list[this.state.index % image_list_length];
            this.setState({ src: loading });
            console.log(this.state.first);
            if (this.state.first) {
                this.setState({ first: false });
                getImageURL('media,slideshow-images,' + next_image, 1000).then(newurl => {
                    this.setState({ src: newurl })
                })
            }
            else {
                getImageURL('media,slideshow-images,' + next_image, this.getResolution()["width"]).then(newurl => {
                    this.setState({ src: newurl })
                });
            }

        });

    }

    onError = () => {
        if (!this.state.errored) {
            this.setState({
                src: loading,
                errored: true,
            });
        }
    };


    render() {
        let image;
        if (this.state.src == loading) {
            image = <img id={this.state.src} onError={this.onError()} src={this.state.src}></img>
        }
        else {
            image = <img id={this.state.src} class="responsive-slideshow" onError={this.onError()} onClick={() => this.nextPhoto()} src={this.state.src}></img>
        }

        console.log(this.state.src);

        return image;
    }
} export default Image;
