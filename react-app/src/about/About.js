import React from 'react';
import './About.css';
import Menu from '../menu/Menu';

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="about">
                <span class='menu'> {Menu()}</span>
                <p class="about-content"> northeastern university's next up & coming rapper yo </p>
            </div>
        );
    }
} export default About;
