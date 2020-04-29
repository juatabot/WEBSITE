import React from 'react';
import ReactDOM from 'react-dom';
import './Slideshow.css';
import pic from './DSC00533.jpg'

function Slideshow() {
    return (
        <div class="slideshow-image">
            <Image id='image' name="DSC00533.jpg"></Image>
        </div>
    );
}

function Image(props) {

    function nextPhoto() {
        alert("clicked!");
        fetch('/api/next')
            .then(res => res.blob())
            .then(img => {
                // ????
            });
    }

    const filename = "./" + props.name;
    return (
        <img class="responsive" onClick={nextPhoto.bind(this)} src={pic}></img>
    );
}

// https://stackoverflow.com/questions/52979155/displaying-images-from-fetch-api-call-node-react

export default Slideshow;
