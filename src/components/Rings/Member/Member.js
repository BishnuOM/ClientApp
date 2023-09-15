import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import Service from '../../../Service/Service';
import AlertService from '../../../AlertService/Alert';
import Loader from '../../Layout/Loader';
import Swal from "sweetalert2";
import Loading from '../../Layout/Loading';


export default class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ringId: this.props.popupContent.ringId,
            id: this.props.popupContent.memberId,
            memberId: this.props.popupContent.memberId,
            firstName: this.props.popupContent.firstName,
            lastName: this.props.popupContent.lastName,
            emailAddress: this.props.popupContent.emailAddress,
            title: this.props.popupContent.title,
            country: this.props.popupContent.country,
            city: this.props.popupContent.city,
            roleId: this.props.popupContent.roleId,
            userRoleId: this.props.popupContent.userRoleId,
            isOrgUser: this.props.popupContent.isOrgUser,
            isSelectedUser: this.props.popupContent.isSelectedUser,
            imagedata: this.props.popupContent.imagedata,
            isLoading: true,
            isPageLoading: false,
            activeId: "1",
            ismembers: true,
            options: [],
            showgroup: true,
            serachedvalue: '',
            selectedvalue: [],
            showroles: false,
            selectedmembers: [],
            isdisablegroup: false

        }
    }

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem("login_data"));
        if (data && data.id && data.token) {
            this.setState({
                userId: data.id,
                accessToken: data.token,
            })
        }
        if (localStorage.getItem('LogInType') === '0') {
            this.GetOrganizationGroup();
        }
    }

    GetOrganizationGroup() {
        var self = this;
        Service.GetOrganizationGroup().then((response) => {
            this.setState({
                ...this.state, isLoading: false, organizationgroupdata: response.value
            }, () => {
                let options = [...this.state.options];
                self.state.organizationgroupdata.forEach((element) => {
                    options.push({
                        key: element.id,
                        value: element.id,
                        label: element.displayName,
                        mailNickname: element.mailNickname
                    })
                    this.setState({ options });
                })
            });
        }).catch(function (error) {
            this.setState({
                isLoading: false,
            })
        })
    }

    handleClose() {
        this.props.onCloseMember(false);
    }

    saveMember() {
        if (this.emailValidation()) {
            this.setState({
                EmailError: ''
            });
            if (this.state.userId && this.state.accessToken) {
                this.setState({
                    isPageLoading: true,
                })
                Service.SaveMember(this.state).then((response) => {
                    this.setState({
                        isPageLoading: false,
                    })
                    if (response && response.length == 1) {
                        if (response[0].responseErrorMessage == "EMAILEXIST") {
                            AlertService.warningInfo("Member Add", "<span style = 'color:red;font-family: Myriad Pro;font-style: normal;font-weight: 400;font-size: 16px;line-height: 24px;text-align: center;'>Same email address already exist.</span>").then((res) => {
                                this.props.onSaveMember(this.state);
                            });
                        }
                        else if (response[0].responseErrorMessage == "INVITED") {
                            AlertService.warningInfo("Member Added", "<span style = 'font-family: Myriad Pro;font-style: normal;font-weight: 400;font-size: 16px;line-height: 24px;text-align: center;'>An email notification has been sent to " + response[0].emailAddress + ". Once they accept, they will be added to the program.</span >", 'success').then((res) => {
                                this.props.onSaveMember(this.state);
                            });
                        }
                        else if (response[0].responseErrorMessage == "MEMBEREXIST") {
                            AlertService.warningInfo("Member Add", "<span style = 'color:red;font-family: Myriad Pro;font-style: normal;font-weight: 400;font-size: 16px;line-height: 24px;text-align: center;'>Same email address contained member is already exist in this program.</span >").then((res) => {
                                this.props.onSaveMember(this.state);
                            });
                        }
                    }
                    else {
                        this.props.onSaveMember(this.state);
                    }
                }).catch(function (error) {
                    this.setState({
                        isPageLoading: false,
                    })
                    alert(JSON.stringify(error));
                    this.props.onCloseMember(false);
                })
            }
        }
    }

    Togglemembers(IsProject, id) {
        if (id === '1') {
            this.setState({ ismembers: IsProject, activeId: id });
        } else {
            this.setState({ ismembers: false, activeId: id });
        }
    }

    onChangedsearch = (e) => {
        this.setState({ serachedvalue: e.target.value });
    }

    onSearchedvalue = (searchTerm) => {
        this.setState({
            ...this.state, serachedvalue: searchTerm.label
        }, () => {
            this.GetGroupMembers(searchTerm);
            // console.log(this.state.serachedvalue);
            let options = [...this.state.options];
            /* Takes a list of options, and an ID to remove */
            const removePlaylistById = (plists, key) =>
                plists.filter(x => x.key !== key);
            /* Removes playlist ID  from list */
            const result = removePlaylistById(options, searchTerm.value);

            this.setState({ options: result })
        });
    }

    GetGroupMembers(data) {
        let selectedvalue = [...this.state.selectedvalue];
        let selectedmembers = [...this.state.selectedmembers];

        Service.GetGroupMembers(data.value).then((response) => {
            selectedvalue.push({
                id: data.value,
                label: data.label,
                value: response.value.length + " members"
            })
            this.setState({ selectedvalue });
            let name;
            response.value.forEach((element) => {
                if (element.givenName == null) {
                    name = element.displayName;
                } else {
                    name = element.givenName;
                }
                selectedmembers.push({
                    GroupId: data.value,
                    firstName: name,
                    lastName: element.surname,
                    emailAddress: element.mail,
                    title: element.jobTitle,
                    country: '',
                    city: '',
                    roleId: '1',
                    ringId: this.state.ringId,
                    id: element.id,
                    userRoleId: '3',
                    isOrgUser: true,
                    userId: this.state.userId
                })
            })

            this.setState({ selectedmembers });
        })
        this.setState({ serachedvalue: '', isdisablegroup: true })
    }

    Nextgroup() {
        this.setState({
            showroles: true,
            showgroup: false
        })
    }

    Addgroups() {
        let checkGroup = this.state.selectedmembers.some(x => x.hasOwnProperty('GroupId'));
        if (checkGroup) {
            this.state.selectedmembers.forEach((element) => {
                element.id = ''
                delete element['GroupId']
            })
        } else {
            Service.SaveMembers(this.state.accessToken, this.state.selectedmembers).then((response) => {
                debugger;
                if (response && response.length) {
                    let infoMessage = '', isInvited = false, isMemberExist = false, existMember = [];
                    response.map((result, index) => {
                        if (result.responseErrorMessage == "EMAILEXIST") {
                            infoMessage = "<span style = 'color:red',fontWeight: 'bold' >Same email address already exist.</span>";
                        }
                        else if (result.responseErrorMessage == "INVITED") {
                            isInvited = true;
                            existMember.push(result);
                        }
                        else if (result.responseErrorMessage == "MEMBEREXIST") {
                            isMemberExist = true;
                            existMember.push(result);
                        }
                    })
                    let invites = [];
                    if (isInvited) {
                        invites = existMember.filter(item => item.responseErrorMessage == "INVITED");
                        infoMessage = invites.length > 1 ? "<div style = 'padding-bottom:15px'> <div style = 'font-weight: bold;padding-bottom:15px' >An email notification have been sent to the following members.</div>" :
                            "<div> <div style = 'font-weight: bold;padding-bottom:15px' >An email notification has been sent to the following member.</div>";
                        for (var i = 0; i < invites.length; i++) {
                            infoMessage = infoMessage + "<div style = 'font-family: Myriad Pro;font-style: normal;font-weight: 400;font-size: 16px;line-height: 24px;text-align:left;padding-bottom:5px'>" + (i + 1) + "." + invites[i].firstName + " " + invites[i].lastName + "(" + invites[i].emailAddress + ")</div>"
                        }
                        infoMessage = infoMessage + "</div>";
                    }
                    if (isMemberExist) {
                        let existItems = existMember.filter(item => item.responseErrorMessage == "MEMBEREXIST");
                        infoMessage = existItems.length > 1 ? "<div> <div style = 'font-weight: bold;padding-bottom:15px' >The following members all are already exists in this program.</div>" :
                            "<div> <div style = 'font-weight: bold;padding-bottom:15px' >The following member is already exists in this program.</div>";
                        for (var i = 0; i < existItems.length; i++) {
                            infoMessage = infoMessage + "<div style = 'font-family: Myriad Pro;font-style: normal;font-weight: 400;font-size: 16px;line-height: 24px;text-align:left;padding-bottom:5px'>" + (i + 1) + "." + existItems[i].firstName + " " + existItems[i].lastName + "(" + existItems[i].emailAddress + ")</div>"
                        }
                        infoMessage = infoMessage + "</div>";
                    }
                    if (infoMessage) {
                        AlertService.warningInfo((invites.length > 1 ? "Members Added" : isMemberExist ? "Member Add" : "Member Added"), infoMessage, (isInvited ? 'success' : 'warning')).then((res) => {
                            this.props.onSaveMember(this.state);
                        });
                    }
                    else {
                        this.props.onSaveMember(this.state);
                    }
                }
                else {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Groups have been added to your ring.!',
                        icon: 'success',
                        showConfirmButton: false,
                        showCloseButton: true,
                    });
                    this.props.onSaveMember(this.state);
                }

            }).catch(function (error) {
                alert(JSON.stringify(error));
            })
        }
    }

    validateEmail(e) {
        this.setState({ emailAddress: e.target.value })

    }

    emailValidation() {

        const regex = /^(("[\w\s]+")|([\w]+(?:\.[\w]+)*)|("[\w-\s]+")([\w]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

        if (!this.state.emailAddress || regex.test(this.state.emailAddress) === false) {
            this.setState({
                EmailError: "Email is not valid"
            });
            return false;
        }
        return true;
    }

    isMouseEnter(item, val) {
        item.isMouseEnter = val;
    }

    isMouseEntered(item, val) {
        item.isMouseEntered = val;
    }

    changerole(e, id) {
        this.state.selectedmembers.forEach((element) => {
            if (element.GroupId === id) {
                element.roleId = e.target.value;

            }
            element.id = ''
            delete element['GroupId']
        })
    }

    onremoveitems(data) {
        let selectedvalue = [...this.state.selectedvalue];
        /* Takes a list of options, and an ID to remove */
        const removePlaylistById = (plists, id) =>
            plists.filter(x => x.id !== id);
        /* Removes playlist ID  from list */
        const result = removePlaylistById(selectedvalue, data);

        this.setState({ selectedvalue: result },
            () => {
                if (!this.state.selectedvalue.length) {
                    this.setState({ isdisablegroup: false })
                }
            }
        )
    }


    render() {
        return (
            <Fragment>
                <Loader isLoading={this.state.isPageLoading}></Loader>
                <Modal show={this.props.showMember} onHide={() => this.handleClose()}
                    aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton className="confirmation-header">
                        <Modal.Title>
                            <div className="ibox-title" >
                                {this.state.isSelectedUser == true ?
                                    <a style={{ fontWeight: "400", fontSize: "24px" }} onClick={() => this.Togglemembers(true, "1")} >Add Member</a>
                                    : <>
                                        <a className={`headerlink member_tab ${this.state.activeId === "1" ? "actives" : ""}`} onClick={() => this.Togglemembers(true, "1")} >Add Member</a>

                                        <div class="vertical"></div>
                                        <a className={`headerlink member_tab ${this.state.activeId === "2" ? "actives" : ""}`} onClick={() => this.Togglemembers(true, "2")} >Add Group</a>
                                    </>
                                }
                            </div>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{ minHeight: "250px" }}>
                        {this.state.ismembers ?
                            <div>
                                {this.state.isSelectedUser && (
                                    <div style={{ width: "100%", marginBottom: "20px", position: "relative", height: "100px" }}>
                                        {this.state.imagedata ?
                                            <div style={{ height: "100px", width: "100px", position: "absolute", left: "37%", borderRadius: "100%", background: "rgba(153, 153, 153, 0.2)" }}>
                                                {this.state.isLoading ?
                                                    <Loading isCircle={true} />
                                                    :
                                                    <img style={{ height: "100px", width: "100px", borderRadius: "100%", objectFit: "contain" }} src={this.state.imagedata} alt="" class="img-fluid p-2" />
                                                }
                                            </div>
                                            :
                                            <div style={{ position: "absolute", left: "37%" }} class="member-profile-name">
                                                {this.state.isLoading ?
                                                    <Loading isCircle={true} />
                                                    :
                                                    <>{(this.state.firstName + ' ' + this.state.lastName).match(/\b(\w)/g) ? (this.state.firstName + ' ' + this.state.lastName).match(/\b(\w)/g).join('').toUpperCase() : (this.state.firstName + ' ' + this.state.lastName)}</>
                                                }
                                            </div>
                                        }
                                    </div>
                                )}

                                <div class="custom-form-group">
                                    <div style={{ width: "49%", float: "left" }}>
                                        <label class="form-label mb-1 font-size-16px" for="memberFirstName">First Name</label>
                                        {this.state.isSelectedUser ?
                                            <div className="selected-member font-size-16px">{this.state.firstName}</div> :
                                            <input maxLength="50" autoComplete="none" autoFocus type="text" class="form-control font-size-16px" id="memberFirstName" name="memberFirstName" value={this.state.firstName}
                                                onChange={(e) => this.setState({ firstName: e.target.value.replace(/[`~!@#$%^*()_|+\=?;:",<>\{\}\[\]\\\/]/gi, '') })} />}
                                    </div>
                                    <div style={{ marginLeft: "2%", width: "49%", float: "left" }}>
                                        <label class="form-label mb-1 font-size-16px" for="memberLastName">Last Name</label>
                                        {this.state.isSelectedUser ?
                                            <div className="selected-member font-size-16px">{this.state.lastName ? this.state.lastName : '-'}</div> :
                                            <input maxLength="50" autoComplete="none" type="text" class="form-control font-size-16px" id="memberLastName" name="memberLastName" value={this.state.lastName}
                                                onChange={(e) => this.setState({ lastName: e.target.value.replace(/[`~!@#$%^*()_|+\=?;:",<>\{\}\[\]\\\/]/gi, '') })}
                                            />}
                                    </div>
                                </div>

                                <div class="custom-form-group">
                                    <label class="form-label mb-1 font-size-16px" for="email">Email</label>
                                    {this.state.isSelectedUser ?
                                        <div className="selected-member font-size-16px">{this.state.emailAddress}</div> : <>
                                            <input maxLength="100" autoComplete="none" type="text" class="form-control font-size-16px" id="email" name="email" value={this.state.emailAddress}
                                                onChange={(e) => this.validateEmail(e)} />
                                            <span className="text-danger">{this.state.EmailError}</span></>}
                                </div>
                                <div class="custom-form-group">
                                    <label class="form-label mb-1 font-size-16px" for="title">Title</label>
                                    {this.state.isSelectedUser ?
                                        <div className="selected-member font-size-16px">{this.state.title ? this.state.title : '-'}</div> :
                                        <input maxLength="100" autoComplete="none" type="text" class="form-control font-size-16px" id="title" name="title" value={this.state.title}
                                            onChange={(e) => this.setState({ title: e.target.value.replace(/[`~!&-'@#$%^*()_|+\=?;:",.<>\{\}\[\]\\\/]/gi, '') })}
                                        />}
                                </div>


                                <div class="custom-form-group">
                                    <div style={{ width: "49%", float: "left" }}>
                                        <label class="form-label mb-1 font-size-16px" for="country">Country</label>
                                        {this.state.isSelectedUser ?
                                            <div className="selected-member font-size-16px">{this.state.country ? this.state.country : '-'}</div> :
                                            <input maxLength="100" autoComplete="none" type="text" class="form-control font-size-16px" id="country" name="country" value={this.state.country}
                                                onChange={(e) => this.setState({ country: e.target.value.replace(/[`~!&-'@#$%^*()_|+\=?;:",.<>\{\}\[\]\\\/]/gi, '') })} />}
                                    </div>

                                    <div style={{ marginLeft: "2%", width: "49%", float: "left" }}>
                                        <label class="form-label mb-1 font-size-16px" for="city">City</label>
                                        {this.state.isSelectedUser ?
                                            <div className="selected-member font-size-16px">{this.state.city ? this.state.city : '-'}</div> :
                                            <input maxLength="100" autoComplete="none" type="text" class="form-control font-size-16px" id="city" name="city" value={this.state.city}
                                                onChange={(e) => this.setState({ city: e.target.value.replace(/[`~!&-'@#$%^*()_|+\=?;:",.<>\{\}\[\]\\\/]/gi, '') })} />}
                                    </div>
                                </div>

                                <div class="custom-form-group">
                                    <label class="form-label mb-1 font-size-16px" for="role">Role (Choose One)</label>
                                    <select class="form-control font-size-16px" id="role" name="role" defaultValue={this.state.roleId}
                                        onChange={(e) => this.setState({ roleId: e.target.value })} ref={(node) => { if (node) { node.style.setProperty("width", "100%", "important"); node.style.setProperty("appearance", "auto", "important"); } }}>
                                        <option value="2">Mentor</option>
                                        <option value="1">Mentee</option>
                                        <option value="3">Admin</option>
                                    </select>
                                </div>
                            </div>
                            : <>
                                <div class="custom-form-group" style={{ display: this.state.showgroup ? "contents" : "none" }}>
                                    <label class="form-label mb-1 font-medium font-size-16px" style={{ marginTop: "40px" }} for="title">Group(s) Select</label>
                                    <input class="nosubmit form-control  inputSearch font-size-16px" id="search" type="text" autoComplete="off" placeholder="Search..." value={this.state.serachedvalue} onChange={this.onChangedsearch}></input>

                                    <div className="dropdown_group">
                                        {this.state.options
                                            .filter((item) => {
                                                const searchTerm = this.state.serachedvalue.toLowerCase();
                                                const fullName = item.label.toLowerCase();
                                                return (
                                                    searchTerm &&
                                                    fullName.includes(searchTerm.toLowerCase()) &&
                                                    fullName !== searchTerm
                                                );
                                            })
                                            .map((item) => (
                                                <div onMouseEnter={() => this.isMouseEntered(item, true)} onMouseLeave={() => this.isMouseEntered(item, false)}
                                                    className={item.isMouseEntered ? 'custom-dropdown-item dl-mouse-over-item' : 'custom-dropdown-item'}
                                                    key={item.value} onClick={() => this.onSearchedvalue(item)}> {item.label}</div>
                                            ))}
                                    </div>
                                    {this.state.selectedvalue.map((result, index) => {
                                        return (
                                            <>
                                                <div class="d-flex align-items-center justify-content-between" style={{ marginTop: "10px" }}>
                                                    <div class=" d-flex align-items-center fs-3 mb-0">
                                                        <label className='addgroup'>{`${result.label} - ${result.value}`}</label>
                                                    </div>
                                                    <div style={{ marginRight: "14px" }}>
                                                        <a className='addgroup'><i class="fa fa-times" aria-hidden="true" onClick={() => this.onremoveitems(result.id)}></i></a>
                                                    </div> </div>  </>)
                                    })}


                                </div>

                                <div class="custom-form-group" style={{ display: this.state.showroles ? "contents" : "none" }}>
                                    <div>
                                        <label class="form-label mb-1 font-size-16px" style={{ marginTop: "40px", fontSize: "30px" }} for="title">Select Roles</label>
                                    </div>
                                    <div>
                                        <label className='addgroup font-size-16px'> Designate roles for your groups (mentors, mentees, or both)</label>
                                    </div>

                                    {this.state.selectedvalue.map((result, index) => {
                                        return (
                                            <>
                                                <div class="d-flex align-items-center justify-content-between" style={{ marginTop: "10px" }}>
                                                    <div class=" d-flex align-items-center fs-3 mb-0">
                                                        <label className='addgroup font-size-16px'>{`${result.label}`}</label>
                                                    </div>
                                                    <div style={{ marginRight: "20%" }}>
                                                        <select className='addgroup-select font-size-16px' defaultValue={this.state.roleId} onChange={(e) => this.changerole(e, result.id)}>
                                                            <option value="2">Mentor</option>
                                                            <option value="1">Mentee</option>
                                                            <option value="3">Admin</option>
                                                        </select>
                                                    </div> </div>  </>)
                                    })}

                                </div>

                            </>
                        }
                    </Modal.Body>


                    <Modal.Footer style={{ height: "130px",border:"none" }}>
                        {this.state.ismembers ? <div style={{ width: "100%", textAlign: "center" }}>
                            <button style={{ minWidth: "155px" }} type="reset" class="border-Button btn btn-outline btn-app px-4 py-1" onClick={() => this.handleClose()}>Cancel</button>
                            <button style={{ marginLeft: "4px", minWidth:"155px" }} disabled={!this.state.firstName || !this.state.emailAddress || !this.state.roleId} onClick={() => this.saveMember()} class="btn btn-app py-1 px-4">Add Member</button>
                        </div>
                            : <><div style={{ width: "100%", textAlign: "center", display: this.state.showgroup ? "block" : "none" }}>
                                <button style={{ minWidth: "155px" }} type="reset" class="border-Button btn btn-outline btn-app px-4 py-1" onClick={() => this.handleClose()}>Cancel</button>
                                <button style={{ marginLeft: "4px", minWidth: "155px" }} disabled={!this.state.isdisablegroup} class="btn btn-app py-1 px-4" onClick={() => this.Nextgroup()}>Next </button>

                            </div>
                                <div style={{ width: "100%", textAlign: "center", display: this.state.showroles ? "block" : "none" }}>
                                    <button style={{ minWidth: "155px" }} type="reset" class="border-Button btn btn-outline btn-app px-4 py-1" onClick={() => this.handleClose()}>Cancel</button>
                                    <button style={{ marginLeft: "4px", minWidth: "155px" }} class="btn btn-app py-1 px-4" onClick={() => this.Addgroups()}>Next </button>

                                </div>
                            </>
                        }
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}

