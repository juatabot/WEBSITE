import React from 'react';
import Slideshow from './slideshow/Slideshow';
import Memories from './memories/Memories';
import './App.css'
import { Router, Route, BrowserRouter, Switch } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Slideshow} />
                <Route exact path='/memories' component={Memories} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
