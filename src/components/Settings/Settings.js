import React, { Component } from 'react';
import $ from 'jquery';
import Service from '../../Service/Service';

import Swal from "sweetalert2";

export class Settings extends Component {
    constructor(props) {
        super(props);
        this.state={
            NotificationsTab:true,
            SubscriptionTab:false,
            BillingTab:false,
            FeedbackTab:false,
            PrivacyTab:false,
            SupportTab:false,
           activeId:"1",
           getprivacy:'',
           AccessToken:'',
           getsupport:[],
           getsupportemail:[],
           feedbackrating:'',
           feedbackmsg:''
        }

    }

    componentDidMount(){
        var self = this;
        const data=JSON.parse(localStorage.getItem("login_data"));
        self.setState({
            userid:data.id,
            AccessToken:data.token,
        },self.getprivacy)
        }

    getprivacy(){
        var self = this;
        self.MenuType = "Privacy";
        Service.GetSettings(self).then((response => {
            self.setState({
                getprivacy: response[0].description
            }, self.getsupport)
        })).catch(function (error) {
            alert(JSON.stringify(error));
        });;
 }

 getsupport(){
     var self = this;
     self.MenuType = "Question";
     Service.GetSettings(self).then((response => {
         self.setState({
             getsupport: response
         },self.getsupportemail)
     })).catch(function (error) {
         alert(JSON.stringify(error));
     });;

}
getsupportemail(){
  
    var self = this;
    self.MenuType = "SupportEmail";
    Service.GetSettings(self).then((response => {
        self.setState({
            getsupportemail: response[0]
        })
    })).catch(function (error) {
        alert(JSON.stringify(error));
    });;
}

Savefeedback(){
   var feedbackrating =this.state.feedbackrating;
   var feedbackmsg= this.state.feedbackmsg;
   if (feedbackrating === "") {
    $("#lblrating").text("Please Enter Feedback Rating");
  }
  else {
  $("#lblrating").text("")
  }

  if (feedbackmsg === "") {
  $("#lblmessage").text("Please Enter Feedback Message");
  }
 else {
 $("#lblmessage").text("")
 }
   var self=this;
    if (feedbackrating !== "" && feedbackmsg !== "") {  
        self.feedbackrating = feedbackrating;
        self.feedbackmsg = feedbackmsg;
        Service.SaveFeedback(self).then((response => {
              Swal.fire( response.response + ""+'!', )
        })).catch(function (error) {
            alert(JSON.stringify(error));
        });;
    }
}
  render() {
        return (
        
            <div class="height-95 pt-5 px-lg-5 px-2">
            <div class="conatiner">
                <div class="breadcrumb d-flex align-items-center fs-3 font-bold text-dark mb-4 ps-3 ps-lg-0">
                    <span>Settings</span>
                </div>

                <div class="mb-3">
                    <div class="container responsive-tabs">
                        <ul class="nav nav-tabs justify-content-between" role="tablist">
                            <li class="nav-item">
                                <a id="notifications_tab" style={{ border: "none", cursor: 'pointer' }}  className={`nav-link   ${this.state.activeId === "1" ? "active" : "inactive"}`}
                                     onClick={(e) => {
                                        this.setState({NotificationsTab:true, SubscriptionTab: false,BillingTab:false,FeedbackTab:false ,PrivacyTab:false,SupportTab:false,activeId:"1"});
                                                                                                               
                                           }}
                                   data-bs-toggle="tab" role="tab">Notifications</a>
                            </li>
                            <li class="nav-item">
                                <a style={{ border: "none", cursor: 'pointer' }} className={`nav-link   ${this.state.activeId === "2" ? "active" : "inactive"}`}
                                 onClick={(e) => {
                                 this.setState({NotificationsTab:false, SubscriptionTab: true,BillingTab:false,FeedbackTab:false ,PrivacyTab:false,SupportTab:false,activeId:"2"});
                                                                                                                                               
                                }}
                                data-bs-toggle="tab"
                                    role="tab">Subscriptions</a>
                            </li>
                            <li class="nav-item">
                                <a style={{ border: "none", cursor: 'pointer' }}  className={`nav-link   ${this.state.activeId === "3" ? "active" : "inactive"}`}
                                   onClick={(e) => {
                                    this.setState({NotificationsTab:false, SubscriptionTab: false,BillingTab:true,FeedbackTab:false ,PrivacyTab:false,SupportTab:false,activeId:"3"});
                                                                                                                                                  
                                   }}
                                data-bs-toggle="tab"
                                    role="tab">Billing</a>
                            </li>
                            <li class="nav-item">
                                <a style={{ border: "none", cursor: 'pointer' }}  className={`nav-link   ${this.state.activeId === "4" ? "active" : "inactive"}`}
                                     onClick={(e) => {
                                        this.setState({NotificationsTab:false, SubscriptionTab: false,BillingTab:false,FeedbackTab:true ,PrivacyTab:false,SupportTab:false,activeId:"4"});
                                                                                                                                                      
                                       }}
                                data-bs-toggle="tab"
                                    role="tab">Feedback</a>
                            </li>
                            <li class="nav-item">
                                <a style={{ border: "none", cursor: 'pointer' }}  className={`nav-link   ${this.state.activeId === "5" ? "active" : "inactive"}`}
                                      onClick={(e) => {
                                        this.setState({NotificationsTab:false, SubscriptionTab: false,BillingTab:false,FeedbackTab:false ,PrivacyTab:true,SupportTab:false,activeId:"5"});
                                                                                                                                                      
                                       }}
                                data-bs-toggle="tab"
                                    role="tab">Privacy</a>
                            </li>
                            <li class="nav-item">
                                <a style={{ border: "none", cursor: 'pointer' }}  className={`nav-link   ${this.state.activeId === "6" ? "active" : "inactive"}`}
                                 onClick={(e) => {
                                    this.setState({NotificationsTab:false, SubscriptionTab: false,BillingTab:false,FeedbackTab:false ,PrivacyTab:false,SupportTab:true,activeId:"6"});
                                                                                                                                                  
                                   }}
                                data-bs-toggle="tab"
                                    role="tab">Support</a>
                            </li>
                        </ul>

                        <div id="content" class="tab-content w-100" role="tablist">
                            
                               
                                    <div class="card-body" style={{ display: this.state.NotificationsTab ? "contents" : "none" }}>
                                        <div class="px-2 px-lg-5">
                                            <div
                                                class="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                    <div class="fs-5 text-dark lh-base">Notify Me When A Mentee Is:
                                                    </div>
                                                    <small>Added</small>
                                                </div>
                                                <div>
                                                    <button type="button" class="btn btn-app py-2">
                                                        <label class="switch">
                                                            <input type="checkbox" defaultChecked={true}/>
                                                            <span class="slider round"></span>
                                                        </label>
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                class="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                    <div class="fs-5 text-dark lh-base">Notify Me When A Mentee Is:
                                                    </div>
                                                    <small>Removed</small>
                                                </div>
                                                <div>
                                                    <button type="button" class="btn btn-app py-2">
                                                        <label class="switch">
                                                            <input type="checkbox"/>
                                                            <span class="slider round"></span>
                                                        </label>
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                class="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                    <div class="fs-5 text-dark lh-base">Notify Me When A Mentee Is:
                                                    </div>
                                                    <small>Added</small>
                                                </div>
                                                <div>
                                                    <button type="button" class="btn btn-app py-2">
                                                        <label class="switch">
                                                            <input type="checkbox" defaultChecked={true}/>
                                                            <span class="slider round"></span>
                                                        </label>
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                class="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                    <div class="fs-5 text-dark lh-base">Notify Me When A Mentee Is:
                                                    </div>
                                                    <small>Removed</small>
                                                </div>
                                                <div>
                                                    <button type="button" class="btn btn-app py-2">
                                                        <label class="switch">
                                                            <input type="checkbox"/>
                                                            <span class="slider round"></span>
                                                        </label>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            

                         
                             
                                    <div class="card-body" style={{ display: this.state.SubscriptionTab ? "contents" : "none" }}>
                                        <div class="px-2 px-lg-5">
                                            <div
                                                class="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                    <div class="fs-5 text-dark lh-base">Most Popular Package</div>
                                                    <small>Unlimited Mentos and Mentees</small>
                                                </div>
                                                <div>
                                                    <button type="button" class="btn btn-app py-2 px-5">View</button>
                                                </div>
                                            </div>
                                            <div
                                                class="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                    <div class="fs-5 text-dark lh-base">Professional Package</div>
                                                    <small>1,000 Employees</small>
                                                </div>
                                                <div>
                                                    <button type="button" class="btn btn-app py-2 px-5">View</button>
                                                </div>
                                            </div>
                                            <div
                                                class="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                    <div class="fs-5 text-dark lh-base">Premium Package</div>
                                                    <small>500 Employees</small>
                                                </div>
                                                <div>
                                                    <button type="button" class="btn btn-app py-2 px-5">View</button>
                                                </div>
                                            </div>
                                            <div
                                                class="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                    <div class="fs-5 text-dark lh-base">Basic Package</div>
                                                    <small>50 Employees</small>
                                                </div>
                                                <div>
                                                    <button type="button" class="btn btn-app py-2 px-5">View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                             

                        
                          
                                    <div class="card-body" style={{ display: this.state.BillingTab ? "contents" : "none" }}>
                                        <div class="text-center d-flex align-items-center justify-content-center">
                                            <div class="bg-color px-5 py-4 rounded-3 biiling-amount">
                                                $40/ Month
                                            </div>
                                        </div>
                                        <div class="fs-5 text-dark font-bold mt-4 mb-2">Choose your method</div>
                                        <div class="row">
                                            <div class="col-lg-6 col-md-8 col-12">
                                                <div
                                                    class="d-flex align-items-center justify-content-between py-3 border-bottom">
                                                    <div class="form-check d-flex align-items-center">
                                                        <input className='form-check-input' type="radio" name="interests"
                                                            id="card" defaultChecked={true}/>
                                                        <label class="form-check-label ps-2 fs-5 pt-2" for="card">
                                                            Credit/Debit Card
                                                        </label>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-end">
                                                        <img src="img/master_card.png" alt=""/>
                                                        <img src="img/visa.png" alt=""/>
                                                    </div>
                                                </div>
                                                <div
                                                    class="d-flex align-items-center justify-content-between py-3 border-bottom">
                                                    <div class="form-check d-flex align-items-center">
                                                        <input class="form-check-input" type="radio" name="interests"
                                                            id="paypal"/>
                                                        <label class="form-check-label ps-2 fs-5 pt-2" for="paypal">
                                                            Paypal
                                                        </label>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-end">
                                                        <img src="img/paypal.png" alt=""/>
                                                    </div>
                                                </div>
                                                <div
                                                    class="d-flex align-items-center justify-content-between py-3 border-bottom">
                                                    <div class="form-check d-flex align-items-center">
                                                        <input class="form-check-input" type="radio" name="interests"
                                                            id="apple_pay"/>
                                                        <label class="form-check-label ps-2 fs-5 pt-2" for="apple_pay">
                                                            Apple pay
                                                        </label>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-end">
                                                        <img src="img/apple.png" alt=""/>
                                                    </div>
                                                </div>
                                                <div
                                                    class="d-flex align-items-center justify-content-between py-3 border-bottom">
                                                    <div class="form-check d-flex align-items-center">
                                                        <input class="form-check-input" type="radio" name="interests"
                                                            id="gpay"/>
                                                        <label class="form-check-label ps-2 fs-5 pt-2" for="gpay">
                                                            Google pay
                                                        </label>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-end">
                                                        <img src="img/google_pay.png" alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                           
                       
                               
                                    <div class="card-body" style={{ display: this.state.FeedbackTab ? "contents" : "none" }}>
                                        <div class="row mt-4">
                                            <div class="col-lg-6 col-md-10 col-12 offset-lg-3 offset-md-1 text-center">
                                                <div class="text-center fs-4 text-dark font-bold mb-4">How is your
                                                    experience?</div>
                                                <div class="text-center mb-5 rating">
                                                    {/* <span class="bi bi-star fs-1 mx-2 checked"></span>
                                                    <span class="bi bi-star fs-1 mx-2 checked"></span>
                                                    <span class="bi bi-star fs-1 mx-2 checked"></span>
                                                    <span class="bi bi-star fs-1 mx-2"></span>
                                                    <span class="bi bi-star fs-1 mx-2"></span> */}
                                              
                                                    <input type="radio" name="rating" value="5" id="5"
                                                    onChange={(e) => {
                                                        this.setState({ feedbackrating
                                                            : "5" });
                                                                                                         
                                                        }} 
                                                    /><label for="5">☆</label>
                                                    <input type="radio" name="rating" value="4" id="4"
                                                        onChange={(e) => {
                                                            this.setState({ feedbackrating
                                                                : "4" });
                                                                                                             
                                                            }} 
                                                    /><label for="4">☆</label>
                                                    <input type="radio" name="rating" value="3" id="3"
                                                        onChange={(e) => {
                                                            this.setState({ feedbackrating
                                                                : "3" });
                                                                                                             
                                                            }} 
                                                    /><label for="3">☆</label>
                                                    <input type="radio" name="rating" value="2" id="2"
                                                        onChange={(e) => {
                                                            this.setState({ feedbackrating
                                                                : "2" });
                                                                                                             
                                                            }} 
                                                    /><label for="2">☆</label>
                                                    <input type="radio" name="rating" value="1" id="1"
                                                        onChange={(e) => {
                                                            this.setState({ feedbackrating
                                                                : "1" });
                                                                                                             
                                                            }} 
                                                    /><label for="1">☆</label>

                                                 
                                                 </div>
                                                 <div>
                                                 <label id="lblrating"  className="text-danger textright" ></label>
                                                 </div>
                                                <div class="custom-form-group px-5 mb-4">
                                                    <textarea class="form-control feedback-message"
                                                       onChange={(e) => {
                                                        this.setState({ feedbackmsg
                                                            : e.target.value });
                                                                                                         
                                                        }} 
                                                    
                                                        placeholder="Tell us what you like and how we can make Mentorz better"></textarea>
                                                         <label id="lblmessage" style={{marginLeft: "40px"}} className="text-danger textright" ></label>
                                                </div>
                                                <button type="button"onClick={() => this.Savefeedback()} class="btn btn-app py-2 px-5">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                            
                         
                                    <div class="card-body" style={{ display: this.state.PrivacyTab ? "contents" : "none" }}>
                                        <div class="row">
                                            <div class="col-lg-8">
                                                <p class="text-dark fs-5 lh-base">{this.state.getprivacy}</p>
                                            </div>
                                            <div class="col-lg-4">
                                                <div class="px-5 text-end">
                                                    <img src="img/privacy.png" alt="" class="img-fluid"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                                
                                    <div class="card-body" style={{ display: this.state.SupportTab ? "contents" : "none" }}>
                                        <div class="row">
                                            <div class="col-lg-8">
                                            {this.state.getsupport.map((result) => {  
                                                 return (
                                                    <><p class="text-dark fs-5 lh-base"><b>{result.title}</b></p>
                                                    <p class="text-dark fs-5 lh-base">{result.description}</p></>
                                                 )

                                            })}
                                           
                                         
                                                
                                            </div>
                                            <div class="col-lg-4">
                                                <div class="px-5 text-end">
                                                    <img src="img/support.png" alt="" class="img-fluid"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                        <div class="col-lg-8 footer_suuport">
                                        <p class="text-dark fs-5 lh-base">{this.state.getsupportemail.title}</p>
                                        <p class=" fs-5 lh-base suuport_email_color">{this.state.getsupportemail.description}</p>
                                            </div>   
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                
        


        )




    }





}