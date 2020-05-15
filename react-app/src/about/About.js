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
                <div class="about-content">
                    <h2>about</h2>
                    <p>cs student having fun in seattle and boston, and wherever my travels take me</p>
                    <h2>photos</h2>
                    <p>passionate adventurer and kid at heart. i take photos making unforgettable memories
                    with my friends. there's never too much to endure for these. nothing's too crazy,
                    because the best memories come from the worst ideas!
                    </p>
                    <h2>projects</h2>
                    <p>homemade aircraft synthetic vision.
                    personal website built in react, served with flask. raspberry pi with
                    vpn, nfs/samba, ddns, pihole dns adblocking.
                    </p>
                    <h2>hobbies</h2>
                    <p>i ride a loaded icarus everywhere, spend 2 hours lifting every day,
                    track macros, play csgo/valorant/cod warzone, and eat food?
                    </p>

                </div>
            </div>
        );
    }
} export default About;
