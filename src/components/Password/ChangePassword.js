import React, { Component } from 'react';
import Service from '../../Service/Service';
import Loader from '../Layout/Loader';
import { debounce } from "lodash";

export class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            password: '',
            confirmPassword: '',
            message: '',
            isUpdated: false,
            isValidUrl: true,
            isLoading: true
        }
    }

    componentDidMount() {
        if (window.location.pathname) {
            let query = window.location.pathname.split('/');
            if (query && query.length == 3) {
                this.setState({
                    emailId: query[2],
                });
                Service.CheckEmailRequestValidation(query[2]).then((response) => {
                    if (response) {
                        this.setState({
                            isValidUrl: response.isSend,
                            message: response.responseMessage,
                            isLoading: false
                        });
                    }
                }).catch(function (error) {
                    this.setState({
                        isValidUrl: false,
                        isLoading: false,
                        message: error
                    });
                });
            }
            else {
                this.setState({
                    isValidUrl: false,
                    isLoading: false,
                    message: 'It looks like your link has expired or was not copied correctly. Please check and try again'
                });
            }
        }
    }

    sendChangePasswordRequest() {
        this.debouncedSendChangePasswordRequest();
    }
    debouncedSendChangePasswordRequest = debounce(function () {
        if (this.state.password && this.state.password.length >= 8 && this.state.confirmPassword
            && this.state.password == this.state.confirmPassword) {
            this.setState({
                isLoading: true,
            });
            Service.ChangePassword(this.state.emailId, this.state.confirmPassword).then((response) => {
                if (response && response.isSend) {
                    this.setState({
                        isUpdated: true,
                        message: 'Password updated successfully. ',
                        isLoading: false,
                    });
                }
                else if (response) {
                    this.setState({
                        message: response.responseMessage,
                        isLoading: false,
                    });
                }
            }).catch(function (error) {
                this.setState({
                    isLoading: false,
                });
            });
        }
        else {
            this.setState({
                message: !this.state.password ? "Please enter the password" :
                    this.state.password.length < 8 ? "Password length should be greater than 7" :
                        !this.state.confirmPassword ? "Please enter the confirm password" :
                            "The confirm password should be match with new password",
            })
        }
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
                                <div class="fs-4 font-medium  text-dark" >Change Password</div>
                                <div className="form-group mt-3">
                                    <label>New Password</label><label id="lblPassword" style={{ marginLeft: "40px" }} className="text-danger textright" ></label>
                                    <input autoFocus disabled={!this.state.isValidUrl}
                                        type="password"
                                        className="form-control mt-1"
                                        placeholder="Enter password"
                                        value={this.state.password}
                                        onChange={(e) => this.setState({ password: e.target.value, message: '' })}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Confirm New Password</label><label id="lblConfirmPassword" style={{ marginLeft: "40px" }} className="text-danger textright" ></label>
                                    <input
                                        type="password" disabled={!this.state.isValidUrl}
                                        className="form-control mt-1"
                                        placeholder="Enter Confirm password"
                                        value={this.state.confirmPassword}
                                        onChange={(e) => this.setState({ confirmPassword: e.target.value, message: '' })}
                                    />
                                </div>

                                <div className={"form-group mt-3 password-message-content-hide " + (this.state.message ? " password-message-content-show" : "")}>
                                    <label style={{ color: "red", fontWeight: "bold" }}>{this.state.message}</label>
                                    <label style={{ display: (this.state.isUpdated == true ? "block" : "none") }}>Please click here to <a href="/">login</a></label>
                                </div>
                                <div className="password-container">
                                    {this.state == null || !this.state.isValidUrl && (
                                        <span ref={(node) => {
                                            if (node) {
                                                node.style.setProperty("background-color", "#e9ecef", "important");
                                                node.style.setProperty("font-weight", "400", "important");
                                                node.style.setProperty("font-size", "20px", "important"); }
                                        }}  class="beta">Update</span>
                                    )}

                                    {this.state != null && this.state.isValidUrl && (
                                        <button disabled={!this.state.isValidUrl} className="sign_btn" onClick={() => this.sendChangePasswordRequest()}>
                                            Update
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        )
    }

}