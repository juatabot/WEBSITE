import React from 'react';
import './Album.css';
import Menu from '../menu/Menu';
import { getImageURL } from '../Utils';
import AlbumSection from './AlbumSection';


class Album extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.match.params.album,
            contents: "loading...",
        };
    }

    componentDidMount() {
        fetch('/api/albums/json/' + this.state.title)
            .then(response => response.json())
            .then(json => {
                this.createContents(json);
            })
    }

    createContents(json) {
        var contents_list = Object.keys(json).map(function (key) {
            return json[key];
        });

        const album_contents = contents_list.map((section) => {
            return (
                <AlbumSection
                    title={this.state.title}
                    src={section["src"]}
                    text={section["text"]}>
                </AlbumSection>
            )
        });

        this.setState({ contents: album_contents });
    }

    render() {
        var title = this.state.title.replace("-", " ");
        return (
            <div class="album">
                <span class='menu'> {Menu()}</span>
                <div class="album-images">
                    <h3>{title}</h3>
                    {this.state.contents}
                </div>
            </div>
        )
    }
}
export default Album;
