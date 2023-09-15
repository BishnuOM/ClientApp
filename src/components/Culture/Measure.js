import React, { Component } from 'react';


export class Measure extends Component {
    constructor(props) {
        super(props);
        this.state={
            
        }
    }


    render() {
        return (
            <div class="height-96 pt-5 px-2 px-lg-5">
                <div class="conatiner">
                    <div class="d-flex align-items-center justify-content-between mb-5">
                        <div class="fs-3 breadcrumb d-flex align-items-center  ">
                            <span class="" style={{ fontSize: "28px" }}>Culture</span>
                            <span class="px-2 fs-3">&#62;</span>
                            <span class="text-dark font-bold" style={{ fontSize: "28px" }}>Measuring</span>
                        </div>
                        <div class="beta">Coming Soon</div>
                    </div>

                    <div class="conatner-fluid mt-4">
                        <div class="fs-5 text-dark font-bold" style={{ paddingBottom: "20px" }}>How to Master Mentorship Learning Program</div>
                        <div class="bg-color rounded-3 px-4 py-2 mb-3 d-flex align-items-center justify-content-between">
                            <div>
                                <div class="fs-5 text-dark lh-base">Mentor Certification</div>
                                <small>&nbsp;</small>
                            </div>
                            <div>
                                <button type="reset" class="btn btn-app py-2 px-5 comingsoon_bgcolor">View</button>
                            </div>
                        </div>

                        <div class="bg-color rounded-3 px-4 py-2 mb-3 d-flex align-items-center justify-content-between">
                            <div>
                                <div class="fs-5 text-dark lh-base">Mentee Certification</div>
                                <small>&nbsp;</small>
                            </div>
                            <div>
                                <button type="reset" class="btn btn-app py-2 px-5 comingsoon_bgcolor">View</button>
                            </div>
                        </div>

                        <div class="bg-color rounded-3 px-4 py-2 mb-3 d-flex align-items-center justify-content-between">
                            <div>
                                <div class="fs-5 text-dark lh-base">Match Phase</div>
                                <small>Active Mentorship Phase</small>
                            </div>
                            <div>
                                <button type="reset" class="btn btn-app py-2 px-5 comingsoon_bgcolor">View</button>
                            </div>
                        </div>

                        <div class="bg-color rounded-3 px-4 py-2 mb-3 d-flex align-items-center justify-content-between">
                            <div>
                                <div class="fs-5 text-dark lh-base">Learn Phase</div>
                                <small>Avgerage session recurrence and duration</small>
                            </div>
                            <div>
                                <button type="reset" class="btn btn-app py-2 px-5 comingsoon_bgcolor">View</button>
                            </div>
                        </div>

                        <div class="bg-color rounded-3 px-4 py-2 mb-3 d-flex align-items-center justify-content-between">
                            <div>
                                <div class="fs-5 text-dark lh-base">Grow Phase</div>
                                <small>Feedbacks Submitted & Completed Mentorships</small>
                            </div>
                            <div>
                                <button type="reset" class="btn btn-app py-2 px-5 comingsoon_bgcolor">View</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }     
}