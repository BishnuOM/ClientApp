import React, { Component } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


export default class OverflowTip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overflowed: false
        };
        this.textElement = React.createRef();
        this.showHideToolTip = this.showHideToolTip.bind(this);
    }

    componentDidMount() {
        this.ulObserver = new ResizeObserver(this.showHideToolTip);
        this.ulObserver.observe(this.textElement.current);
    }
    componentWillUnmount() {
        this.ulObserver.disconnect();
    }

    showHideToolTip() {
        if (this.textElement && this.textElement.current) {
            this.setState({
                isOverflowed: this.textElement.current.scrollWidth > this.textElement.current.clientWidth
            });
        }
    }

    render() {
        const { isOverflowed } = this.state;
        return (
            <Tippy content={<span>{this.props.children}</span>} disabled={!isOverflowed}>
                <div
                    ref={this.textElement}
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                    {this.props.children}
                </div>
            </Tippy>
        );
    }
}

