import React from 'react';
import Slideshow from './slideshow/Slideshow';
import Memories from './memories/Memories';
import About from './about/About';
import Album from './memories/Album';
import './App.css'
import { Router, Route, BrowserRouter, Switch } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Slideshow} />
                <Route exact path='/memories' component={Memories} />
                <Route path="/memories/:album" component={Album} />
                <Route exact path='/about' component={About} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
