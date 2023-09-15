import React, { Component } from 'react';

export class Templates extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="height-95 pt-5 px-2 px-lg-5">
                <div class="conatiner">
                    <div class="d-flex align-items-center justify-content-between mb-5">
                        <div class="fs-3 breadcrumb d-flex align-items-center  ">
                            <span class="" style={{ fontSize: "28px" }}>Programs</span>
                            <span class="px-2 fs-3">&#62;</span>
                            <span class="text-dark font-bold" style={{ fontSize: "28px" }}>Templates</span>
                        </div>
                        <div class="beta">Coming Soon</div>
                    </div>
                    <div class="bg-color rounded p-2 d-flex align-items-center justify-content-between">
                        <div class="search d-inline-flex align-items-center ps-3 me-3 mentorBench-Search">
                            <i class="fas fa-search"></i>
                            <input type="text" class="form-control bg-transparent border-0 inputSearch font-size-20px" placeholder="Search" name="" />
                        </div>
                        <div class="list-actions d-flex align-items-center mentorBench-SearchButtons">
                            <a href="javascript:;"
                                class="action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5 text-dark">
                                <i class="bi bi-plus fs-3"></i>
                                <span className="font-size-20px">Add</span>
                            </a>
                            <a href="javascript:;"
                                class="action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5">
                                <i class="bi bi-pencil mx-1 fs-6"></i>
                                <span className="font-size-20px">Edit</span>
                            </a>
                            <a href="javascript:;"
                                class="action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5">
                                <i class="bi bi-x fs-4 me-1"></i>
                                <span className="font-size-20px">Remove</span>
                            </a>
                        </div>
                    </div>
                    <div class="conatner-fluid mt-4">
                        <div class="row">
                            <div class="col-lg-4 col-md-6 col-12">
                                <div class="invites p-3 m-3">
                                    <div class="invite-img m-auto p-2">
                                        <img src="img/profile.svg" width="100%" height="100%" alt="" class="image-fluid" />
                                    </div>
                                    <div class="fs-4 font-medium lh-1 text-dark mt-3">Engineering</div>
                                    <div class="fs-5 lh-1 text-dark mt-2 mb-3">54 users</div>
                                    <button type="reset" class="btn btn-app py-2 px-5 font-medium fs-5 mt-5 w-100 comingsoon_bgcolor">Use Template</button>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12">
                                <div class="invites p-3 m-3">
                                    <div class="invite-img m-auto p-2">
                                        <img src="img/profile.svg" width="100%" height="100%" alt="" class="image-fluid" />
                                    </div>
                                    <div class="fs-4 font-medium lh-1 text-dark mt-3">Marketing</div>
                                    <div class="fs-5 lh-1 text-dark mt-2 mb-3">23 users</div>
                                    <button type="reset" class="btn btn-app py-2 px-5 font-medium fs-5 mt-5 w-100 comingsoon_bgcolor">Use Template</button>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12">
                                <div class="invites p-3 m-3">
                                    <div class="invite-img m-auto p-2">
                                        <img src="img/profile.svg" width="100%" height="100%" alt="" class="image-fluid" />
                                    </div>
                                    <div class="fs-4 font-medium lh-1 text-dark mt-3">Product Management</div>
                                    <div class="fs-5 lh-1 text-dark mt-2 mb-3">87 users</div>
                                    <button type="reset" class="btn btn-app py-2 px-5 font-medium fs-5 mt-5 w-100 comingsoon_bgcolor">Use Template</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }



}