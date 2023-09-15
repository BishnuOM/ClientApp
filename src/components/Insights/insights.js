import React, { Component } from 'react';

export class Insights extends Component {
    constructor(props) {
        super(props);
        this.state={
            engagement_kpi:true, development_kpi: false,soft_kpi:false,team_kpi:false,activeId:"1"
        }
    }

    render() {
        return (
            <div class="height-96 pt-5 px-lg-5 px-4">
            <div class="conatiner">
                <div class="breadcrumb d-flex align-items-center fs-3 font-bold text-dark mb-4">
                    <span>Insights</span>
                </div>

                <div class="px-lg-4 mb-3">
                    <div class="container responsive-tabs">
                        <ul class="nav nav-tabs justify-content-between" role="tablist">
                            <li class="nav-item">
                                    <button id="engagement_kpi" 
                                onClick={(e) => {
                                    this.setState({engagement_kpi:true, development_kpi: false,soft_kpi:false,team_kpi:false ,activeId:"1"});
                                                                                                           
                                       }}
                                        style={{ border: "none", cursor: 'pointer' }} className={`nav-link   ${this.state.activeId === "1" ? "active" : "inactive"}`} data-bs-toggle="tab"
                                        role="tab">Engagement KPIs</button>
                            </li>
                            <li class="nav-item">
                                    <button id="development_kpi" onClick={(e) => {
                              this.setState({ development_kpi: true,engagement_kpi:false,soft_kpi:false,team_kpi:false ,activeId:"2"});
                                                                                                     
                                    }} style={{ border: "none", cursor: 'pointer' }} className={`nav-link  ${this.state.activeId === "2" ? "active" : "inactive"}`} data-bs-toggle="tab"
                                        role="tab">Development KPIs</button>
                            </li>
                            <li class="nav-item">
                                    <button id="soft_kpi" 
                                   onClick={(e) => {
                                    this.setState({engagement_kpi:false, development_kpi: false,soft_kpi:true,team_kpi:false ,activeId:"3"});
                                                                                                           
                                       }}
                                        style={{ border: "none", cursor: 'pointer' }} className={`nav-link ${this.state.activeId === "3" ? "active" : "inactive"}`} data-bs-toggle="tab" role="tab">Soft
                                        Skills</button>
                            </li>
                            <li class="nav-item">
                                    <button id="team_kpi"  
                                     onClick={(e) => {
                                        this.setState({engagement_kpi:false, development_kpi: false,soft_kpi:false,team_kpi:true ,activeId:"4"});
                                                                                                               
                                           }}
                                        style={{ border: "none", cursor: 'pointer' }} className={`nav-link  ${this.state.activeId === "4" ? "active" : "inactive"}`} data-bs-toggle="tab" role="tab">Team
                                        Composition</button>
                            </li>
                        </ul>

                        <div id="content" class="tab-content w-100" role="tablist">
                        <div class="card-body"   style={{ display: this.state.engagement_kpi ? "contents" : "none" }} >
                                        <div class="row">
                                            <div class="col-lg-2 mb-3 mt-2 m-lg-0">
                                                <div class="fs-5 text-dark font-bold pe-lg-4 pe-2 nowrap pt-lg-5 mt-2">Select ring</div>
                                            </div>
                                            <div class="col-lg-10">
                                                <table class="table ring-table">
                                                    <tr>
                                                        <th class="font-bold heading-section p-3 nowrap">Ring Name</th>
                                                        <th class="font-bold heading-section p-3">Mentees</th>
                                                        <th class="font-bold heading-section p-3">Mentors</th>
                                                        <th class="font-bold heading-section p-3">Type</th>
                                                        <th class="font-bold heading-section p-3">Status</th>
                                                        <th class="font-bold heading-section p-3">Description</th>
                                                        <th>&nbsp;</th>
                                                    </tr>
                                                    <tr class="bg-color p-2">
                                                        <td class="fs-6 p-3">Design II </td>
                                                        <td class="p-3">136</td>
                                                        <td class="p-3">15</td>
                                                        <td class="p-3">Private</td>
                                                        <td class="p-3">Active</td>
                                                        <td class="p-3">M365 admin panel</td>
                                                        <td class="p-3 pe-0">
                                                            <div class="dropdown cursor-pointer list-dropdown">
                                                                <div class="dropdown-toggle"  id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false"  style={{width: "40px"}}>
                                                                    <i class="bi bi-chevron-down"></i>
                                                                </div>
                                                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="defaultDropdown">
                                                                <li><button class="dropdown-item py-2" href="#">Design II</button>  </li>
                                                                <li><button class="dropdown-item py-2" href="#">Channel Sales</button></li>
                                                                <li><button class="dropdown-item py-2" href="#">Software developers</button></li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="row mt-4 align-items-center">
                                            <div class="col-lg-2 mb-3 mt-2 m-lg-0">
                                                <div class="fs-5 text-dark font-bold w-15 pe-lg-4 pe-2 nowrap">Sessions
                                                </div>
                                            </div>
                                            <div class="col-lg-10">
                                                <div class="container-fluid bg-color rounded-3 px-lg-5 py-4">
                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <div class="text-center">
                                                                <div class="count font-medium text-dark">102</div>
                                                                <div class="fs-5 text-dark">Scheduled </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4 text-center">
                                                            <div class="count font-medium text-dark">30</div>
                                                            <div class="fs-5 text-dark">Completed </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="text-center">
                                                                <div class="count font-medium text-dark">23<span
                                                                        class="fs-5">min</span></div>
                                                                <div class="fs-5 text-dark">Average Duration </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-4 align-items-center">
                                            <div class="col-lg-2 mb-3 mt-2 m-lg-0">
                                                <div class="fs-5 text-dark font-bold w-15 pe-lg-4 pe-2 nowrap">Tasks</div>
                                            </div>
                                            <div class="col-lg-10">
                                                <div class="container-fluid bg-color rounded-3 px-lg-5 py-4">
                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <div class="text-center">
                                                                <div class="count font-medium text-dark">194</div>
                                                                <div class="fs-5 text-dark">Assigned </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4 text-center">
                                                            <div class="count font-medium text-dark">58</div>
                                                            <div class="fs-5 text-dark">Completed </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-4 align-items-center">
                                            <div class="col-lg-2 mb-3 mt-2 m-lg-0">
                                                <div class="fs-5 text-dark font-bold w-15 pe-lg-4 pe-2 nowrap">Learning
                                                </div>
                                            </div>
                                            <div class="col-lg-10">
                                                <div class="container-fluid bg-color rounded-3 px-lg-5 py-4">
                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <div class="text-center">
                                                                <div class="count font-medium text-dark">53</div>
                                                                <div class="fs-5 text-dark">Training completed</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4 text-center">
                                                            <div class="count font-medium text-dark">22</div>
                                                            <div class="fs-5 text-dark">Certifications</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                

                          
                                    <div class="card-body"   style={{ display: this.state.development_kpi ? "contents" : "none" }} >
                                        <div
                                            class="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                            <div>
                                                <div class="fs-5 text-dark lh-base">Career Progress</div>
                                                <small>Mentor and Mentee Programs</small>
                                            </div>
                                            <div>
                                                <button type="reset" class="btn btn-app py-2 px-5">View</button>
                                            </div>
                                        </div>
                                        <div
                                            class="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                            <div>
                                                <div class="fs-5 text-dark lh-base">Satisfaction</div>
                                                <small>Mentor and Mentee Satisfaction with Mentor Program</small>
                                            </div>
                                            <div>
                                                <button type="reset" class="btn btn-app py-2 px-5">View</button>
                                            </div>
                                        </div>
                                    </div>
                           

                         
                          
                                    <div class="card-body" style={{ display: this.state.soft_kpi ? "contents" : "none" }}>
                                        <div
                                            class="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                            <div>
                                                <div class="fs-5 text-dark lh-base">Feedback Insights</div>
                                                <small>From Mentor and Mentee and the other way around</small>
                                            </div>
                                            <div>
                                                <button type="reset" class="btn btn-app py-2 px-5">View</button>
                                            </div>
                                        </div>
                                        <div
                                            class="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                            <div>
                                                <div class="fs-5 text-dark lh-base">Development</div>
                                                <small>Core areas of individual and team development</small>
                                            </div>
                                            <div>
                                                <button type="reset" class="btn btn-app py-2 px-5">View</button>
                                            </div>
                                        </div>
                                        <div
                                            class="bg-color rounded-3 px-4 py-4 mb-4 d-flex align-items-center justify-content-between">
                                            <div>
                                                <div class="fs-5 text-dark lh-base">Careeer Plus</div>
                                                <small>Core areas of discussion to help on their development
                                                    plans</small>
                                            </div>
                                            <div>
                                                <button type="reset" class="btn btn-app py-2 px-5">View</button>
                                            </div>
                                        </div>
                                    </div>
                              
                            
                               
                                    <div class="card-body" style={{ display: this.state.team_kpi ? "contents" : "none" }}>
                                        <div class="text-danger text-center fs-3 lh-base">Your Team</div>
                                        <div class="row mt-3">
                                            <div class="col-lg-4 col-md-6 col-12">
                                                <div class="border rounded p-4 mb-4">
                                                    <div class="fa-6 font-bold mb-3 text-dark">Expertise</div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Business Development</div>
                                                        <div class="d-flex">60%</div>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Design</div>
                                                        <div class="d-flex">52%</div>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Engineering</div>
                                                        <div class="d-flex">50%</div>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Communication</div>
                                                        <div class="d-flex">45%</div>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">User Interviews</div>
                                                        <div class="d-flex">34%</div>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Figma</div>
                                                        <div class="d-flex">23%</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-6 col-12">
                                                <div class="border rounded p-4 mb-4">
                                                    <div class="fa-6 font-bold mb-3 text-dark">Interests</div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Hiking</div>
                                                        <div class="d-flex">15</div>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Cooking</div>
                                                        <div class="d-flex">8</div>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Swimming</div>
                                                        <div class="d-flex">8</div>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Fishing</div>
                                                        <div class="d-flex">4</div>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Skiing</div>
                                                        <div class="d-flex">4</div>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Running</div>
                                                        <div class="d-flex">2</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-6 col-12">
                                                <div class="border rounded p-4 mb-4">
                                                    <div class="fa-6 font-bold mb-3 text-dark">Values</div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Team Work</div>
                                                        <div class="d-flex">20</div>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Transparency</div>
                                                        <div class="d-flex">18</div>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Kindness</div>
                                                        <div class="d-flex">15</div>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Collaboration</div>
                                                        <div class="d-flex">12</div>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Empathy</div>
                                                        <div class="d-flex">11</div>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                                        <div class="Weekday">Helpful</div>
                                                        <div class="d-flex">8</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
       


 )
    }







}