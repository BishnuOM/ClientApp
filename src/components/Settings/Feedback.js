import React, { Component } from 'react';
import $ from 'jquery';
import Service from '../../Service/Service';

import Swal from "sweetalert2";

export class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NotificationsTab: true,
            SubscriptionTab: false,
            BillingTab: false,
            FeedbackTab: false,
            PrivacyTab: false,
            SupportTab: false,
            activeId: "1",
            getprivacy: '',
            AccessToken: '',
            getsupport: [],
            getsupportemail: [],
            feedbackrating: 0,
            feedbackmsg: ''
        }

    }

    componentDidMount() {
        var self = this;
        const data = JSON.parse(localStorage.getItem("login_data"));
        self.setState({
            userid: data.id,
            AccessToken: data.token,
        }, self.getprivacy)
    }

    Savefeedback() {
        var feedbackrating = this.state.feedbackrating;
        var feedbackmsg = this.state.feedbackmsg;
        if (!feedbackrating) {
            $("#lblrating").text("Please Enter Feedback Rating");
        }
        else {
            $("#lblrating").text("")
        }

        if (!feedbackmsg) {
            $("#lblmessage").text("Please Enter Feedback Message");
        }
        else {
            $("#lblmessage").text("")
        }
        var self = this;
        if (feedbackrating && feedbackmsg) {
            self.feedbackrating = feedbackrating;
            self.feedbackmsg = feedbackmsg;
            Service.SaveFeedback(self).then((response => {
                this.setState({ feedbackrating:0, feedbackmsg: '' }); 
                Swal.fire(response.response + "" + '!',);
            })).catch(function (error) {
                alert(JSON.stringify(error));
            });;
        }
    }

    render() {
        return (

            <div class="height-95 pt-5 px-lg-5 px-2">
                <div class="conatiner">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="fs-3 breadcrumb d-flex align-items-center  ">
                            <span class="" style={{ fontSize: "28px" }}>Settings</span>
                            <span class="px-2 fs-3">&#62;</span>
                            <span class="text-dark font-bold" style={{ fontSize: "28px" }}>Feedback</span>
                        </div>
                    </div>
                    <div class="container responsive-tabs tab-content w-100 tablist"
                    ref={(node) => {
                        if (node) {
                            node.style.setProperty("margin-left", "0px", "important");
                            node.style.setProperty("padding-left", "0px", "important");
                        }
                    }} >
                        <div class="fs-5 text-dark font-bold">How is your experience?</div>
                        <div class="rating" ref={(node) => { if (node) { node.style.setProperty("justify-content", "left", "important"); } }}>
                            <input type="radio" name="rating" className={this.state.feedbackrating == 5 ?'selected':'' } value="5" id="5" 
                                onChange={(e) => { this.setState({ feedbackrating: "5" }); }}
                            /><label for="5">☆</label>
                            <input type="radio" name="rating" className={this.state.feedbackrating >= 4 ? 'selected' : ''} value="4" id="4" 
                                onChange={(e) => { this.setState({ feedbackrating: "4" }); }}
                            /><label for="4">☆</label>
                            <input type="radio" name="rating" className={this.state.feedbackrating >= 3 ? 'selected' : ''} value="3" id="3" 
                                onChange={(e) => { this.setState({ feedbackrating: "3" }); }}
                            /><label for="3">☆</label>
                            <input type="radio" name="rating" className={this.state.feedbackrating >= 2 ? 'selected' : ''} value="2" id="2"
                                onChange={(e) => { this.setState({ feedbackrating: 2 }); }}
                            /><label for="2">☆</label>
                            <input type="radio" name="rating" className={this.state.feedbackrating >= 1 ? 'selected' : ''} value="1" id="1" 
                                onChange={(e) => { this.setState({ feedbackrating: 1 }); }}
                            /><label for="1">☆</label>
                        </div>
                        <label id="lblrating" style={{ marginLeft: "40px" }} className="text-danger textright" ></label>
                        <div class="custom-form-group" ref={(node) => {
                            if (node) {
                                node.style.setProperty("justify-content", "left", "important");
                                node.style.setProperty("margin-top", "5px", "important"); }
                        }}>
                            <textarea class="form-control feedback-message"
                                onChange={(e) => { this.setState({ feedbackmsg: e.target.value }); }} value={this.state.feedbackmsg}
                                placeholder="Tell us what you like and how we can make Mentorz better"></textarea>
                            <label id="lblmessage" style={{ marginLeft: "40px" }} className="text-danger textright" ></label>
                        </div>
                        <button type="button" onClick={() => this.Savefeedback()} class="btn btn-app py-2">Submit</button>

                    </div>
                </div>
            </div>

        )
    }
}