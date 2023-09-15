import React, { Component } from 'react';

export class MentorBenchNew extends Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <div class="height-95 pt-5 px-2 px-lg-5">
            <div class="conatiner">
            <div class="breadcrumb d-flex align-items-center fs-3 font-bold text-dark mb-4">
            <span>Programs</span>
            <span class="px-2 fs-5"><i class="bi bi-chevron-right"></i></span>
            <span>Mentors Bench </span>
            <span class="px-2 fs-5"><i class="bi bi-chevron-right"></i></span>
            <span> New  </span>
        </div>
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <div class="d-flex align-items-center justify-content-center my-4">
                    <div class="search d-inline-flex align-items-center ps-3 py-1 w-50">
                        <i class="bi bi-search text-dark"></i>
                        <input type="text" class="form-control bg-transparent border-0"
                            placeholder="Search for a ring" name="" />
                    </div>
                    <div class="px-3">
                        <div class="dropdown list-dropdown cursor-pointer">
                            <div class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{width:"40px"}} >
                                <i class="bi bi-filter fs-2"></i>
                            </div>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                              <li><a class="dropdown-item py-2" href="#">Action</a></li>
                              <li><a class="dropdown-item py-2" href="#">Another action</a></li>
                              <li><a class="dropdown-item py-2" href="#">Something else here</a></li>
                            </ul>
                          </div>
                    </div>
                    <button type="reset" class="btn btn-app py-2 px-5">Search</button>
                </div>
            </div>
        </div>
        <div class="conatner-fluid">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="invites p-3 m-3">
                        <div class="invite-img m-auto p-2">
                            <img src="img/profile.svg" width="100%" height="100%" alt="" class="image-fluid" />
                        </div>
                        <div class="fs-4 font-medium lh-1 text-dark mt-3">Bec Allen</div>
                        <div class="fs-5 lh-1 text-dark mt-2 mb-3">2 yrs exp</div>
                        <p class="fs-6 lh-sm">Company: Microsoft</p>
                        <p class="fs-6 lh-sm">Department: UX Design</p>
                        <button type="reset" class="btn btn-app py-2 px-5 font-medium fs-5 mt-2 w-100">Send Invite</button>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="invites p-3 m-3">
                        <div class="invite-img m-auto p-2">
                            <img src="img/profile.svg" width="100%" height="100%" alt="" class="image-fluid" />
                        </div>
                        <div class="fs-4 font-medium lh-1 text-dark mt-3">Jes Barber</div>
                        <div class="fs-5 lh-1 text-dark mt-2 mb-3">5 yrs exp</div>
                        <p class="fs-6 lh-sm">Company: Strip</p>
                        <p class="fs-6 lh-sm">Department: Engineering</p>
                        <button type="reset" class="btn btn-app py-2 px-5 font-medium fs-5 mt-2 w-100">Send Invite</button>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="invites p-3 m-3">
                        <div class="invite-img m-auto p-2">
                            <img src="img/profile.svg" width="100%" height="100%" alt="" class="image-fluid" />
                        </div>
                        <div class="fs-4 font-medium lh-1 text-dark mt-3">Lara Choi</div>
                        <div class="fs-5 lh-1 text-dark mt-2 mb-3">3 yrs exp</div>
                        <p class="fs-6 lh-sm">Company: Microsoft</p>
                        <p class="fs-6 lh-sm">Department: Marketing</p>
                        <button type="reset" class="btn btn-app py-2 px-5 font-medium fs-5 mt-2 w-100">Send Invite</button>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="invites p-3 m-3">
                        <div class="invite-img m-auto p-2">
                            <img src="img/profile.svg" width="100%" height="100%" alt="" class="image-fluid" />
                        </div>
                        <div class="fs-4 font-medium lh-1 text-dark mt-3">Em Crock</div>
                        <div class="fs-5 lh-1 text-dark mt-2 mb-3">3 yrs exp</div>
                        <p class="fs-6 lh-sm">Company: Microsoft</p>
                        <p class="fs-6 lh-sm">Department: UX Design</p>
                        <button type="reset" class="btn btn-app py-2 px-5 font-medium fs-5 mt-2 w-100">Send Invite</button>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="invites p-3 m-3">
                        <div class="invite-img m-auto p-2">
                            <img src="img/profile.svg" width="100%" height="100%" alt="" class="image-fluid" />
                        </div>
                        <div class="fs-4 font-medium lh-1 text-dark mt-3">Lori Dai</div>
                        <div class="fs-5 lh-1 text-dark mt-2 mb-3">5 yrs exp</div>
                        <p class="fs-6 lh-sm">Company: Strip</p>
                        <p class="fs-6 lh-sm">Department: Engineering</p>
                        <button type="reset" class="btn btn-app py-2 px-5 font-medium fs-5 mt-2 w-100">Send Invite</button>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="invites p-3 m-3">
                        <div class="invite-img m-auto p-2">
                            <img src="img/profile.svg" width="100%" height="100%" alt="" class="image-fluid" />
                        </div>
                        <div class="fs-4 font-medium lh-1 text-dark mt-3">Jake Dane</div>
                        <div class="fs-5 lh-1 text-dark mt-2 mb-3">2 yrs exp</div>
                        <p class="fs-6 lh-sm">Company: Microsoft</p>
                        <p class="fs-6 lh-sm">Department: Marketing</p>
                        <button type="reset" class="btn btn-app py-2 px-5 font-medium fs-5 mt-2 w-100">Send Invite</button>
                    </div>
                </div>
                
            </div>
        </div>
        
    </div>
</div>





        )
    
    
    
    }


}