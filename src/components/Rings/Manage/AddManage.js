import React, { Component } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Service from '../../../Service/Service';
import { ManageSettings } from './AddMangetabs/ManageSettings/Settings';
import Slider from '@material-ui/core/Slider';
import { debounce } from "lodash";
import Member from '../Member/Member';

export class AddManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeId: "1",
            showSetting: true,
            showMembers: false,
            showmatching: false,
            ringname: '',
            description: '',
            scopetype: '1',
            ringtype: '1',
            ringTypeName: 'Public',
            ispublic: true,
            isprivate: false,
            range: [4, 10],
            interest: [],
            values: [],
            showMember: false,
            memberPopupHeader: '',
            memberPopupContent: null,
            File:'',
            imagedata:'img/profile.svg'

        }
        this.rangeSelector = this.rangeSelector.bind(this);
        this.getMatchingCriteria = this.getMatchingCriteria.bind(this);
    }

    componentDidMount() {
        var self = this;
        const data = JSON.parse(localStorage.getItem("login_data"));
        self.setState({
            userid: data.id,
            AccessToken: data.token,
        })
        //self.getMatchingCriteria(this.state.range[0], this.state.range[1]);
    }

    getMatchingCriteria(expFrom, expTo) {
        Service.GetMatchingCriteria(expFrom, expTo, this.state.AccessToken).then((response) => {
            var data = response ? response.result : null;
            this.state.interest = [];
            let UniqueId = 0;
            if (Object.entries(data.interest).length > 0) {
                Object.entries(data.interest).map(([key, value]) => {
                    UniqueId = UniqueId + 1;
                    this.state.interest.push({
                        id: UniqueId,
                        key: key,
                        value: value,
                        isSelected: false
                    });
                });
            }
            this.state.values = [];
            if (Object.entries(data.values).length > 0) {
                UniqueId = 0;
                Object.entries(data.values).map(([key, value]) => {
                    UniqueId = UniqueId + 1;
                    this.state.values.push({
                        id: UniqueId,
                        key: key,
                        value: value,
                        isSelected: false
                    });
                });
            }
            this.setState({ interest: this.state.interest, values: this.state.values });
        }).catch(function (error) {
            alert(JSON.stringify(error));
        });
    }

    generateUUID() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    Toggletab(IsProject, id) {
        if (id === '1') {
            this.setState({
                showSetting: IsProject,
                showMembers: false,
                showmatching: false
            })
        }
        if (id === '2') {
            this.setState({
                showSetting: false,
                showMembers: IsProject,
                showmatching: false
            })
        }
        if (id === '3') {
            this.setState({
                showSetting: false,
                showMembers: false,
                showmatching: IsProject
            });
            this.getMatchingCriteria(this.state.range[0], this.state.range[1]);
        }
        this.setState({ activeId: id })
    }

    SaveRing() {
      var self = this.state;
      var GUUID = {
            GUUID1: this.generateUUID(),
            GUUID2: this.generateUUID()

        }
        Service.CreateManageService(self, GUUID).then((response) => {
            window.location.replace('/RingList');
        }).catch(function (error) {
            alert(JSON.stringify(error));
        });;

    }

    handleCallback = (childData) => {
        this.setState({
            ringtype: childData.ringtype,
            ringTypeName: childData.ringTypeName,
            scopetype: childData.scopetype,
        });
    }

    rangeSelector(event, newValue) {
        this.setState({ range: newValue });
        this.debouncedSearch(this.state.range[0], this.state.range[1]);
    }

    debouncedSearch = debounce(function (expFrom, expTo) {
        this.getMatchingCriteria(expFrom, expTo);
    }, 1000);

    selectInterest(obj) {
        this.state.interest.filter(f => f.isSelected == true).map((sobj, sindex) => {
            sobj.isSelected = false;
            if (obj.id === sobj.id) {
                sobj.isSelected = true;
            }
        })
        this.setState({ interest: this.state.interest });
    }

    showMember = () => {
        this.setState({
            memberPopupContent: {
                memberId: '',
                memberName: 'test',
                email: 'test@gmail.com',
                title: '',
                location: '',
                role: 'Admin',
            }, showMember: true, memberPopupHeader: 'Add Member'
        });
    }

    saveMember = (memberData) => {
        this.setState({ memberPopupContent: memberData });
    }

    closeMember = (status) => {
        this.setState({ memberPopupHeader: '', showMember: false, memberPopupContent: null });
    }

    handleFile = e => {
        const file = e.target.files[0];
        this.setState({File:file})
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                resolve(event.target.result);
               this.setState({ imagedata: event.target.result});
               

            };

            reader.onerror = (err) => {
                reject(err);
            };

            reader.readAsDataURL(file);
        });
       }

    render() {
        return (
            <div class="height-100 pt-5 px-5">
                <div class="add_manager_form">
                    <div class="breadcrumb d-flex align-items-center fs-3 font-bold text-dark mb-4">
                        <div style={{ width: "50%" }}>
                            <span class="fs-3">Programs</span>
                            <span class="px-2 fs-3"><i class="bi bi-chevron-right"></i></span>
                            <span class="fs-3">Manage</span>
                            <span class="px-2 fs-3"><i class="bi bi-chevron-right"></i></span>
                            <span class="fs-3">New</span>
                        </div>

                        <div style={{ float: "right", width: "50%", textAlign: "right" }}> 
                            {this.state != null && this.state.showSetting == true && (
                                <button type="reset" class="border-Button btn btn-outline btn-app px-4 py-1">Cancel</button>
                            )}
                            {this.state != null && this.state.showSetting !== true && (
                                <button onClick={() => this.Toggletab(true, this.state.showmatching == true ? "2" : "1")} class="border-Button btn btn-outline btn-app px-4 py-1">Back</button>
                            )}
                            <button style={{ marginLeft: "4px" }} disabled={!this.state.ringname} onClick={() => this.SaveRing()} class="btn btn-app py-1 px-4">Save</button>
                            {this.state != null && this.state.showmatching !== true && (
                                <button style={{ marginLeft: "4px" }} class="border-Button btn btn-outline btn-app px-4 py-1" onClick={() => this.Toggletab(true, this.state.showSetting == true ? "2" : "3")}>Next</button>
                            )}
                        </div>
                    </div>

                    <div class="d-flex align-items-center mb-4"
                        ref={(node) => { if (node) { node.style.setProperty("display", (this.state.showSetting ? "block" : "none"), "important"); } }}>
                        <div class="d-inline-flex add-picture">
                            <img src={this.state.imagedata} alt="" class="img-fluid p-2" />
                            <div class="upload-pic">
                                <input type="file" class="file-upload-input" name="" onChange={this.handleFile}  />
                                <label style={{ minWidth: "150px", maxWidth: "250px", paddingTop: "25px", paddingLeft: "10px" }} class="file-upload-label"></label>
                            </div>
                        </div>
                        <div class="ps-3 picture-label">Add a Ring Picture</div>
                    </div>
                    <div class="row" style={{ display: this.state.showSetting ? "block" : "none" }}>
                        <div class="col-lg-4 col-md-6">
                            <div class="custom-form-group mb-4">
                                <label class="form-label mb-1" for="name">Name</label>
                                <input type="text" class="form-control" id="name" name="name" value={this.state.ringname}
                                    onChange={(e) => this.setState({ ringname: e.target.value.replace(/[`~!@#$%^*()_|+\=?;:",<>\{\}\[\]\\\/]/gi, '')  })}
                                />
                            </div>
                        </div>
                    </div>

                    <div class="row" style={{ display: this.state.showSetting ? "block" : "none" }}>
                        <div class="col-lg-4 col-md-6">
                            <div class="custom-form-group mb-3">
                                <label class="form-label mb-1" for="description">Description</label>
                                <textarea class="form-control" id="description" name="description" value={this.state.description}
                                    onChange={(e) => this.setState({ description: e.target.value.replace(/[`~!@#$%^*()_|+\=?;:",<>\{\}\[\]\\\/]/gi, '')  })}></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="row" style={{ display: this.state.showSetting != true ? "block" : "none" }}>
                        <div class="row" ref={(node) => { if (node) { node.style.setProperty("margin-left", "13px", "important"); node.style.setProperty("padding-right", "0px", "important"); } }}>
                            <div class="row form-control" style={{ height: "100px" }}>
                                <div style={{ width: "6%", float: "left" }}>
                                    <div style={{ width: "100%", color: "#999999" }}></div>
                                    <div style={{ width: "100%", marginTop: "20px" }}>
                                        <div style={{ marginTop: "38px"}} class="table-profile-name">TE</div>
                                    </div>
                                </div>
                                <div style={{ width: "27%", float: "left" }}>
                                    <div class="ring-detail-header">
                                        Name
                                    </div>
                                    <div class="ring-detail-data">
                                        Test
                                    </div>
                                </div>
                                <div style={{ width: "10%", float: "left" }}>
                                    <div class="ring-detail-header">
                                        Mentees
                                    </div>
                                    <div class="ring-detail-data">
                                        5
                                    </div>
                                </div>
                                <div style={{ width: "10%", float: "left" }}>
                                    <div class="ring-detail-header">
                                        Mentors
                                    </div>
                                    <div class="ring-detail-data">
                                        3
                                    </div>
                                </div>
                                <div style={{ width: "10%", float: "left" }}>
                                    <div class="ring-detail-header">
                                        Type
                                    </div>
                                    <div class="ring-detail-data">
                                        Private
                                    </div>
                                </div>
                                <div style={{ width: "10%", float: "left" }}>
                                    <div class="ring-detail-header">
                                        Status
                                    </div>
                                    <div class="ring-detail-data">
                                        Active
                                    </div>
                                </div>
                                <div style={{ width: "27%", float: "left" }}>
                                    <div class="ring-detail-header">
                                        Description
                                    </div>
                                    <div class="ring-detail-data">
                                        Test Test
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul class="nav nav-tabs mt-4 add-manage-ul" style={{ width: "100%" }}>
                        <li class="nav-item" >
                            <NavLink style={{ cursor: 'pointer' }} className={`nav-link add-manage ${this.state.activeId === "1" ? "active active-RingTab" : "inactive"}`} onClick={() => this.Toggletab(true, "1")} id="ProjectAndTravel"  >Settings</NavLink>
                        </li>
                        <li class="nav-item" >
                            <NavLink style={{ cursor: 'pointer' }} className={`nav-link add-manage  ${this.state.activeId === "2" ? "active active-RingTab" : "inactive"}`} onClick={() => this.Toggletab(true, "2")} id="ProjectAndTravel"  >Members</NavLink>
                        </li>
                        <li class="nav-item" >
                            <NavLink style={{ cursor: 'pointer' }} className={`nav-link add-manage ${this.state.activeId === "3" ? "active active-RingTab" : "inactive"}`} onClick={() => this.Toggletab(true, "3")} id="ProjectAndTravel"  >Matching criteria</NavLink>
                        </li>
                    </ul>

                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade w-100 pb-5 " style={{ display: this.state.showSetting ? "contents" : "none" }} >
                            <div class="container-fluid settings">
                                <ManageSettings parentCallback={this.handleCallback} manageContent={this.state} />
                            </div>
                        </div>
                        <div class="tab-pane fade w-100 pb-5" style={{ display: this.state.showMembers ? "contents" : "none" }}>
                            <div class="bg-color rounded p-2 d-flex align-items-center justify-content-between">
                                <div class="search d-inline-flex align-items-center ps-3 me-3 mentorBench-Search">
                                    <i class="bi bi-search text-dark"></i>
                                    <input type="text" class="form-control bg-transparent border-0 inputSearch" placeholder="Search"
                                        name="" />
                                </div>
                                <div class="list-actions d-flex align-items-center mentorBench-SearchButtons">
                                    <a onClick={() => this.showMember()}
                                        class="action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5 text-dark">
                                        <i class="bi bi-plus fs-3"></i>
                                        <span>Add</span>
                                    </a>
                                    <a href="javascript:;"
                                        class="action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5">
                                        <i class="bi bi-x fs-4 me-1"></i>
                                        <span>Delete</span>
                                    </a>
                                </div>
                            </div>

                            <div class="table-responsive mt-3">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Display name</th>
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
                        <div style={{ display: this.state.showmatching ? "contents" : "none" }}>
                            <div class="row pt-3">
                                <div class="col-lg-4 col-md-6 mb-4">
                                    <div class="border rounded p-4" ref={(node) => { if (node) { node.style.setProperty("padding-right", "0px", "important"); } }}>
                                        <div class="font-bold mb-3 text-dark">Interests</div>
                                        <div style={{ minHeight: "100px", maxHeight: "300px", overflowY: "auto", paddingRight: "20px" }}>
                                            {this.state != null && this.state.interest != null && this.state.interest.length > 0 && this.state.interest.map((obj, index) => {
                                                return (
                                                    <div class="d-flex align-items-center justify-content-between">
                                                        <div class="form-check d-flex align-items-center mb-2">
                                                            <input class="form-check-input" type="radio" name="Interests" value={index} onClick={() => this.selectInterest(obj)} />
                                                            <label class="form-check-label ps-2 pt-1" for="design">
                                                                {obj.key}
                                                            </label>
                                                        </div>
                                                        <div class="font-medium">{obj.value}</div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-6 mb-4">
                                    <div class="border rounded p-4">
                                        <div class="font-bold mb-3 text-dark">Values</div>
                                        {this.state != null && this.state.values != null && this.state.values.length > 0 && this.state.values.map((obj, index) => {
                                            return (
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <div class="form-check d-flex align-items-center mb-2">
                                                        <input class="form-check-input" type="checkbox" value={obj.isSelected} />
                                                        <label class="form-check-label ps-2 pt-1" for="design">
                                                            {obj.key}
                                                        </label>
                                                    </div>
                                                    <div class="font-medium">{obj.value}</div>
                                                </div>
                                            )
                                        })}
                                        
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 mb-3">
                                    <div class="border rounded p-4">
                                        <div class="font-bold mb-3 text-dark">Filter by Years of Experience</div>
                                        <Slider value={this.state.range} onChange={this.rangeSelector} valueLabelDisplay="auto" />

                                        <div class="row py-2">
                                            <div class="col-md-6">
                                                <div class="custom-form-group">
                                                    <input type="text" disabled value={this.state.range[0]} class="form-control" id="min" name="min" />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="custom-form-group">
                                                    <input type="text" disabled value={this.state.range[1]} class="form-control" id="max" name="max" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    this.state != null && this.state.showMember == true && (
                        <Member showMember={this.state.showMember} onCloseMember={this.closeMember} popupHeader={this.state.memberPopupHeader}
                            popupContent={this.state.memberPopupContent} onSaveMember={this.saveMember}></Member>
                    )
                }
            </div>

        )
    }
}