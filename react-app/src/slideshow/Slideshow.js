import React from 'react';
import './Slideshow.css';
import Image from './Image';
import Menu from '../menu/Menu';

class Slideshow extends React.Component {
    render() {
        return (
            <div class="slideshow">
                <span class='menu'> {Menu()}</span>
                <span class='slideshow-container'>
                    <Image> {new Image()}</Image>
                </span>
            </div>
        );
    }
} export default Slideshow;
