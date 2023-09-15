import React, { Component } from 'react';
import {  NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Service from '../../../Service/Service';

export class EditManage extends Component {
    constructor(props) {
        super(props);
        this.state={
            activeId: "1",
            showSetting:true,
            showMembers:false,
            showmatching:false,
            ringname:'',
            description:'',
            ringtype:'1',
            ringTypeName:'Public',
            ispublic:true,
            isprivate:false,
            ringid:''
        }

    }

    componentDidMount(){
        var self = this;
        const data=JSON.parse(localStorage.getItem("login_data"));
        self.setState({
            userid:data.id,
            AccessToken:data.token,
        })
        const editdata = JSON.parse(localStorage.getItem('EditRingData'));
        this.setState({
            ringid:editdata.id,
            ringname:editdata.name,
            description:editdata.description,

        })
        if(editdata.ringTypeId === 1){
          this.setState({
            ispublic:true,
            isprivate:false
          })
        }else{
         this.setState({
            ispublic:false,
            isprivate:true
         })
        }
    }


 

    Toggletab(IsProject, id){
        if (id === '1') {
            this.setState({
                showSetting: IsProject,
                showMembers:false,
                showmatching:false
            })
        }
        if (id === '2') {
            this.setState({
                showSetting: false,
                showMembers:IsProject,
                showmatching:false
            })
        }
        if (id === '3') {
            this.setState({
                showSetting: false,
                showMembers:false,
                showmatching:IsProject
            }) 

        }
        this.setState({ activeId: id })


    }
    SaveRing(){
        var self = this.state;
        Service.EditManageService(self).then((response) => {
            window.location.replace('/RingList');
        }).catch(function (error) {
            alert(JSON.stringify(error));
        });;

    }
    backpage(){
        window.location.replace('/RingList');
    }
    

    render() {
        return (
            <div class="height-100 pt-5 px-5">
            <div class="add_manager_form">
                <div class="breadcrumb d-flex align-items-center fs-3 font-bold text-dark mb-4">
                    <span>Programs</span>
                    <span class="px-2 fs-5"><i class="bi bi-chevron-right"></i></span>
                    <span>Manage</span>
                    <span class="px-2 fs-5"><i class="bi bi-chevron-right"></i></span>
                    <span>Edit</span>
                </div>
                <div class="d-flex align-items-center mb-4">
                    <div class="d-inline-flex add-picture">
                        <img src="img/profile.svg" alt="" class="img-fluid p-2" />
                        <div class="upload-pic">
                            <input type="file" class="file-upload-input" name="" accept="image/*" />
                            <label class="file-upload-label"></label>
                        </div>
                    </div>
                     <div class="ps-3 picture-label">Add a Ring Picture</div>
                       
                        <div class="ps-3">
                        <button onClick={() => this.backpage()} class="col btn  btn-app px-4 py-1">Cancel</button>
                        <button onClick={() => this.SaveRing()} class="col btn btn-app py-1 px-4 ms-3 ">Update</button>
                    </div>
                       
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-6">
                        <div class="custom-form-group mb-4">
                            <label class="form-label mb-1" for="name">Name</label>
                            <input type="text" class="form-control" id="name" name="name"
                             onChange={(e) => this.setState({ ringname: e.target.value })}
                             value={this.state.ringname}
                            />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-6">
                        <div class="custom-form-group mb-3">
                            <label class="form-label mb-1" for="description">Description</label>
                            <textarea class="form-control" id="description" name="description"
                             onChange={(e) => this.setState({ description: e.target.value })}
                             value={this.state.description}
                            ></textarea>
                        </div>
                    </div>
                   
                </div>

                <ul class="nav nav-tabs mt-4 add-manage-ul" >
                <li class="nav-item" >
                 <NavLink style={{ cursor: 'pointer' }} className={`nav-link add-manage ${this.state.activeId === "1" ? "active" : "inactive"}`} onClick={() => this.Toggletab(true, "1")} id="ProjectAndTravel"  >Settings</NavLink>
                  </li>
                  <li class="nav-item" >
                  <NavLink style={{ cursor: 'pointer' }} className={`nav-link add-manage  ${this.state.activeId === "2" ? "active" : "inactive"}`} onClick={() => this.Toggletab(true, "2")} id="ProjectAndTravel"  >Members</NavLink>
                  </li>
                  <li class="nav-item" >
                   <NavLink style={{ cursor: 'pointer' }} className={`nav-link add-manage ${this.state.activeId === "3" ? "active" : "inactive"}`} onClick={() => this.Toggletab(true, "3")} id="ProjectAndTravel"  >Matching criteria</NavLink>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade w-100 pb-5 " 
                       style={{ display: this.state.showSetting ? "contents" : "none" }} >
                        <div class="container-fluid settings">
                            <div class="d-flex align-items-center mt-4">
                                <div class="fs-6 font-medium title">Type</div>
                                <div class="form-check d-flex align-items-center">
                                    <input class="form-check-input" type="checkbox" 
                                        
                                        checked={this.state.ispublic}
                                        onChange={(e) => {
                                         this.setState({ 
                                            ringtype: 1,
                                            ringTypeName:"Public",
                                            ispublic:e.currentTarget.checked ,
                                            isprivate:false

                                        
                                        })
                                       
                                      }}
                                        />
                                    <label class="form-check-label ps-2 pt-1">Public</label>
                                </div>
                                <div class="form-check d-flex align-items-center">
                                    <input class="form-check-input" type="checkbox" 
                                        checked={this.state.isprivate}
                                        onChange={(e) => {
                                           
                                            this.setState({ 
                                                ringtype: 2,
                                                ringTypeName:"Private",
                                                isprivate:e.currentTarget.checked ,
                                                ispublic:false
                                            
                                            })

                                        }}
                                        />
                                    <label class="form-check-label ps-2 pt-1">Private</label>
                                </div>
                            </div>
                            <div class="d-flex align-items-center mt-4">
                                <div class="fs-6 font-medium title">Scope</div>
                                <div class="form-check d-flex align-items-center">
                                    <input class="form-check-input" type="checkbox" id="internation_mentors"
                                        name="internation_mentors" value="internation_mentors"/>
                                    <label class="form-check-label ps-2 pt-1">Internal mentors only</label>
                                </div>
                                <div class="form-check d-flex align-items-center">
                                    <input class="form-check-input" type="checkbox" id="external_mentors"
                                        name="external_mentors" value="external_mentors"/>
                                    <label class="form-check-label ps-2 pt-1">Allow external mentors</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade w-100 pb-5"  style={{ display: this.state.showMembers ? "contents" : "none" }}>
                        <div class="bg-color rounded p-2 d-flex align-items-center justify-content-between mt-4">
                                <div class="list-actions d-flex align-items-center">
                                <NavLink tag={Link} to="javascript:;"
                                    class="action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5 text-dark">
                                    <i class="bi bi-plus fs-3"></i>
                                    <span>Add</span>
                                </NavLink>
                                <NavLink tag={Link} to="javascript:;"
                                    class="action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5">
                                    <i class="bi bi-x fs-4 me-1"></i>
                                    <span>Delete</span>
                                </NavLink>
                            </div>
                            <div class="search d-inline-flex align-items-center ps-3 me-3">
                                <i class="bi bi-search text-dark"></i>
                                <input type="text" class="form-control bg-transparent border-0" placeholder="Search"
                                    name="" />
                            </div>
                        </div>
                        <div class="table-responsive mt-3">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="ps-5"><span class="ps-3 nowrap"> Display name</span></th>
                                        <th>User name</th>
                                        <th>Title</th>
                                        <th>Location</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="table-profile-name">BA</div>
                                                <div class="fs-6 ps-3"> Bec Allen </div>
                                            </div>
                                        </td>
                                        <td>bec.allen@mentorz.com</td>
                                        <td>UX Design director</td>
                                        <td>Seattle</td>
                                        <td>Mentor</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="table-profile-name">jb</div>
                                                <div class="fs-6 ps-3">Jes Barber</div>
                                            </div>
                                        </td>
                                        <td>Jes.Barber@mentorz.com</td>
                                        <td>Engineering manager</td>
                                        <td>New York</td>
                                        <td>Mentee</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade w-100 pb-5" style={{ display: this.state.showmatching ? "contents" : "none" }}>
                        <div class="bg-color rounded p-2 d-flex align-items-center justify-content-between mt-4">
                            <div class="list-actions d-flex align-items-center">
                                <NavLink tag={Link} to="javascript:;"
                                    class="action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5 text-dark">
                                    <i class="bi bi-plus fs-3"></i>
                                    <span>Add</span>
                                </NavLink>
                                <NavLink tag={Link} to="javascript:;"
                                    class="action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5">
                                    <i class="bi bi-x fs-4 me-1"></i>
                                    <span>Delete</span>
                                </NavLink>
                            </div>
                            <div class="search d-inline-flex align-items-center ps-3 me-3">
                                <i class="bi bi-search text-dark"></i>
                                <input type="text" class="form-control bg-transparent border-0" placeholder="Search"
                                    name="" />
                            </div>
                        </div>
                        <div class="table-responsive mt-3">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="ps-5"><span class="ps-3 nowrap"> Display name</span></th>
                                        <th>User name</th>
                                        <th>Title</th>
                                        <th>Location</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="table-profile-name">BA</div>
                                                <div class="fs-6 ps-3"> Bec Allen </div>
                                            </div>
                                        </td>
                                        <td>bec.allen@mentorz.com</td>
                                        <td>UX Design director</td>
                                        <td>Seattle</td>
                                        <td>Mentor</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="table-profile-name">jb</div>
                                                <div class="fs-6 ps-3">Jes Barber</div>
                                            </div>
                                        </td>
                                        <td>Jes.Barber@mentorz.com</td>
                                        <td>Engineering manager</td>
                                        <td>New York</td>
                                        <td>Mentee</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>




        )


    }



}