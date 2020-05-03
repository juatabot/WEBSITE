import React from 'react';
import './Slideshow.css';
import Image from './Image';

function sendData() {
    // const width = document.getElementById('image').clientWidth;
    // const height = document.getElementById('image').clientHeight;
    const data = { 'width': 5, 'height': 6 };
    fetch('/api/get-resolution', {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

function Slideshow() {
    return (
        <div class="slideshow-image">
            <Image id='image'></Image>
            <button type="button" onClick={() => sendData()}>send data</button>;
        </div>
    );
}

export default Slideshow;
