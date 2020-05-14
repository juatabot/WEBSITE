import React from 'react';
import './Memories.css';
import Menu from '../menu/Menu';
import AlbumCover from './AlbumCover';

class Memories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albumCovers: "loading...",
        };
    }

    componentDidMount() {
        fetch('/api/albums/list')
            .then(response => response.json())
            .then(albums_obj => {
                this.createMemories(albums_obj);
            })
    }

    // create list of components which will be rendered
    createMemories(albums_obj) {
        var albums_list = Object.keys(albums_obj).map(function (key) {
            return albums_obj[key];
        });

        albums_list.forEach(album => {
            console.log(album);
        })

        // TODO - request album cover image here. Lift get_image and resize to some utils file

        const albumCovers = albums_list.map((album) => {
            return <AlbumCover title={album}></AlbumCover>
        });

        this.setState({ albumCovers: albumCovers });
    }

    render() {
        return (
            <div class="memories">
                <span class='menu'> {Menu()}</span>
                <span class='memories-container-grid'>
                    {this.state.albumCovers}
                </span>
            </div>
        );
    }
} export default Memories;
