import React, { Component} from 'react';

export default class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: this.props.isLoading
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            isLoading: props.isLoading
        });
    }

    render() {
        return (
            <div className="loader-component" style={{ display: this.props.isLoading ? "block" : "none" }}></div>
        )
    }
}

