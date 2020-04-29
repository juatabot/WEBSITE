import React from 'react';
import './Slideshow.css';
import pic from './DSC00533.jpg'

function Slideshow() {
    return (
        <div class="slideshow-image">
            <Image name="DSC00533.jpg"></Image>
        </div>
    );
}

function Image(props) {

    function nextPhoto() {
        alert("clicked!");  
        fetch('/api/count')
            .then(res => res.json())
            .then(result => alert(result));  
    }

    const filename = "./" + props.name;
    return (
        <img class="responsive" onClick={nextPhoto.bind(this)} src={pic}></img>
    );
}


export default Slideshow;
