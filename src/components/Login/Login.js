import React, { Component } from 'react';
import $ from 'jquery';
import Service from '../../Service/Service';
import EmailVerify from '../Login/EmailVerify';
let IMAGE_URL='https://mentorzstorageaccount1.blob.core.windows.net/mentorz/';
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            show:false,
            passwordType:"password",
            clientId: process.env.REACT_APP_clientId,
            isEmailVerified: true,
            emailVerifyPopupContent: null
        }
    }

    login() {
        var self = this;
        let email = this.state.email;
        let password = this.state.password;
        $("#lblEmail").text("");
        $("#blPassword").text("");
        if (!email) {
            $("#lblEmail").text("Please Enter Email Id");
        }
        else if (!password) {
            $("#lblPassword").text("Please Enter Password");
        }
        if (email && password) {
            Service.LoginAuth(self).then((response) => {
                if (response) {
                    debugger
                    if (response.isEmailVerified) {
                        localStorage.setItem("LogInStatus", "1");
                        localStorage.setItem("LogInType", "1");
                        $("#lblinvalidid").text("");
                        response.photoId=this.imageURL(response.photoId);
                        localStorage.setItem("login_data", JSON.stringify(response));
                        window.location.replace('/Home');
                    }
                    else {
                        this.setState({
                            isEmailVerified: false,
                            emailVerifyPopupContent: {
                                userId: response.id,
                                email: response.emailAddress
                            }
                        })
                    }
                }
            }).catch(function (error) {
                localStorage.setItem("LogInStatus", "0");
                if (JSON.stringify(error.status) === 401) {
                    $("#lblinvalidid").text("Username or password is incorrect");
                } else {
                    $("#lblinvalidid").text(error.responseJSON.message);
                }
            });
        }
    }

    
   imageURL(imageId){
    let image;
    try{
        if(imageId!=="" && imageId!==undefined && imageId!=="string" )
        {
          image=IMAGE_URL+ imageId;
           
        }
        else{
         image='assets/images/User.png';
        }
        return image
    }
    catch(e){
        return e;
    }
  }

    closeEmailVerify = () => {
        this.setState({ isEmailVerified: true })
    }

    toggl_eye(){
        this.setState({show:!this.state.show});
      }
    
    render() {
        return (
            <div className="Auth-form">
                <div className="col-sm-12 Auth-form-content">
                    <div className="LogoImage" style={{ textAlign: "center" }}>
                        <div>
                            <img src="img/login.png" alt="" className='login_img' width="30%" />
                        </div>
                        
                        
                        <label id="lblinvalidid"  className="text-danger text_aligned" ></label>
                    </div>
                    
                   
                    <div className="form-group">
                        <label>Email address</label><label id="lblEmail" style={{ marginLeft: "40px" }} className="text-danger textright" ></label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                    </div>
                    {/* <div className="form-group mt-1">
                        <label>Password</label><label id="lblPassword" style={{ marginLeft: "40px" }} className="text-danger textright" ></label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                    </div> */}

                    <div className="form-group mt-1">
                    <label>Password</label><label id="lblPassword" style={{ marginLeft: "40px" }} className="text-danger textright" ></label>
                    <div class="input-group">
                        <input
                            type={this.state.show  ? "text" : "password"}
                            className="form-control "
                            placeholder="Enter password"
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                        <div class="input-group-append" onClick={()=>this.toggl_eye()}>
                            <span class="input-group-text " style={{height:'45px'}}>
                            {this.state.show ?<i className="fa fa-eye  fa-1x"  aria-hidden="true"></i>:<i className="fa fa-eye-slash  " style={{color:"#101230"}} aria-hidden="true"></i>}
                            </span>
                        </div>
                    </div>
                    </div>


                    <div className="d-grid gap-2 mt-2">
                        <button onClick={() => this.login()} className="btn btn-app btn-md  nowrap">
                            Login
                        </button>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button onClick={() => window.requestConsent(this.state.clientId)} className="btn btn-app btn-md  nowrap">
                            Login with microsoft
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Forgot password? <a className='forget_link' href="/ForgotPassword">Click Here</a>
                    </p>
                    <p className="forgot-password text-right mt-2">
                        New? <a className='forget_link' href="/signup">Sign up here</a>
                    </p>

                    {/*<div className="d-grid gap-2 mt-3" style={{display:"none" }}>
                  <button className="facebook_button"><img src="img/icons/facebook.png" alt="" />
                    Login with Facebook
                  
                  </button>
                </div>
                <div className="d-grid gap-2 mt-3" style={{display:"none"}}>
                  <button  className="linkdin_button"><img src="img/icons/linkdin.png" alt="" />
                    Login with Linkdin
                  </button>
        </div> */}
                </div>

                {
                    this.state != null && this.state.isEmailVerified == false && (
                        <EmailVerify showEmailVerify={!this.state.isEmailVerified} onCloseEmailVerify={this.closeEmailVerify}
                            popupContent={this.state.emailVerifyPopupContent} onResendEmail={this.closeEmailVerify}></EmailVerify>
                    )
                }
            </div>

        )
    }
}