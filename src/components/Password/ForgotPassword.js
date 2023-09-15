import React, { Component } from 'react';
import Service from '../../Service/Service';
import Loader from '../Layout/Loader';
import { debounce } from "lodash";

export class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: '',
            isUpdated: false,
            previousMail: '',
            isLoading:false
        }
    }

    sendForgotPasswordRequest() {
        this.debouncedSendForgotPasswordRequest();
    }

    debouncedSendForgotPasswordRequest = debounce(function () {
        this.setState({
            ...this.state, message: '',
            isUpdated: false,
        }, () => {
            if (!this.state.isUpdated) {
                if (this.state.email) {
                    if (this.state.email != this.state.previousMail) {
                        this.setState({
                            previousMail: this.state.email,
                            isLoading:true
                        });
                        Service.ForgotPassword(this.state.email).then((response) => {
                            if (response && response.isSend) {
                                this.setState({
                                    message: 'Password change request send successfully. Please check your email.',
                                    isUpdated: true,
                                    isLoading: false
                                });
                            }
                            else if (response) {
                                this.setState({
                                    message: response.responseMessage,
                                    isLoading: false
                                });
                            }
                        }).catch(function (error) {
                            this.setState({
                                isLoading: false
                            });
                        });
                    }
                }
                else {
                    this.setState({
                        message: 'Please enter the email.'
                    });
                }
            }
        });
    }, 800);


    render() {
        return (
            <>
                <div className='signup_background'>
                    <Loader isLoading={this.state.isLoading}></Loader>

                    <div className='signup_header1'>
                        <img src="img/Mentorz_logo_white.png" alt="image" className="signup_img" />
                        <img src="img/Mentorz_word_white.png" alt="image" className="sign_header_word" />
                    </div>

                    <label id="lblinvalid" style={{ marginLeft: "40px" }} className="text-danger textright" ></label>

                    <div className='signup'>
                        <div className='temp'>
                            <div class="d-flex align-items-center">
                                <div class="signup_header" >Already have an account?</div>
                                <div class="login_btns">
                                    <a class="signup_color_a" href='/'>Login </a>
                                </div>
                            </div>
                            <div className='temp1'>
                                <div class="fs-4 font-medium  text-dark" >Forgot Password</div>

                                <div className="form-group mt-3">
                                    <label>Email address</label><label id="lblEmail" style={{ marginLeft: "40px" }} className="text-danger textright" ></label>
                                    <input autoFocus
                                        type="email"
                                        className="form-control mt-1"
                                        placeholder="Enter email"
                                        value={this.state.email}
                                        onChange={(e) => this.setState({ email: e.target.value, message:'' })}
                                    />
                                </div>
                                <div className={"form-group mt-3 password-message-content-hide " + (this.state.message ? " password-message-content-show" : "")}>
                                    <label style={{ display: !this.state.isUpdated && this.state.message ? "block" : "none", color: "red", fontWeight: "bold" }}>{this.state.message}</label>
                                    <label style={{ display: this.state.isUpdated ? "block" : "none", color: "green", fontWeight: "bold" }}>{this.state.message}</label>
                                </div>
                                <div className="password-container">
                                    <button className="sign_btn" onClick={() => this.sendForgotPasswordRequest()}>
                                        Email me a recovery link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}