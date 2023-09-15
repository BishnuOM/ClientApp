import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';

export default class Confirmation extends Component {
    constructor(props) {
        super(props);
    }

    handleClose() {
        this.props.onCloseConfirmation(false);
    }

    confirm() {
        this.props.confirmation_Confirm();
    }

    render() {
        return (
            <Fragment>
                <Modal show={this.props.showConfirmation} onHide={() => this.handleClose()}
                    aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton className="confirmation-header">
                        <Modal.Title>
                            Confirmation
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{ minHeight:"100px" }}>
                        <div>
                            {this.props.popupContent}
                        </div>
                    </Modal.Body>

                    <Modal.Footer className="confirmation-footer">
                        <button style={{ padding: "3px", minWidth: "55px", border: "1px solid #dee2e6", backgroundColor: "#FF4339", color: "#ffffff" }} type="button" className="btn btn-white" onClick={() => this.confirm()}>
                            Yes</button>
                        <button style={{ padding: "3px", minWidth: "55px", border: "1px solid #dee2e6", backgroundColor: "#FF4339", color: "#ffffff" }} type="button" className="btn btn-white" onClick={() => this.handleClose()}>
                            No</button>
                    </Modal.Footer>
                </Modal >
            </Fragment >
        )
    }
}

