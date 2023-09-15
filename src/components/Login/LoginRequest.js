import React, { Component} from 'react';
import Service from '../../Service/Service';
import Loader from '../Layout/Loader';
import { debounce } from "lodash";


export class LoginRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            message: '',
            isUpdated:false,
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        }, this.updateInviteStatus)
    }

    updateInviteStatus = debounce(function () {
        if (window.location.pathname) {
            let query = window.location.pathname.split('/');
            if (query && query.length == 3 && query[2]) {
                Service.updateInviteStatus(query[2]).then((response) => {
                    if (response && response.isSend) {
                        this.setState({
                            message: "Email address verified successfully, ",
                            isLoading: false,
                            isUpdated: true,
                        });
                    }
                    else {
                        this.setState({
                            isLoading: false,
                            message: 'It looks like your link has expired or was not copied correctly. Please check and try again'
                        });
                    }
                }).catch(function (error) {
                    this.setState({
                        isLoading: false,
                        message: 'It looks like your link has expired or was not copied correctly. Please check and try again'
                    });
                });
            }
            else {
                this.setState({
                    isLoading: false,
                    message: 'It looks like your link has expired or was not copied correctly. Please check and try again'
                });
            }
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
                                <div class="fs-4 font-medium  text-dark" >Email Verification Request</div>

                                <div className="form-group mt-3" style={{ display: this.state.message ? "block" : "none"}}>
                                    <label style={{ display: !this.state.isUpdated  ? "block" : "none", color: "red", fontWeight: "bold" }}>{this.state.message}</label>
                                    <label style={{ display: this.state.isUpdated ? "block" : "none", color: "green", fontWeight: "bold" }}>{this.state.message}</label>
                                    <label style={{ display: (this.state.isUpdated == true ? "block" : "none") }}>Please click here to <a href="/">login</a></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

