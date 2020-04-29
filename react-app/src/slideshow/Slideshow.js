import React from 'react';
import './Slideshow.css';
import pic from './DSC00533.jpg'

function Slideshow() {
    return (
        <div class="slideshow">
            <Image name="DSC00533.jpg"></Image>
        </div>
    );
}

function Image(props) {
    const filename = "./" + props.name;
    return (
        <img class="responsive" src={pic}></img>
    );
}


export default Slideshow;
