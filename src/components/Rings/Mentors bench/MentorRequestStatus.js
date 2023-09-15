import React, { Component} from 'react';
import Service from '../../../Service/Service';
import Loader from '../../Layout/Loader';
import { debounce } from "lodash";


export class MentorRequestStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            message: '',
            isUpdated: false,
            pathItems:[]
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        }, this.updateMentorRequest)
    }

    updateMentorRequest = debounce(function () {
        if (window.location.pathname) {
            this.setState({
                ...this.state, pathItems: window.location.pathname.split('/')
            }, () => {
                if (this.state.pathItems && this.state.pathItems.length == 4 && this.state.pathItems[2] && this.state.pathItems[3]) {
                    Service.UpdateMentorRequest(this.state.pathItems[2], this.state.pathItems[3]).then((response) => {
                        if (response && response.isSend) {
                            this.setState({
                                message: "Your request has been updated successfully",
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
            });
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
                                <div class="fs-4 font-medium  text-dark" >Mentor Request</div>

                                <div className="form-group mt-3" style={{ display: this.state.message ? "block" : "none"}}>
                                    <label style={{ display: !this.state.isUpdated  ? "block" : "none", color: "red", fontWeight: "bold" }}>{this.state.message}</label>
                                    <label style={{ display: this.state.isUpdated ? "block" : "none", color: "green", fontWeight: "bold" }}>{this.state.message}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

