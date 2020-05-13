import React from 'react';
import './Memories.css';
import Menu from '../menu/Menu';

class Memories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memories: "loading...",
        };
    }

    componentDidMount() {
        fetch('/api/memories/list')
            .then(response => response.json())
            .then(memory_obj => {
                this.createMemories(memory_obj);
            })
    }

    // create list of components which will be rendered
    createMemories(memory_obj) {
        var memory_list = Object.keys(memory_obj).map(function (key) {
            return [Number(key), memory_obj[key]];
        });

        console.log(memory_list);

        const listItems = memory_list.map((memory) =>
            <p>{memory}</p>
        );
        this.setState({ memories: listItems });
    }

    render() {
        return (
            <div class="memories">
                <span class='menu'> {Menu()}</span>
                <span class='memories-container-grid'>
                    {this.state.memories}
                </span>
            </div>
        );
    }
} export default Memories;
