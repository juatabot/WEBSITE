import React from 'react';
import './Slideshow.css';
import Image from './Image';

class Slideshow extends React.Component {
    render() {
        return (
            <Image> {new Image()} </Image>
        );
    }
} export default Slideshow;
