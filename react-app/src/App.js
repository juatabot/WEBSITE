import React from 'react';
import Slideshow from './slideshow/Slideshow';
import Menu from './menu/Menu';
import './App.css'

function App() {
    return (
        <div class="app">
            <span class='menu'> {Menu()}</span>
            <span class='slideshow-container'>
                <Slideshow> {new Slideshow()}</Slideshow>
            </span>
        </div>
    );
}

export default App;
