import React, { Component } from 'react';
import $ from 'jquery';
import Service from '../../Service/Service';

import Swal from "sweetalert2";

export class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showsucessbox: false,
            name: '',
            email: '',
            company: '',
            note: '',
            EmailError: '',
            validationmessage: ''
        }

    }

    componentDidMount() {
        var self = this;
        const data = JSON.parse(localStorage.getItem("login_data"));
        self.setState({
            userid: data.id,
            AccessToken: data.token,
        })
    }

    Send() {
        if (this.state.name != '' && this.state.email != '' && this.state.company != '' && this.state.note != '') {
            this.setState({
                validationmessage: ''
            })
            if (this.emailValidation()) {
                this.setState({
                    EmailError: '',
                });
                var self = this;
                Service.SupportEmail(self).then((response => {
                    if (response != true) {
                        this.setState({
                            showsucessbox: true
                        })
                    }
                })).catch(function (error) {
                    alert(JSON.stringify(error));
                });
            }
        }
        else {
            this.setState({
                validationmessage: 'Please fill the all Details'
            })
        }
    }
    oncloseitems() {
        this.setState({
            showsucessbox: false,
            name: '',
            email: '',
            company: '',
            note: ''
        })
    }

    validateEmail(e) {
        this.setState({ email: e.target.value })

    }

    emailValidation() {

        // const regex = /^[a-z0-9]{1,64}@[a-z0-9.]{1,64}$/i;
        const regex = /^(("[\w\s]+")|([\w]+(?:\.[\w]+)*)|("[\w-\s]+")([\w]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

        if (!this.state.email || regex.test(this.state.email) === false) {
            this.setState({
                EmailError: "Email is not valid"
            });
            return false;
        }
        return true;
    }


    render() {

        return (

            <div class="height-95  px-lg-5 px-2">
                <div class="conatiner">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="fs-3 breadcrumb d-flex align-items-center  ">
                            <span class="" style={{ fontSize: "28px" }}>Settings</span>
                            <span class="px-2 fs-3">&#62;</span>
                            <span class="text-dark font-bold" style={{ fontSize: "28px" }}>Support</span>
                        </div>
                        <img src="img/support.png" alt="" class="img-fluid" />
                    </div>
                    <div>
                        <div className='sub_title_bankactdtl  mt-3'>Please fill out the form below and your inquiry will be directed to our support team.</div>
                        {!this.state.showsucessbox ? <div className='box'>
                            <span className="text-danger">{this.state.validationmessage}</span>
                            <div className='row'>
                                <div className='col-12 mt-3'>
                                    <label for="cardholdername" className="form-label pb-2 font-size-16px"> Name</label>
                                    <input type="text" className="form-control form-control-customstyl" placeholder="Beverly Faith" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value.replace(/[`~!@#$%^*()_|+\=?;:",<>\{\}\[\]\\\/]/gi, '') })} />
                                </div>
                                <div className='col-12 mt-3'>
                                    <label for="cardnumber" className="form-label pb-2 font-size-16px">Email</label>
                                    <input type="text" className="form-control form-control-customstyl" placeholder="bev.faith@mentorz.com" value={this.state.email} onChange={(e) => this.validateEmail(e)} />
                                    <span className="text-danger">{this.state.EmailError}</span>
                                </div>
                            </div>
                            <div className="row mt-3 ">
                                <div className="col ">
                                    <label for="expirationdate" className="form-label pb-2 font-size-16px">Company</label>
                                    <input type="text" className="form-control form-control-customstyl" placeholder="Company Name" value={this.state.company} onChange={(e) => this.setState({ company: e.target.value.replace(/[`~!@#$%^*()_|+\=?;:",<>\{\}\[\]\\\/]/gi, '') })} />
                                </div>
                            </div>
                            <div className="row mt-3 ">
                                <div className="col ">
                                    <label for="expirationdate" className="form-label pb-2 font-size-16px">How can we help?</label>
                                    <textarea className="form-control form-control-customstyl" placeholder="Type your question here..." value={this.state.note} onChange={(e) => this.setState({ note: e.target.value.replace(/[`~!@#$%^*()_|+\=?;:",<>\{\}\[\]\\\/]/gi, '') })} />

                                </div>

                            </div>

                            <div className="row mt-3 ">
                                <div className="col" style={{ width: "50%", textAlign: "end" }}>
                                    <button style={{ fontSize: "18.81px", marginRight: "10px" }} type="reset" class="border-Button btn btn-outline  cancle_support_button" onClick={() => this.oncloseitems()} >Cancel</button>
                                </div>
                                <div className="col " style={{ width: "50%" }}>
                                    <button class="btn btn-app send_support_button" onClick={() => this.Send()}>Send</button>
                                </div>
                            </div>

                        </div> :
                            <div className='box'>
                                <div>
                                    <a style={{ marginTop: "-1.5rem", marginRight:"-1rem" }} className='support_cancletick'><i class="fa fa-times fa-2x" aria-hidden="true" onClick={() => this.oncloseitems()}></i></a>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <img src="img/icons/Sending email at rocket speed.svg" alt="image" />
                                </div>
                                <div className='sub_title_sucees_text text-center   mt-3'>Message Sent</div>
                                <div className='sub_title_text text-center' style={{ fontSize: "16px" }}>Thank you for submitting your inquiry. A member of our team will review and be in touch as soon as possible.</div>
                            </div>
                        }
                    </div>
                </div>
            </div>




        )




    }





}