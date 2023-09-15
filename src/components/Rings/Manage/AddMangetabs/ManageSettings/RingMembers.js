import React, { Component } from 'react';
import Tippy from '@tippyjs/react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import UserTooltip from '../../UserTooltip';
import OverflowTip from '../../../../Layout/OverflowTip';
import Tooltip from '../../../../Layout/Tooltip';
import Service from '../../../../../Service/Service';
import AlertService from '../../../../../AlertService/Alert';
import { ExportReactCSV } from '../../ExportReactCSV';
import Member from '../../../Member/Member';
import GroupMember from '../../../Member/GroupMember'
export default class RingMembers extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            userid: props.data.id,
            AccessToken: props.data.token,
            ringid: props.data.ringid,
            ringMembers: [],
            filterRingMembers: [],
            searchedMembers: [],
            activeId: "1",
            showSetting: true,
            showMembers: false,
            showmatching: false,
           
            ringname: '',
            description: '',
            ispublic: true,
            isprivate: false,
            range: [4, 10],
            interest: [],
            values: [],
            showMember: false,
            memberPopupHeader: '',
            memberPopupContent: null,
            showgroupMember: false,
            groupmemberPopupHeader: '',
            photoId: '',
            ringImage: '',
            imagedata: 'img/profile.svg',
            status: true,
            organizationdata: [],
            organizationgroupdata: [],
            showdropdown: false,
            options: [],
            existMembers: [],
            serachvalue: '',
            isNameSortAsc: true,
            isEmailSortAsc: true,
            isTitleSortAsc: true,
            isLocationSortAsc: true,
            isRoleSortAsc: true,
            isRequestSortAsc: true,
            isRequestExist: false,
            beforeSelectedCol: null,
            selectedCol: null,
            groupuserdata: [],
            groupmemberdata: [],
            rolememberId: '',
            filedata: '',
            showsearch: false,
            isLoading: false,
            isShowPaging: false,
            showTooltip: false,
            ringRoles: [{
                id: '1',
                name: 'Mentee'
            }, {
                id: '2',
                name: 'Mentor'
            }, {
                id: '3',
                name: 'Admin'
            }]
        }
    }
    componentDidMount(){
        const { description} = this.props;
        debugger
        var self = this;
        self.setState({
            userid: this.props.data.userid,
            AccessToken: this.props.data.AccessToken,
            ringid: this.props.data.ringid
        }
        ,
            () => {
                self.GetRingMembers()
            }
        )
        
    }

    GetRingMembers() { 
        if (this.state.isShowPaging && window.$('#tblRingMembers').dataTable()) {
            window.$('#tblRingMembers').dataTable().fnDestroy();
        }
        Service.GetRingMembersByRingId(this.state.AccessToken, this.state.ringid).then((response) => {
            response = response ? response : [];
            this.FetchRingMemberData(response);
        }).catch(function (error) {
            alert(JSON.stringify(error));
        });
    }

    FetchRingMemberData(response) {
        response = response ? response : [];
        let tempData = [];
        let promises = [];
        response.map((result, index) => {
            result.isSelected = false;
            result.roleId = result.roleId ? "" + result.roleId : result.roleId;
            if (result.photoId) {
                promises.push(Service.GetImageUri(this.state.AccessToken, result.photoId).then((res => {
                    result.imageurl = res;
                    tempData.push(result);
                })));
            }
            else {
                tempData.push(result);
            }
        });

        Promise.all(promises).then(() => {
            this.setState({
                filterRingMembers: tempData,
                ringMembers: tempData,
                isRequestExist: tempData && tempData.length && tempData.filter(item => item.requestStatus == 1).length > 0 ? true : false,
                isLoadedMember: true,
                mentees: tempData.filter(item => item.roleId == 1).length,
                mentors: tempData.filter(item => item.roleId == 2).length,
            }, () => {
                if (this.state.ringMembers && this.state.ringMembers.length > 8) {
                    this.setPagination();
                }
                this.changeMemberSortOrder(true, true, true, true, true, 1, true);
            });
        });
    }

    setPagination(pagelength = 8) {
        this.setState({
            isShowPaging: true
        })
        window.$('#tblRingMembers').dataTable({
            "pageLength": pagelength,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "columnDefs": [
                { "orderable": false, "targets": 0 },
                { "orderable": false, "targets": 1 },
                { "orderable": false, "targets": 2 },
                { "orderable": false, "targets": 3 },
                { "orderable": false, "targets": 4 },
                { "orderable": false, "targets": 5 },
                { "orderable": false, "targets": 6 },
            ]
        });
    }

    changeMemberSortOrder = (isname, isEmail, isTitle, isLocation, isRole, col, isRequest = null) => {
        this.setState({
            selectedCol: col,
            isNameSortAsc: isname,
            isEmailSortAsc: isEmail,
            isTitleSortAsc: isTitle,
            isLocationSortAsc: isLocation,
            isRoleSortAsc: isRole,
            isRequestSortAsc: isRequest != null ? isRequest : this.state.isRequestSortAsc
        }, () => {
            this.setMemberTableOptions(col);
        });
    }

    setMemberTableOptions = (col = null) => {
        if (col >= 0 && this.state.ringMembers && this.state.ringMembers.length) {
            if (this.state.isShowPaging && window.$('#tblRingMembers').dataTable()) {
                window.$('#tblRingMembers').dataTable().fnDestroy();
            }
            this.setState({
                ringMembers: this.state.ringMembers.sort((a, b) => {
                    return (col == 1 ? ((this.state.isNameSortAsc && (((a.firstName + ' ' + a.lastName) > (b.firstName + ' ' + b.lastName)) ? 1 : -1))
                        || (!this.state.isNameSortAsc && (((a.firstName + ' ' + a.lastName) > (b.firstName + ' ' + b.lastName)) ? -1 : 1))) :

                        col == 2 ? ((this.state.isEmailSortAsc && (a.emailAddress > b.emailAddress) ? 1 : -1)
                            || (!this.state.isEmailSortAsc && (a.emailAddress - b.emailAddress) ? -1 : 1)) :

                            col == 3 ? ((this.state.isTitleSortAsc && (a.designation > b.designation) ? 1 : -1)
                                || (!this.state.isTitleSortAsc && (a.designation > b.designation) ? -1 : 1)) :

                                col == 4 ? ((this.state.isLocationSortAsc && (((a.country + ' ' + a.city) > (b.country + ' ' + b.city)) ? 1 : -1))
                                    || (!this.state.isLocationSortAsc && (((a.country + ' ' + a.city) > (b.country + ' ' + b.city)) ? -1 : 1))) :

                                    col == 5 ? ((this.state.isRoleSortAsc && (a.roleName > b.roleName) ? 1 : -1)
                                        || (!this.state.isRoleSortAsc && (a.roleName > b.roleName) ? -1 : 1)) :

                                        ((this.state.isRequestSortAsc && (a.requestStatusName > b.requestStatusName) ? 1 : -1)
                                            || (!this.state.isRequestSortAsc && (a.requestStatusName - b.requestStatusName) ? -1 : 1)));
                }),
                beforeSelectedCol: col,
                isShowPaging: false,
            }, () => {
                if (this.state.ringMembers && this.state.ringMembers.length > 8) {
                    this.setPagination();
                }
            });
        }
    }

    isMemberMouseEnter(item, val, ind) {
        item.isMouseEnter = val;
        let ringMembers = [...this.state.ringMembers];
        ringMembers[ind] = item;
        this.setState({ ringMembers });
    }
    SendRingRequest(item) {
        AlertService.confirmation('Confirmation', 'Are you sure you want to send invitation again?', 'warning', 'Yes').then((res) => {
            if (res && res.isConfirmed) {
                this.setState({
                    isLoading: true
                });
                let postItem = JSON.stringify(item);
                postItem = JSON.parse(postItem);
                postItem.ringName = this.state.ringname;
                Service.InviteAgainRingRequest(this.state.AccessToken, this.state.userid, postItem).then((response) => {
                    if (response && response.isSend) {
                        AlertService.warningInfo("Ring Request Invitation", "<span style = 'font-family: Myriad Pro;font-style: normal;font-weight: 400;font-size: 16px;line-height: 24px;text-align: center;'>An email notification has been sent to " + postItem.emailAddress + ". Once they accept, they will be added to the ring.</span >", 'success').then((res) => {
                            this.GetRingMembers();
                        });
                    }
                    this.setState({
                        isLoading: false
                    });
                }).catch(function (error) {
                    this.setState({
                        isLoading: false
                    });
                    alert(JSON.stringify(error));
                });
            }
        });
    }

    CancelRingRequest(item) {
        AlertService.confirmation('Confirmation', 'Are you sure you want to cancel the invitation?', 'warning', 'Yes').then((res) => {
            if (res && res.isConfirmed) {
                Service.CancelRingRequest(this.state.AccessToken, item.ringRequestedId).then((response) => {
                    if (response && response.isSend) {
                        AlertService.warningInfo("Information", "<span style = 'color:green',fontWeight: 'bold' >Ring member join request has been cancelled successfully.</span >", 'success').then((res) => {
                            this.GetRingMembers();
                        });
                    }
                }).catch(function (error) {
                    alert(JSON.stringify(error));
                });
            }
        });
    }

    showMember = (data, isSelected = false) => {
        debugger
        this.setState({ searchedMembers: [], serachvalue: '' });
        this.setState({
            memberPopupContent: {
                ringId: this.state.ringid,
                memberId: data.id ? data.id : '',
                firstName: data.givenName ? data.givenName : data.label,
                lastName: data.surName,
                emailAddress: data.mail,
                title: data.jobTitle,
                country: data.country,
                city: data.city,
                roleId: '1',
                userRoleId: '3',
                isOrgUser: true,
                isSelectedUser: isSelected,
                imagedata: data.imageurl
            }, showMember: true, memberPopupHeader: 'Add Member'
        });
    }
    closeMember = (status = false) => {
        this.setState({ memberPopupHeader: '', showMember: status, memberPopupContent: null });
    }

    closeGroupMember = (status = false) => {
        this.setState({ groupmemberdata: [], showgroupMember: status, groupmemberPopupHeader: '' });
    }

    saveMember = (memberData) => {
        this.GetRingMembers();
        this.closeMember();
        this.closeGroupMember();
    }

    SelectRingMember(data, index, e) {
        if (data) {
            this.state.selectedMemberItems = this.state.selectedMemberItems ? this.state.selectedMemberItems : [];
            data.isSelected = data.isSelected ? false : true;
            let existData = this.state.selectedMemberItems.filter(item => item.id == data.id);
            if (!data.isSelected && existData && existData.length) {
                this.setState({ selectedMemberItems: this.state.selectedMemberItems.filter(item => item.id != data.id) })
            }
            else if (data.isSelected && (!existData || !existData.length)) {
                this.state.selectedMemberItems.push(data);
                this.setState({ selectedMemberItems: this.state.selectedMemberItems })
            }
        }
    }

    deleteRingMember() {
        AlertService.warning().then((response) => {
            debugger
            if (response && response.isConfirmed) {
                let members = [];
                let request = [];
                this.state.selectedMemberItems.map((obj, ind) => {
                    if (obj.id) {
                        members.push(obj.id);
                    }
                    else if (obj.ringRequestedId) {
                        request.push(obj.ringRequestedId);
                    }
                });
                Service.DeleteRingMember(this.state.AccessToken, this.state.userid, this.state.ringid, members, request).then((response) => {
                    if (response != false) {
                        this.state.ringMembers.map((obj, ind) => {
                            obj.isSelected = false
                        });
                        this.setState({
                            selectedMemberItems: [],
                            isRequestExist: response && response.length && response.filter(item => item.requestStatus == 1).length > 0 ? true : false,
                            ringMembers: response ? response : [],
                            filterRingMembers: response ? response : [],
                        });
                    }
                }).catch(function (error) {
                    this.setState({ selectedMemberItems: [] });
                })
            }
            else {
                this.state.ringMembers.map((obj, ind) => {
                    obj.isSelected = false
                });
                this.setState({ ringMembers: this.state.ringMembers, filterRingMembers: this.state.ringMembers, selectedMemberItems: [] });
            }
        });
    }


  render() {
    const buttonEnabled = (this.state.selectedMemberItems && this.state.selectedMemberItems.length > 0);
    return (
      <div>
        <div className='member_header'>Add members to your program. Internal members can be added using the search bar. To add external members, click the ‘Add’ button. </div>
                            <div className="bg-color rounded p-2 d-flex align-items-center justify-content-between" style={{marginTop: "2rem"}}>

                                {this.state != null && this.state.showsearch === true && (
                                    <div className="mentorBench-Search search d-inline-flex align-items-center ps-3 me-3">
                                        <i className="fas fa-search"></i>
                                        <input type="text" className="form-control bg-transparent border-0 inputSearch" placeholder="Search"
                                            name="" value={this.state.serachvalue} onChange={(e) => this.searchNewMember(e.target.value)} />
                                    </div>
                                )}

                                <div style={{ marginLeft: (this.state.showsearch == true ? "0%" : "60%") }} className="list-actions d-flex align-items-center mentorBench-SearchButtons">
                                    <a onClick={() => this.showMember({})}
                                        className="action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5 text-dark">
                                        <i className="bi bi-plus fs-3"></i>
                                        <span className="font-size-20px" style={{ marginLeft: "-5px"}}>Add</span>
                                    </a>
                                    <NavLink style={{ marginLeft: "10px", maxWidth: "100px", paddingLeft: "0px", paddingRight:"0px" }} disabled={!buttonEnabled} onClick={() => this.deleteRingMember()}
                                        className={`action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5`}>
                                        <i className="bi bi-x fs-4 me-1"></i><span className="font-size-20px" style={{ marginLeft: "-8px"}}>Delete</span>
                                    </NavLink>
                                    <a className="action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5 text-dark " style={{ marginLeft: "10px", marginRight:"10px", fontFamily: "font-light", minWidth: "175px" }}>
                                        <i className="fa fa-upload icon-members_export" style={{ fontSize: "18px" }} >
                                            <input
                                                type={"file"}
                                                id={"csvFileInput"}
                                                accept={".csv"}
                                                onChange={this.handleOnChange}
                                            />
                                        </i>
                                        <span className='members_export font-size-20px' style={{paddingLeft: "3px" }}>Import Members</span>
                                    </a>
                                    <ExportReactCSV  />
                                </div>
                            </div>
                          
                            {this.state != null && this.state.searchedMembers && this.state.searchedMembers.length > 0 && (
                                <div className="dropdown">
                                    {this.state.searchedMembers.map((item, index) => (
                                        <div key={index + 1} onClick={() => this.showMember(item, true)}
                                            className={item.isMouseEnter ? 'custom-dropdown-item dl-mouse-over-item d-flex align-items-center' : 'custom-dropdown-item d-flex align-items-center'} onMouseEnter={() => this.isMouseEnter(item, true)} onMouseLeave={() => this.isMouseEnter(item, false)}>
                                            {item.imageurl ? (<div className="" style={{ lineHeight: "38px" }} >
                                                <img src={item.imageurl} alt="" onError={() => this.onImageInvalid(item)} className="rounded-circle css_profile_cell" />
                                            </div>) : (<div className="table-cell-profile-name">
                                                {item.label && item.label.match(/\b(\w)/g) ? item.label.match(/\b(\w)/g).join('').toUpperCase() : item.label.toUpperCase()}
                                            </div>)}
                                            <div>
                                                <span style={{ float: "left", width: "100%" }} className="fs-6 ps-3 ring_color">{item.label}</span>
                                                <span className="custom-dropdown-item-mail ps-3 ring_color">{item.mail}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
        <div className="table-responsive mt-3">

     <table className="table" id="tblRingMembers">
    <thead>
        <tr>
            <th className="selectBox" ref={(node) => { if (node) { node.style.setProperty("width", "6%", "important"); } }}></th>
            <th ref={(node) => { if (node) { node.style.setProperty("width", "17%", "important"); } }}>
                <Tippy content={<span>Full Name</span>}>
                    <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" className="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                        placeholder="Full Name"
                        onChange={(e) => this.searchRingMember(e.target.value, this.state.searchEmail, this.state.searchTitle, this.state.searchLocation, this.state.searchRole, this.state.searchRequest)} />
                </Tippy>
                <div style={{ width: "10%", float: "right", textAlign: "right", color: this.state.selectedCol == 1 ? "black" : "gainsboro" }}>
                    {this.state != null && (this.state.selectedCol != 1 || this.state.isNameSortAsc == true) && (
                        <span onClick={() => this.changeMemberSortOrder((this.state.selectedCol == 1 ? !this.state.isNameSortAsc : true), this.state.isEmailSortAsc, this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRoleSortAsc, 1, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                    )}
                    {this.state != null && this.state.isNameSortAsc != true && this.state.selectedCol == 1 && (
                        <span onClick={() => this.changeMemberSortOrder(!this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRoleSortAsc, 1, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                    )}
                </div>
            </th>
            <th ref={(node) => { if (node) { node.style.setProperty("width", "17%", "important"); } }}>
                <Tippy content={<span>Email</span>}>
                    <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" className="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                        placeholder="Email"
                        onChange={(e) => this.searchRingMember(this.state.searchFullName, e.target.value, this.state.searchTitle, this.state.searchLocation, this.state.searchRole, this.state.searchRequest)} />
                </Tippy>
                <div style={{ width: "10%", float: "right", textAlign: "right", color: this.state.selectedCol == 2 ? "black" : "gainsboro" }}>
                    {this.state != null && (this.state.selectedCol != 2 || this.state.isEmailSortAsc == true) && (
                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, (this.state.selectedCol == 2 ? !this.state.isEmailSortAsc : true), this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRoleSortAsc, 2, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                    )}
                    {this.state != null && this.state.isEmailSortAsc != true && this.state.selectedCol == 2 && (
                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, !this.state.isEmailSortAsc, this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRoleSortAsc, 2, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                    )}
                </div>
            </th>
            <th ref={(node) => { if (node) { node.style.setProperty("width", "16%", "important"); } }}>
                <Tippy content={<span>Title</span>}>
                    <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" className="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                        placeholder="Title"
                        onChange={(e) => this.searchRingMember(this.state.searchFullName, this.state.searchEmail, e.target.value, this.state.searchLocation, this.state.searchRole, this.state.searchRequest)} />
                </Tippy>
                <div style={{ width: "10%", float: "right", textAlign: "right", color: this.state.selectedCol == 3 ? "black" : "gainsboro" }}>
                    {this.state != null && (this.state.selectedCol != 3 || this.state.isTitleSortAsc == true) && (
                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, (this.state.selectedCol == 3 ? !this.state.isTitleSortAsc : true), this.state.isLocationSortAsc, this.state.isRoleSortAsc, 3, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                    )}
                    {this.state != null && this.state.isTitleSortAsc != true && this.state.selectedCol == 3 && (
                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, !this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRoleSortAsc, 3, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                    )}
                </div>
            </th>
            <th ref={(node) => { if (node) { node.style.setProperty("width", "16%", "important"); } }}>
                <Tippy content={<span>Location</span>}>
                    <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" className="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                        placeholder="Location"
                        onChange={(e) => this.searchRingMember(this.state.searchFullName, this.state.searchEmail, this.state.searchTitle, e.target.value, this.state.searchRole, this.state.searchRequest)} />
                </Tippy>
                <div style={{ width: "10%", float: "right", textAlign: "right", color: this.state.selectedCol == 4 ? "black" : "gainsboro" }}>
                    {this.state != null && (this.state.selectedCol != 4 || this.state.isLocationSortAsc == true) && (
                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc, (this.state.selectedCol == 4 ? !this.state.isLocationSortAsc : true), this.state.isRoleSortAsc, 4, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                    )}
                    {this.state != null && this.state.isLocationSortAsc != true && this.state.selectedCol == 4 && (
                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc, !this.state.isLocationSortAsc, this.state.isRoleSortAsc, 4, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                    )}
                </div>
            </th>
            <th ref={(node) => { if (node) { node.style.setProperty("width", "10%", "important"); } }}>
                <Tippy content={<span>Role</span>}>
                    <input autoComplete="none" type="text" className="ellipsis-header ring-role-input table-header-input form-control bg-transparent border-0 inputSearch"
                        placeholder="Role"
                        onChange={(e) => this.searchRingMember(this.state.searchFullName, this.state.searchEmail, this.state.searchTitle, this.state.searchLocation, e.target.value, this.state.searchRequest)} />
                </Tippy>
                <div style={{ width: "10%", float: "right", textAlign: "right", color: this.state.selectedCol == 5 ? "black" : "gainsboro" }}>
                    {this.state != null && (this.state.selectedCol != 5 || this.state.isRoleSortAsc == true) && (
                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc, this.state.isLocationSortAsc, (this.state.selectedCol == 5 ? !this.state.isRoleSortAsc : true), 5, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                    )}
                    {this.state != null && this.state.isRoleSortAsc != true && this.state.selectedCol == 5 && (
                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc, this.state.isLocationSortAsc, !this.state.isRoleSortAsc, 5, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                    )}
                </div>
            </th>
            <th ref={(node) => { if (node) { node.style.setProperty("width", "18%", "important"); } }}>
                <Tippy content={<span>Request Status</span>}>
                    <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" className="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                        placeholder="Request Status"
                        onChange={(e) => this.searchRingMember(this.state.searchFullName, this.state.searchEmail, this.state.searchTitle, this.state.searchLocation, this.state.searchRole, e.target.value)} />
                </Tippy>
                <div style={{ width: "10%", float: "right", textAlign: "right", color: this.state.selectedCol == 6 ? "black" : "gainsboro" }}>
                    {this.state != null && (this.state.selectedCol != 6 || this.state.isRequestSortAsc == true) && (
                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRoleSortAsc, 6, (this.state.selectedCol == 6 ? !this.state.isRequestSortAsc : true))} style={{ cursor: "pointer" }}>&#8593;</span>
                    )}
                    {this.state != null && this.state.isRequestSortAsc != true && this.state.selectedCol == 6 && (
                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRoleSortAsc, 6, !this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                    )}
                </div>
            </th>
        </tr>
    </thead>
    <colgroup ref={(node) => { if (node) { node.style.setProperty("border-top", "none", "important"); } }}>
        <col width="6%" />
        <col width="17%" />
        <col width="17%" />
        <col width="16%" />
        <col width="16%" />
        <col width="10%" />
        <col width="18%" />
    </colgroup>
    <tbody>
        {this.state.ringMembers.map((result, index) => {
            return (
                <tr key={index + 1} onMouseEnter={() => this.isMemberMouseEnter(result, 1, index)} onMouseLeave={() => this.isMemberMouseEnter(result, 0, index)}>
                    <td>
                        <div className="form-check d-flex align-items-center">
                            <input className="form-check-input" type="checkbox" value={result.isSelected} checked={result.isSelected}
                                onChange={(e) => this.SelectRingMember(result, index, e)} />

                            <Tooltip content={<UserTooltip user={result} userindex={index} />} direction="top">
                                <div style={{ paddingLeft: "5px", paddingRight: "3px" }} className="d-flex align-items-center">
                                    {result.imageurl ? (<div className="" style={{ lineHeight: "38px" }} >
                                        <img src={result.imageurl} alt="" className="rounded-circle css_profile" />
                                    </div>) : (<div className="table-profile-name">
                                        {(result.firstName + ' ' + result.lastName).match(/\b(\w)/g) ? (result.firstName + ' ' + result.lastName).match(/\b(\w)/g).join('').toUpperCase() : (result.firstName + ' ' + result.lastName)}
                                    </div>)}
                                </div>
                            </Tooltip>
                        </div>
                    </td>
                    <td className="ellipsis-content">
                        <OverflowTip>
                            {result.firstName + ' ' + result.lastName}
                        </OverflowTip>
                    </td>
                    <td className="ellipsis-content">
                        <OverflowTip>
                            {result.emailAddress}
                        </OverflowTip>
                    </td>
                    <td className="ellipsis-content">
                        <OverflowTip>
                            {result.designation}
                        </OverflowTip>
                    </td>
                    <td className="ellipsis-content">
                        <OverflowTip>
                            {result.country && result.city ? (result.country + ' - ' + result.city) : (result.country + ' ' + result.city)}
                        </OverflowTip>
                    </td>
                    <td className="ellipsis-content">
                        {result.isMouseEnter == 1 && (
                            <select className='ring-role-select' defaultValue={result.roleId} onChange={(e) => this.onChangeInput(e, result, index)} >
                                <option value="2">Mentor</option>
                                <option value="1">Mentee</option>
                                <option value="3">Admin</option>
                            </select>
                        )}
                        {result.isMouseEnter != 1 && (
                            <OverflowTip>
                                <span style={{ paddingLeft: "9px" }}>{result.roleName}</span>
                            </OverflowTip>
                        )}
                    </td>
                    <td>
                        {result.requestStatus == 1 && (
                            <>
                                <span className="status-invite">{result.requestStatusName}</span>
                                <Tippy content={<span>Invite Again</span>}>
                                    <button onClick={() => this.SendRingRequest(result)} className="send-request"><i style={{ color: "white" }} className="fa fa-send-o"></i></button>
                                </Tippy>
                                <Tippy content={<span>Cancel Invite</span>}>
                                    <button onClick={() => this.CancelRingRequest(result)} className="cancel-request"><i style={{ color: "white" }} className="fa fa-close"></i></button>
                                </Tippy>
                            </>
                        )}
                        {result.requestStatus != 1 && (
                            <span className="status-accept">Accepted</span>
                        )}
                    </td>
                </tr>
            )
        })}
        {this.state.isLoadedMember && (!this.state.ringMembers || !this.state.ringMembers.length) && (
            <tr key="1">
                <td colSpan="7">
                    <div style={{ textAlign: "center" }}>
                        ------ There is no program members ------
                    </div>
                </td>
            </tr>
        )}
    </tbody>
</table>

        </div> 

        {
                    this.state != null && this.state.showMember == true && (
                        <Member showMember={this.state.showMember} onCloseMember={this.closeMember} popupHeader={this.state.memberPopupHeader}
                            popupContent={this.state.memberPopupContent} onSaveMember={this.saveMember}></Member>
                    )
                }

                {
                    this.state != null && this.state.showgroupMember == true && (
                        <GroupMember showgroupMember={this.state.showgroupMember} oncloseGroupMember={this.closeGroupMember} popupHeader={this.state.groupmemberPopupHeader}
                            popupContent={this.state.groupmemberdata} onSaveMember={this.saveMember}></GroupMember>
                    )
                }
      </div>
    )
  }
}
