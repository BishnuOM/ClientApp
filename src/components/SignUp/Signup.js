import React, { Component } from 'react';
import $ from 'jquery';
import Service from '../../Service/Service';
import Swal from "sweetalert2";
import AlertService from '../../AlertService/Alert';
import CustomInput from '../Layout/CustomInput';


export class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            FirstName: '',
            LastName: '',
            BusinessName: '',
            Email: '',
            Password: '',
            ConfirmPassword: '',
            iscnfbutton: false,
            ispassowrd: false,
            EmailError:''
        }
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem('Userprofile'));
        if (data != null) {
            this.setState({
                FirstName: data.givenName,
                LastName: data.surname,
                Email: data.mail,
                Password: data.id.replaceAll('-', ''),
                iscnfbutton: true,
                ispassowrd: true
            })
        }

    }

    generateUUID() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) 
        );
    }

    validateEmail(e) {
        this.setState({ Email: e.target.value })

    }

    emailValidation() {

        const regex = /^(("[\w\s]+")|([\w]+(?:\.[\w]+)*)|("[\w-\s]+")([\w]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

        if (!this.state.Email || regex.test(this.state.Email) === false) {
            this.setState({
                EmailError: "Email is not valid"
            });
            return false;
        }
        return true;
    }

    signup(data) {
        var self = this;
        let GUUID = this.generateUUID()
        if (!self.state.FirstName) {
            $("#lblfirstname").text("Please Enter First Name.");
        }
        else {
            $("#lblfirstname").text("");
        }
        if (!self.state.LastName) {
            $("#lbllastname").text("Please Enter  Last Name.");
        }
        else {
            $("#lbllastname").text("");
        }
        if (!self.state.BusinessName) {
            $("#lblbusiness").text("Please Enter  Business Name.");
        } else {
            $("#lblbusiness").text("");
        }
        if (!self.state.Email) {
            $("#lblemail").text("Please Enter Email.");
        } else {
            $("#lblemail").text("");
        }
        if (!self.state.Password) {
            $("#lblpassword").text("Please Enter Password.");
        }
        else {
            $("#lblpassword").text("");
        }
        if (!self.state.ConfirmPassword) {
            $("#lblcnfpassword").text("Please Enter Confirm Password.");
        }
        else {
            $("#lblcnfpassword").text("");
            if (self.state.ConfirmPassword != self.state.Password) {
                $("#lblcnfpassword").text("Those passwords didn’t match. Try again.");
            }
        }
         
        if (this.emailValidation()) {
            this.setState({
                EmailError: ''
            });
        }


        if (self.state.FirstName && self.state.LastName && self.state.BusinessName && self.state.Email
            && self.state.Password && self.state.ConfirmPassword && self.state.Password==self.state.ConfirmPassword) {
            Service.AddAdminService(self, GUUID).then((response) => {
                if (data === true) {
                    window.AuthenticateExternal();
                }
                else {
                    AlertService.warningInfo("Information", "<span style = 'color:green',fontWeight: 'bold' >" + (response && response.message == "INVITED" ? "User email verify link sent it to your registered email address, Please check and verify." : "Users Created Sucessfully" + "" + '!') +"</span >", 'success').then((res1) => {
                        window.location.replace('/');
                    });
                }
            }).catch(function (error) {
                Swal.fire(
                    error.responseJSON.message + "" + '!',
                )
            });
        }
    }

    //testAlert = (val) => {
    //    alert(val);
    //}

    render() {
        return (
            <>
                <div className='signup_background'>
                    <div className='signup_header1'>
                        <img src="img/Mentorz_logo_white.png" alt="image" className="signup_img" />
                        <img src="img/Mentorz_word_white.png" alt="image" className="sign_header_word" />
                    </div>

                    <label id="lblinvalid" style={{ marginLeft: "40px" }} className="text-danger textright" ></label>

                    <div className='signup'>
                        <div className='temp'>
                            <div class="d-flex align-items-center mb-5">
                                <div class="signup_header" >Already have an account?</div>
                                <div class="login_btns">
                                    <a class="signup_color_a" href='/' onClick={() => localStorage.clear()}>Login </a>
                                </div>
                            </div>
                            <div className='temp1'>
                                <div class="fs-4 font-medium  text-dark" >Sign Up
                                </div>
                                <div className="signup-div-display">
                                    {/*<CustomInput*/}
                                    {/*    initial={'First Name'}*/}
                                    {/*    focused={'First Name'}*/}
                                    {/*    on_Input_Change={this.testAlert} />*/}

                                    <input type="text" class="cutom-border-width" value={this.state.FirstName} onChange={(e) => this.setState({ FirstName: e.target.value.replace(/[`~!@#$%^*()_|+\=?;:",<>\{\}\[\]\\\/]/gi, '') })} placeholder='First Name' disabled={this.state.ispassowrd} />
                                    <label id="lblfirstname" style={{ marginLeft: "40px" }} className="text-danger textright" ></label>
                                </div>
                                <div className="signup-div-display">
                                    <input type="text" class="cutom-border-width" value={this.state.LastName} onChange={(e) => this.setState({ LastName: e.target.value.replace(/[`~!@#$%^*()_|+\=?;:",<>\{\}\[\]\\\/]/gi, '') })} placeholder='Last Name' disabled={this.state.ispassowrd} />
                                    <label id="lbllastname" style={{ marginLeft: "40px" }} className="text-danger textright" ></label>
                                </div>
                                <div className="signup-div-display">
                                    <input type="text" class="cutom-border-width" value={this.state.BusinessName} onChange={(e) => this.setState({ BusinessName: e.target.value })} placeholder='Business Name' />
                                    <label id="lblbusiness" style={{ marginLeft: "40px" }} className="text-danger textright" ></label>
                                </div>
                                <div className="signup-div-display">
                                    <input type="text" class="cutom-border-width" value={this.state.Email}  onChange={(e) => this.validateEmail(e)} placeholder='Email' disabled={this.state.ispassowrd}  />
                                    <label id="lblemail" style={{ marginLeft: "40px" }} className="text-danger textright" ></label>
                                    <span className="text-danger">{this.state.EmailError}</span>
                                </div>
                                {
                                    !this.state.ispassowrd ? <><div className="signup-div-display">
                                        <input type="password" class="cutom-border-width" value={this.state.Password} onChange={(e) => this.setState({ Password: e.target.value })} placeholder='Password' />
                                        <label id="lblpassword" style={{ marginLeft: "40px" }} className="text-danger textright"></label>
                                    </div><div className="signup-div-display">
                                            <input type="password" class="cutom-border-width" value={this.state.ConfirmPassword} onChange={(e) => this.setState({ ConfirmPassword: e.target.value })} placeholder='Confirm Password' />
                                            <label id="lblcnfpassword" style={{ marginLeft: "40px" }} className="text-danger textright"></label>
                                        </div></> : ''
                                }


                                <div className="signUp-container">
                                    {this.state.iscnfbutton ? <button className="sign_btn" onClick={() => this.signup(true)}>
                                        SignUp with Microsoft
                                    </button>

                                        : <button className="sign_btn" onClick={() => this.signup(false)}>
                                            SignUp
                                        </button>
                                    }
                                </div>


                                <div className='custom-align-privacy-policy' >By using Mentroz you agree with the <a href="/">terms of service and privacy policy</a></div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }

}