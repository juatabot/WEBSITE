import React from 'react';
import './Slideshow.css';

function Slideshow() {
    return (
        <div class="slideshow-image">
            <Image id='image' name="DSC00533.jpg"></Image>
        </div>
    );
}

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = { src: "./DSC00533.jpg" };
    }

    nextPhoto() {
        alert("clicked!");

        var outside;

        fetch('/api/next')
            .then(response => response.blob())
            .then(images => {
                // Create a local URL for that image and print it 
                console.log(images)
                outside = URL.createObjectURL(images)
                console.log(outside)
                this.setState({ src: outside });
                console.log(this.state);
            })
    }
    
    render() {
        return (
            <img class="responsive" onClick={this.nextPhoto.bind(this)} src={this.state.src}></img>
        );

    }
}

export default Slideshow;
