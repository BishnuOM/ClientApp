import React, { Component } from 'react';
import Service from '../../Service/Service';

export class Culture extends Component {
    constructor(props) {
        super(props);
        this.state={
            GoalsTab:true,
            optionsTab:false,
            softTab:false,
            certificationTab:false,
            learningTab:false,
            engagingTab:false,
            activeId:"1",
            Goals:[],
            soft:[],
            Engament:[]
        }
    }
    componentDidMount(){
        var self = this;
        const data=JSON.parse(localStorage.getItem("login_data"));
        self.setState({
            userid:data.id,
            AccessToken:data.token,
        }, self.GetGoal) 


    }
    GetGoal(){
        var self = this;
        self.MenuType = "CGoals";
        Service.GetMentorshipCulture(self).then((response => {
            self.setState({
                Goals: response
            }, self.Getsoft);
        })).catch(function (error) {
            alert(JSON.stringify(error));
        });;
    }

    Getsoft(){
        var self = this;
        self.MenuType = "CSSteps";
        Service.GetMentorshipCulture(self).then((response => {
            self.setState({
                soft: response
            }, self.GetEngament);
        })).catch(function (error) {
            alert(JSON.stringify(error));
        });
    }

    GetEngament(){
        var self = this;
        self.MenuType = "CTEngament";
        Service.GetMentorshipCulture(self).then((response => {
            console.log(response + 'GetEngament')
            self.setState({
                Engament: response
            });
        })).catch(function (error) {
            alert(JSON.stringify(error));
        });;
    }

