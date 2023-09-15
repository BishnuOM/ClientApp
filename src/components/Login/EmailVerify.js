import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import Service from '../../Service/Service';
import AlertService from '../../AlertService/Alert';
import Loader from '../Layout/Loader';


export default class EmailVerify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPageLoading:false,
            userId: this.props.popupContent.userId,
            email: this.props.popupContent.email,
            imageurl: "img/icons/Mentorz_logo.svg",
        }
    }

    handleClose() {
        this.props.onCloseEmailVerify();
    }

    resendEmail() {
        this.setState({ isPageLoading: true });
        Service.SendVerifyEmailInvite(this.state.userId).then((response) => {
            if (response && response.result) {
                this.setState({ isPageLoading: false });
                AlertService.warningInfo("Email Verify Invitation",
                    "<span style = 'font-family: Myriad Pro;font-style: normal;font-weight: 400;font-size: 16px;line-height: 24px;text-align: center;'>We sent an email to <b>" + this.state.email + "</b>. Please check your email then follow the instructions to finish setting up your Mentorz account.</span >", 'success').then((res) => {
                        this.props.onResendEmail();
                });
            }
        }).catch(function (error) {
           
        });
    }

    render() {
        return (
            <Fragment>
                <Loader isLoading={this.state.isPageLoading}></Loader>
                <Modal show={this.props.showEmailVerify} onHide={() => this.handleClose()}
                    aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton className="confirmation-header">
                        <Modal.Title>
                            <div className="ibox-title" style={{ fontSize: "20px" }} >
                                Verify your email address
                            </div>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{ minHeight: "200px" }}>
                        <div style={{ textAlign: "center" }}>
                            <img src={`${this.state.imageurl}`} alt="image" className="logo" />
                        </div>
                        <div className="subscription-item">
                            We sent an email to <b>{this.state.email}</b> to make sure that you own it. Please check your email then follow the instructions to finish setting up your Mentorz account.
                        </div>
                    </Modal.Body>


                    <Modal.Footer className="confirmation-footer" style={{ textAlign:"center", position: "relative", display: "block" }}>
                        <div>
                            <button onClick={() => this.resendEmail()} class="btn btn-app py-1">Resend Email</button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}

