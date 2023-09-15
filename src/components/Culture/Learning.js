import React, { Component } from 'react';

export class Learning extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <div className="height-96 pt-5 px-2 px-lg-5">
                <div className="conatiner">
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <div className="fs-3 breadcrumb d-flex align-items-center  ">
                            <span className="" style={{ fontSize: "28px" }}>Culture</span>
                            <span className="px-2 fs-3">&#62;</span>
                            <span className="text-dark font-bold" style={{ fontSize: "28px" }}>Learning</span>
                        </div>
                        <div className="beta">Coming Soon</div>
                    </div>

                    <div className="conatner-fluid mt-4">
                        <div className="fs-5 text-dark font-bold" style={{ paddingBottom: "20px" }}>How to Master Mentorship Learning Program</div>
                        <div className="bg-color rounded-3 px-4 py-2 mb-3 d-flex align-items-center justify-content-between">
                            <div>
                                <div className="fs-5 text-dark lh-base">How to Master Presentations
                                </div>
                                <small>Learning Program</small>
                            </div>
                            <div>
                                <button type="reset" className="btn btn-app py-2 px-5 comingsoon_bgcolor">View</button>
                            </div>
                        </div>

                        <div className="bg-color rounded-3 px-4 py-2 mb-3 d-flex align-items-center justify-content-between">
                            <div>
                                <div className="fs-5 text-dark lh-base">How to Master Online Courses
                                </div>
                                <small>Learning Program</small>
                            </div>
                            <div>
                                <button type="reset" className="btn btn-app py-2 px-5 comingsoon_bgcolor">View</button>
                            </div>
                        </div>

                        <div className="bg-color rounded-3 px-4 py-2 mb-3 d-flex align-items-center justify-content-between">
                            <div>
                                <div className="fs-5 text-dark lh-base">How to Master Video Library
                                </div>
                                <small>Learning Program</small>
                            </div>
                            <div>
                                <button type="reset" className="btn btn-app py-2 px-5 comingsoon_bgcolor">View</button>
                            </div>
                        </div>

                        <div className="bg-color rounded-3 px-4 py-2 mb-3 d-flex align-items-center justify-content-between">
                            <div>
                                <div className="fs-5 text-dark lh-base">How to Master Books</div>
                                <small>Learning Program</small>
                            </div>
                            <div>
                                <button type="reset" className="btn btn-app py-2 px-5 comingsoon_bgcolor">View</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}