    render() {
        return (
            <div className="height-95 pt-5 px-lg-5 px-2">
                <div className="conatiner">
                    <div className="breadcrumb d-flex align-items-center fs-3 font-bold text-dark mb-4 ps-3 ps-lg-0">
                    <span>Mentorship Culture</span>
                </div>
                    <div className="mb-3">
                        <div className="container responsive-tabs">
                            <ul className="nav nav-tabs justify-content-between" role="tablist">
                                <li className="nav-item">
                                    <button style={{ border: "none", cursor: 'pointer' }} 
                                  onClick={(e) => {
                                    this.setState({GoalsTab:true, optionsTab: false,softTab:false,certificationTab:false ,learningTab:false,engagingTab:false,activeId:"1"});
                                                                                                           
                                       }}

                                       className={`nav-link   ${this.state.activeId === "1" ? "active" : "inactive"}`} data-bs-toggle="tab"
                                        role="tab">Goals</button>
                            </li>
                            <li className="nav-item">
                                    <button id="options_tab"  style={{ border: "none", cursor: 'pointer' }}
                                   onClick={(e) => {
                                    this.setState({GoalsTab:false, optionsTab: true,softTab:false,certificationTab:false ,learningTab:false,engagingTab:false,activeId:"2"});
                                                                                                           
                                       }}
                                       className={`nav-link   ${this.state.activeId === "2" ? "active" : "inactive"}`} data-bs-toggle="tab"
                                        role="tab">Options</button >
                            </li>
                            <li className="nav-item">
                                    <button id="soft_tab"  style={{ border: "none", cursor: 'pointer' }} 
                                   onClick={(e) => {
                                    this.setState({GoalsTab:false, optionsTab: false,softTab:true,certificationTab:false ,learningTab:false,engagingTab:false,activeId:"3"});
                                                                                                           
                                       }}
                                       className={`nav-link   ${this.state.activeId === "3" ? "active" : "inactive"}`} data-bs-toggle="tab" role="tab">Soft
                                        Steps</button>
                            </li>
                            <li className="nav-item">
                                    <button id="certification_tab"  style={{ border: "none", cursor: 'pointer' }} 
                                 onClick={(e) => {
                                    this.setState({GoalsTab:false, optionsTab: false,softTab:false,certificationTab:true ,learningTab:false,engagingTab:false,activeId:"4"});
                                                                                                           
                                       }}
                                       className={`nav-link   ${this.state.activeId === "4" ? "active" : "inactive"}`} data-bs-toggle="tab"
                                    role="tab">Team
                                        Certification</button>
                            </li>
                            <li className="nav-item">
                                    <button id="learning_tab"  style={{ border: "none", cursor: 'pointer' }} 
                                   onClick={(e) => {
                                    this.setState({GoalsTab:false, optionsTab: false,softTab:false,certificationTab:false ,learningTab:true,engagingTab:false,activeId:"5"});
                                                                                                           
                                       }}
                                       className={`nav-link   ${this.state.activeId === "5" ? "active" : "inactive"}`} data-bs-toggle="tab"
                                    role="tab">Soft
                                        Learning</button>
                            </li>
                            <li className="nav-item">
                                    <button id="engaging_tab"  style={{ border: "none", cursor: 'pointer' }}  
                                 onClick={(e) => {
                                    this.setState({GoalsTab:false, optionsTab: false,softTab:false,certificationTab:false ,learningTab:false,engagingTab:true,activeId:"6"});
                                                                                                           
                                       }}
                                       className={`nav-link   ${this.state.activeId === "6" ? "active" : "inactive"}`} data-bs-toggle="tab"
                                    role="tab">Team
                                        Engaging</button>
                            </li>
                        </ul>

                            <div id="content" className="tab-content w-100" role="tablist">
                         
                           
                                <div className="card-body" style={{ display: this.state.GoalsTab ? "contents" : "none" }} >
                                      
                                    {this.state.Goals.map((result, index) => { 
                                        const descriptions = result.description.split('\r\n\r\n');
                                      
                                                 return (
                                                     <p className="text-dark lh-sm fs-5 mb-4">{index + 1}{descriptions} </p>
                                                 )

                                            })}
                                        
                                         

                                       

                                        {/*<p className="text-dark lh-sm fs-5 mb-4">Benefits for All Parties </p>*/}

                                        {/*<p className="text-dark lh-sm fs-5 mb-4">Modern mentoring benefits to organization*/}
                                        {/*    level </p>*/}
                                    </div>
                             

                            
                               
                                <div className="card-body" style={{ display: this.state.optionsTab ? "contents" : "none" }}>
                                    <div className="px-2 px-lg-5">
                                            <div
                                            className="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                <div className="fs-5 text-dark lh-base">1:1 Classic Mentorship</div>
                                                    <small>More to Less Ecperienced</small>
                                                </div>
                                                <div>
                                                <button type="reset" className="btn btn-app py-2 px-5">View</button>
                                                </div>
                                            </div>
                                            <div
                                            className="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                <div className="fs-5 text-dark lh-base">Peer-to-Peer Mentorship</div>
                                                    <small>Mentor and Mentee Satisfaction with Mentor Program</small>
                                                </div>
                                                <div>
                                                <button type="reset" className="btn btn-app py-2 px-5">View</button>
                                                </div>
                                            </div>
                                            <div
                                            className="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                <div className="fs-5 text-dark lh-base">Reverse Mentorship</div>
                                                    <small>Mentor and Mentee Satisfaction with Mentor Program</small>
                                                </div>
                                                <div>
                                                <button type="reset" className="btn btn-app py-2 px-5">View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            

                            
                             
                                <div className="card-body" style={{ display: this.state.softTab ? "contents" : "none" }} >
                                    <div className="fs-5 font-medium text-dark lh-base mb-3">Steps to Transform
                                            Mentorship Culture</div>
                                    <ul className="">

                                        {this.state.soft.map((result, index) => { 
                               
                                          return (
                                              <li className="mb-4 fs-5 lh-sm text-dark">{result.description}</li>
                                                 )

                                            })}

                                         
                                        </ul>
                                    </div>
                           
                            
                               
                                <div className="card-body"  style={{ display: this.state.certificationTab ? "contents" : "none" }}>
                                    <div className="px-2 px-lg-5">
                                            <div
                                            className="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                <div className="fs-5 text-dark lh-base">Mentor Certification</div>
                                                    <small>Mentor Program</small>
                                                </div>
                                                <div>
                                                <button type="reset" className="btn btn-app py-2 px-5">View</button>
                                                </div>
                                            </div>
                                            <div
                                            className="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                <div className="fs-5 text-dark lh-base">Mentee Certification</div>
                                                    <small>Mentee Program</small>
                                                </div>
                                                <div>
                                                <button type="reset" className="btn btn-app py-2 px-5">View</button>
                                                </div>
                                            </div>
                                        </div>
                                    <div className="fs-6 font-bold mt-4 mb-3 text-dark">Measure of Sucess</div>
                                        <div className="px-2 px-lg-5">
                                            <div className="row">
                                                <div className="col-lg-7">
                                                    <div
                                                        className="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                        <div>
                                                            <div className="fs-5 text-dark lh-base">Match Phase </div>
                                                            <small>Active Mentorship Phase</small>
                                                        </div>
                                                        <div>
                                                            <button type="reset" className="btn btn-app py-2 px-4">View
                                                                Phase</button>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                        <div>
                                                            <div className="fs-5 text-dark lh-base">Learn Phase</div>
                                                            <small>Average session recurrence and duration </small> 
                                                        </div>
                                                        <div>
                                                            <button type="reset" className="btn btn-app py-2 px-4">View
                                                                Phase</button>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                        <div>
                                                            <div className="fs-5 text-dark lh-base">Grow Phase</div>
                                                            <small>Feedbacks Submitted & Completed Mentorships</small>
                                                        </div>
                                                        <div>
                                                            <button type="reset" className="btn btn-app py-2 px-4">View
                                                                Phase</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                           
                            
                           
                                    <div className="card-body"  style={{ display: this.state.learningTab ? "contents" : "none" }}>
                                        <div className="px-2 px-lg-5">
                                            <div className="fs-5 text-dark mb-4">How to Master Mentorship Learning Program
                                            </div>
                                            <div
                                                className="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                    <div className="fs-5 text-dark lh-base">How to Master Presentations
                                                    </div>
                                                    <small>Learning Program</small>
                                                </div>
                                                <div>
                                                    <button type="reset" className="btn btn-app py-2 px-5">View</button>
                                                </div>
                                            </div>
                                            <div
                                                className="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                    <div className="fs-5 text-dark lh-base">How to Master Online Courses
                                                    </div>
                                                    <small>Learning Program</small>
                                                </div>
                                                <div>
                                                    <button type="reset" className="btn btn-app py-2 px-5">View</button>
                                                </div>
                                            </div>
                                            <div
                                                className="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                    <div className="fs-5 text-dark lh-base">How to Master Presentations
                                                    </div>
                                                    <small>Learning Program</small>
                                                </div>
                                                <div>
                                                    <button type="reset" className="btn btn-app py-2 px-5">View</button>
                                                </div>
                                            </div>
                                            <div
                                                className="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                                <div>
                                                    <div className="fs-5 text-dark lh-base">How to Master Books</div>
                                                    <small>Learning Program</small>
                                                </div>
                                                <div>
                                                    <button type="reset" className="btn btn-app py-2 px-5">View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                           
                          
                             
                                    <div className="card-body" style={{ display: this.state.engagingTab ? "contents" : "none" }}>
                                        <ul>
                                        {this.state.Engament.map((result, index) => { 
                               
                               return (
                                         <li className="mb-4 fs-5 lh-sm text-dark">{result.description}</li>
                                      )

                                 })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
      

)
}
}