import React from 'react';

class AlbumCover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            src: null,
        };
    }

    componentDidMount() {
        fetch('/api/albums/cover/' + this.state.title)
            .then(response => response.blob())
            .then(images => {
                this.setState({ src: URL.createObjectURL(images) })
            })
    }

    render() {
        return (
            <div>
                <img class="responsive" src={this.state.src}></img>
                <p>{this.state.title}</p>
            </div >
        )
    }
}
export default AlbumCover;
