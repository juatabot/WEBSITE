import React from 'react';
import Slideshow from './slideshow/Slideshow';
import Menu from './menu/Menu';
import './App.css'

function App() {
    return (
        <div class="app">
            <div class='menu'> {Menu()}</div>
            <div class='slideshow-container'> {Slideshow()}</div>
        </div>
    );  
}

export default App;
