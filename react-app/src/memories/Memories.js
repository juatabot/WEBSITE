import React from 'react';
import './Memories.css';
import Menu from '../menu/Menu';

class Memories extends React.Component {
    render() {
        return (
            <div class="memories">
                <span class='menu'> {Menu()}</span>
                <span class='memories'>
                    Hello World!
                </span>
            </div>
        );
    }
} export default Memories;
