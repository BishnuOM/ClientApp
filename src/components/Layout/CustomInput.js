import React, { Component} from 'react';

export default class CustomInput extends Component {
    constructor(props) {
        super(props);
    }

    handle_change(e) {
        this.props.on_Input_Change(e.currentTarget.value);
    }

    render() {
        return (
            <div className="adaptive_placeholder_input_container">
                <input
                    className="adaptive_input"
                    type="text"
                    required="required"
                    onChange={this.handle_change.bind(this)} />
                <label
                    className="adaptive_placeholder"
                    alt={this.props.initial}
                    placeholder={this.props.focused} />
            </div>
        )
    }
}

