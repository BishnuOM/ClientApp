import React, { Component } from 'react';
import Service from '../../../Service/Service';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { debounce } from "lodash";
import AlertService from '../../../AlertService/Alert';
import Mentor from '../Mentor/Mentor';
import GroupMentor from '../Mentor/GroupMentor';
import Loader from '../../Layout/Loader';
import Loading from '../../Layout/Loading';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import OverflowTip from '../../Layout/OverflowTip';



export class MentorBench extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isShowPaging: false,
            mentors: [],
            mentorsAllList: [],
            mentorsSearchText: '',
            selectedItems: [],
            organizationdata: [],
            organizationgroupdata: [],
            options: [],
            showMentor: false,
            showMentors: false,
            mentorPopupHeader: '',
            mentorContent: null,
            isRequestExist: false,
            isNameSortAsc: true,
            isEmailSortAsc: true,
            isTitleSortAsc: true,
            isLocationSortAsc: true,
            isRingCountSortAsc: true,
            isMenteeCountSortAsc: true,
            isTimezoneSortAsc: true,
            isRequestSortAsc: true,
            beforeSelectedCol: null,
            selectedCol: null,
            isLoading: false,
            isPageLoading: false,
            showsearch: false,
            mentorSearchVal: '',
            searchedMentors: [],
            rowCount: 8
        }
        this.clickListener = this.clickListener.bind(this);
    }

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem("login_data"));
        this.setState({
            ...this.state, userId: data.id,
            accessToken: data.token,
        }, () => {
            if (this.state.userId && this.state.accessToken) {
                this.GetMentorsBench();
                if (localStorage.getItem('LogInType') === '0') {
                    this.setState({ showsearch: true },
                        () => {
                            this.GetOrganizationUser();
                            //this.GetOrganizationGroup();
                        }
                    )
                }
            }
        });
    }

    GetOrganizationUser() {
        Service.GetOrganizationUser().then((response) => {
            this.setState({
                ...this.state, organizationdata: response.value
            }, () => {
                let options = [...this.state.options];
                this.state.organizationdata.forEach((element) => {
                    options.push({
                        key: element.id,
                        value: element.id,
                        label: element.displayName,
                        givenName: element.givenName,
                        surName: element.surname,
                        mail: element.mail,
                        jobTitle: element.jobTitle,
                        isGroup: false,
                        city: '',
                        country: ''
                    })
                    this.setState({ options });
                })
            });
        })
    }

    GetOrganizationGroup() {
        Service.GetOrganizationGroup().then((response) => {
            this.setState({
                ...this.state, organizationgroupdata: response.value
            }, () => {
                let options = [...this.state.options];
                this.state.organizationgroupdata.forEach((element) => {
                    options.push({
                        key: element.id,
                        value: element.id,
                        label: element.displayName,
                        mailNickname: element.mailNickname,
                        isGroup: true
                    })
                    this.setState({ options });
                })
            });
        })
    }

    async GetMentorsBench() {
        this.setState({
            isLoading: true
        });
        if (this.state.isShowPaging && window.$('#tblMentorBench').dataTable()) {
            window.$('#tblMentorBench').dataTable().fnDestroy();
        }
        Service.GetMentorsBench(this.state.accessToken, this.state.userId).then((response => {
            response = response ? response : []
            this.setState({
                rowCount: response.length
            })
            let tempData = [];
            let promises = [];
            response.map((result, index) => {
                result.rowId = index + 1;
                result.isSelected = false;
                if (result.photoId) {
                    promises.push(Service.GetImageUri(this.state.accessToken, result.photoId).then((res => {
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
                    ...this.state, mentors: tempData, mentorsAllList: tempData,
                    isLoaded: true, isShowPaging: false, isLoading: false,
                    isRequestExist: tempData && tempData.length && tempData.filter(item => item.requestStatus == 1).length > 0 ? true : false,
                }, () => {
                    if (this.state.mentors && this.state.mentors.length) {
                        this.setPagination();
                    }
                });
            });
        })).catch(function (error) {
            this.setState({
                isLoading: false
            });
            alert(JSON.stringify(error));
        });
    }

    setPagination(pagelength = 8) {
        this.setState({
            isShowPaging: true
        })
        window.$('#tblMentorBench').dataTable({
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
                { "orderable": false, "targets": 7 },
                { "orderable": false, "targets": 8 },
            ]
        });
        if (!this.state.mentors || !this.state.mentors.length || this.state.mentors.length < 9) {
            window.$('.dataTables_paginate').hide();
        }
    }

    searchMentor(name, email, title, location, ringCount, menteeCount, timezone, request) {
        this.debouncedMentorSearch(name, email, title, location, ringCount, menteeCount, timezone, request);
    }

    debouncedMentorSearch = debounce(function (name, email, title, location, ringCount, menteeCount, timezone, request) {
        if (this.state.mentorsAllList && this.state.mentorsAllList.length) {
            if (this.state.isShowPaging && window.$('#tblMentorBench').dataTable()) {
                window.$('#tblMentorBench').dataTable().fnDestroy();
            }
            let query = this.state.mentorsAllList.filter(item => !name || (name && ((item.firstName && item.lastName && (item.firstName + " " + item.lastName).toLowerCase().includes(name.toLowerCase()))
                || (item.firstName && item.firstName.toLowerCase().includes(name.toLowerCase())) || (item.lastName && item.lastName.toLowerCase().includes(name.toLowerCase())))));
            query = query.filter(item => !email || (email && item.emailAddress && item.emailAddress.toLowerCase().includes(email.toLowerCase())));
            query = query.filter(item => !title || (title && item.title && item.title.toLowerCase().includes(title.toLowerCase())));
            query = query.filter(item => !location || (location && ((item.country && item.city && (item.country + " " + item.city).toLowerCase().includes(location.toLowerCase()))
                || (item.country && item.country.toLowerCase().includes(location.toLowerCase())) || (item.city && item.city.toLowerCase().includes(location.toLowerCase())))))
            query = query.filter(item => !ringCount || (ringCount && item.ringCount >= 0 && ("" + item.ringCount).toLowerCase().includes(ringCount.toLowerCase())));
            query = query.filter(item => !menteeCount || (menteeCount && item.menteesPerMentor >= 0 && ("" + item.menteesPerMentor).toLowerCase().includes(menteeCount.toLowerCase())));
            query = query.filter(item => !timezone || (timezone && item.timezone && item.timezone.toLowerCase().includes(timezone.toLowerCase())));
            query = query.filter(item => !request || (request && item.requestStatusName && item.requestStatusName.toLowerCase().includes(request.toLowerCase())));
            this.setState({
                ...this.state,
                searchFullName: name,
                searchEmail: email,
                searchTitle: title,
                searchLocation: location,
                searchRingCount: ringCount,
                searchMenteeCount: menteeCount,
                searchTimezone: timezone,
                searchRequest: request,
                isShowPaging: false,
                mentors: []
            }, () => {
                this.setState({
                    ...this.state, mentors: query
                }, () => {
                    if (this.state.mentors && this.state.mentors.length) {
                        this.setPagination();
                    }
                });
            });
        }
    }, 800);

    SelectMentorsBench(data, index, e) {
        if (data) {
            data.isSelected = data.isSelected ? false : true;
            let existData = this.state.selectedItems.filter(item => item.rowId == data.rowId);
            if (!data.isSelected && existData && existData.length) {
                this.setState({ selectedItems: this.state.selectedItems.filter(item => item.rowId != data.rowId) })
            }
            else if (data.isSelected && (!existData || !existData.length)) {
                let mentorData = JSON.parse(JSON.stringify(data));
                mentorData.isEdit = true;
                this.state.selectedItems.push(mentorData);
                this.setState({ selectedItems: this.state.selectedItems })
            }
        }
    }

    DeleteMentorsBench() {
        AlertService.confirmation_2("Are you sure?", "You won't be able to revert this!", "Mentor Only", "Mentor & Ring Member Also").then((response) => {
            if (response && (response.isConfirmed || response.isDenied)) {
                let mentors = [];
                let request = [];
                this.state.selectedItems.map((obj, ind) => {
                    if (obj.mentorBenchId) {
                        mentors.push(obj.mentorBenchId);
                    }
                    else if (obj.requestedId) {
                        request.push(obj.requestedId);
                    }
                });
                Service.DeleteMentorBench(this.state.accessToken, this.state.userId, mentors, request, response.isDenied).then((response) => {
                    if (response == true) {
                        this.GetMentorsBench();
                    }
                }).catch(function (error) {
                    this.setState({ selectedItems: [] });
                })
            }
            else {
                this.state.mentors.map((obj, ind) => {
                    obj.isSelected = false
                });
                this.setState({ mentors: this.state.mentors, filterMentors: this.state.mentors, selectedItems: [] });
            }
        });
    }

    closeMentor = (status = false) => {
        this.setState({ mentorPopupHeader: '', showMentor: status, mentorContent: null });
    }

    closeMentorGroup = (status = false) => {
        this.setState({ mentorPopupHeader: '', showMentors: status, mentorContent: null });
    }

    saveMentor = (isGroup = false) => {
        if (isGroup) {
            this.closeMentorGroup();
        }
        else {
            this.closeMentor();
        }
        this.GetMentorsBench();
    }

    showMentor(item, isSelected = false) {
        this.setState({ searchedMentors: [], mentorSearchVal: '' });

        if (isSelected && item.isGroup) {
            Service.GetGroupMembers(item.value).then((response) => {
                if (response && response.value && response.value.length) {
                    let groupMentors = []
                    response.value.forEach((element) => {
                        groupMentors.push({
                            userId: this.state.userId,
                            mentorId: '',
                            firstName: (element.givenName ? element.givenName : element.displayName),
                            lastName: element.surName,
                            emailAddress: element.mail,
                            title: element.jobTitle,
                            country: '',
                            city: '',
                            userRoleId: '3',
                            isOrgUser: true,
                        })
                        this.setState({ mentorContent: groupMentors, showMentors: true, mentorPopupHeader: 'Add Mentors' });
                    })
                }
            })
        }
        else {
            let popupItem = isSelected ? {
                userId: item.id ? item.id : '',
                firstName: item.givenName,
                lastName: item.surName,
                emailAddress: item.mail,
                title: item.jobTitle,
                country: item.country,
                city: item.city,
                userRoleId: '3',
                isOrgUser: true,
                isEdit: item.isEdit ? true : false
            } : item;
            this.setState({
                ...this.state,
                mentorContent: {
                    mentorId: popupItem.userId,
                    firstName: popupItem.firstName,
                    lastName: popupItem.lastName,
                    emailAddress: popupItem.emailAddress,
                    title: popupItem.title,
                    country: popupItem.country,
                    city: popupItem.city,
                    userRoleId: '3',
                    isOrgUser: true,
                    isEdit: popupItem.isEdit
                }
            }, () => {
                this.setState({ showMentor: true, mentorPopupHeader: popupItem.userId ? 'Edit Mentor' : 'Add Mentor' });
            });
        }
    }

    SendInviteAgain(item) {
        AlertService.confirmation('Confirmation', 'Are you sure you want to send invitation again?', 'warning', 'Yes').then((res) => {
            if (res && res.isConfirmed) {
                this.setState({
                    isPageLoading: true
                });
                Service.InviteAgainMentorRequest(this.state.accessToken, this.state.userId, item).then((response) => {
                    this.setState({
                        isPageLoading: false
                    });
                    if (response && response.isSend) {
                        AlertService.warningInfo("Information", "<span style = 'color:green',fontWeight: 'bold' >Mentor join request invitation sent again successfully.</span >", 'success').then((res1) => {
                            this.GetMentorsBench();
                        });
                    }
                }).catch(function (error) {
                    this.setState({
                        isPageLoading: false
                    });
                    alert(JSON.stringify(error));
                });
            }
        });
    }

    CancelMentorRequest(item) {
        AlertService.confirmation('Confirmation', 'Are you sure you want to cancel the invitation?', 'warning', 'Yes').then((res) => {
            if (res && res.isConfirmed) {
                this.setState({
                    isPageLoading: true
                });
                Service.CancelMentorRequest(this.state.accessToken, item.requestedId).then((response) => {
                    this.setState({
                        isPageLoading: false
                    });
                    if (response && response.isSend) {
                        AlertService.warningInfo("Information", "<span style = 'color:green',fontWeight: 'bold' >Mentor join request has been cancelled successfully.</span >", 'success').then((res1) => {
                            this.GetMentorsBench();
                        });
                    }
                }).catch(function (error) {
                    this.setState({
                        isPageLoading: false
                    });
                    alert(JSON.stringify(error));
                });
            }
        });
    }

    setMentorTableOptions = (col = null) => {
        if (col > 0 && this.state.mentors && this.state.mentors.length) {
            this.setState({
                mentors: this.state.mentors.sort((a, b) => {
                    return (col == 1 ? ((this.state.isNameSortAsc && (((a.firstName + ' ' + a.lastName) > (b.firstName + ' ' + b.lastName)) ? 1 : -1))
                        || (!this.state.isNameSortAsc && (((a.firstName + ' ' + a.lastName) > (b.firstName + ' ' + b.lastName)) ? -1 : 1))) :

                        col == 2 ? ((this.state.isEmailSortAsc && (a.emailAddress > b.emailAddress) ? 1 : -1)
                            || (!this.state.isEmailSortAsc && (a.emailAddress - b.emailAddress) ? -1 : 1)) :

                            col == 3 ? ((this.state.isTitleSortAsc && (a.title > b.title) ? 1 : -1)
                                || (!this.state.isTitleSortAsc && (a.title > b.title) ? -1 : 1)) :

                                col == 4 ? ((this.state.isLocationSortAsc && (((a.country + ' ' + a.city) > (b.country + ' ' + b.city)) ? 1 : -1))
                                    || (!this.state.isLocationSortAsc && (((a.country + ' ' + a.city) > (b.country + ' ' + b.city)) ? -1 : 1))) :

                                    col == 5 ? ((this.state.isRingCountSortAsc && (a.ringCount > b.ringCount) ? 1 : -1)
                                        || (!this.state.isRingCountSortAsc && (a.ringCount > b.ringCount) ? -1 : 1)) :

                                        col == 6 ? ((this.state.isMenteeCountSortAsc && (a.menteesPerMentor > b.menteesPerMentor) ? 1 : -1)
                                            || (!this.state.isMenteeCountSortAsc && (a.menteesPerMentor > b.menteesPerMentor) ? -1 : 1)) :

                                            col == 7 ? ((this.state.isTimezoneSortAsc && (a.timezone > b.timezone) ? 1 : -1)
                                                || (!this.state.isTimezoneSortAsc && (a.timezone > b.timezone) ? -1 : 1)) :

                                                ((this.state.isRequestSortAsc && (a.requestStatusName > b.requestStatusName) ? 1 : -1)
                                                    || (!this.state.isRequestSortAsc && (a.requestStatusName - b.requestStatusName) ? -1 : 1)));
                }),
                beforeSelectedCol: col
            });
        }
    }

    changeMentorSortOrder = (isname, isEmail, isTitle, isLocation, isRingCount, isMenteeCount, isTimezone, col, isRequest = null) => {
        this.setState({
            selectedCol: col,
            isNameSortAsc: isname,
            isEmailSortAsc: isEmail,
            isTitleSortAsc: isTitle,
            isLocationSortAsc: isLocation,
            isRingCountSortAsc: isRingCount,
            isMenteeCountSortAsc: isMenteeCount,
            isTimezoneSortAsc: isTimezone,
            isRequestSortAsc: isRequest != null ? isRequest : this.state.isRequestSortAsc
        }, () => {
            this.setMentorTableOptions(col);
        });
    }

    searchNewMentor(val) {
        this.setState({
            mentorSearchVal: val,
        })
        this.debouncedNewMentorSearch(val);
    }

    debouncedNewMentorSearch = debounce(function (val) {
        if (this.state.isListenerAdded) {
            window.removeEventListener('click', this.clickListener);
        }
        this.setState({
            ...this.state,
            isListenerAdded: false,
            searchedMentors: []
        }, () => {
            if (val && val.length > 1) {
                let tempMember = (this.state.options.filter(sitem => (sitem.label && sitem.label.toLowerCase().includes(val.toLowerCase()))));
                let tempMembers = [];
                Service.getSearchedUser(this.state.accessToken, val).then((response) => {
                    if (response && response.length) {
                        tempMember.map((item, ind) => {
                            if (item.mail) {
                                let filteredItem = (response.filter(sitem => (sitem.mail && sitem.mail.toLowerCase().includes(item.mail.toLowerCase()))));
                                if (!filteredItem || !filteredItem.length) {
                                    tempMembers.push(item);
                                }
                            }
                        });
                        tempMember = tempMembers.concat(response);
                    }
                    this.getUserPhoto(tempMember);
                }).catch(function (error) {
                    this.getUserPhoto(tempMember);
                })
            }
        });
    }, 700);

    getUserPhoto(datas) {
        let tempData = [];
        let promises = [];
        datas.map((result, index) => {
            if (result.photoId) {
                promises.push(Service.GetImageUri(this.state.accessToken, result.photoId).then((response => {
                    result.imageurl = response;
                    tempData.push(result);
                })));
            }
            else {
                tempData.push(result);
            }
        });
        Promise.all(promises).then(() => {
            this.setState({
                ...this.state, searchedMentors: tempData,
            }, () => {
                if (this.state.searchedMentors && this.state.searchedMentors.length) {
                    window.addEventListener('click', this.clickListener);
                    this.setState({
                        isListenerAdded: true,
                    })
                }
            });
        });
    }

    clickListener(e) {
        if (this.state.isListenerAdded) {
            this.setState({
                ...this.state,
                isListenerAdded: false,
            }, () => {
                this.setState({ searchedMentors: [] });
                window.removeEventListener('click', this.clickListener);
            });
        }
    }


    isMouseEnter(item, val) {
        item.isMouseEnter = val;
    }

    onImageInvalid(item) {
        item.imageurl = '';
        this.setState({
            searchedMentors: this.state.searchedMentors.map(el => (el.id === item.id ? { ...el, item } : el))
        });
    }

    render() {
        const buttonEnabled = (this.state.selectedItems && this.state.selectedItems.length > 0);
        const isEnableEdit = (this.state.selectedItems && this.state.selectedItems.length == 1);
        return (
            <div class="height-95 pt-5 px-5">
                <Loader isLoading={this.state.isPageLoading}></Loader>
                <div class="breadcrumb d-flex align-items-center fs-3 text-dark mb-4">
                    <span class="fs-3">Programs</span>
                    <span class="px-2 fs-3">&#62;</span>
                    <span class="fs-3 font-bold">Mentors Bench</span>
                </div>
                <div class="bg-color rounded p-2 d-flex align-items-center justify-content-between">
                    {this.state != null && this.state.showsearch == true && (
                        <div class="search d-inline-flex align-items-center ps-3 me-3 mentorBench-Search">
                            <i class="fas fa-search"></i>
                            <input type="text" class="form-control bg-transparent border-0 inputSearch" placeholder="Search"
                                name="" value={this.state.mentorSearchVal} onChange={(e) => this.searchNewMentor(e.target.value)} />
                        </div>
                    )}

                    <div style={{ marginLeft: (this.state.showsearch == true ? "0%" : "60%") }} class="list-actions d-flex align-items-center mentorBench-SearchButtons">
                        {this.state.isLoading ?
                            <Loading rowCount={1} isRow={true} columnCount={2} />
                            : <>
                                <NavLink onClick={() => this.showMentor({})}
                                    className="action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5 text-dark">
                                    <i className="bi bi-plus fs-3"></i><span>Add</span>
                                </NavLink>
                                <NavLink onClick={() => this.showMentor(this.state.selectedItems[0])} disabled={!isEnableEdit}
                                    className={`action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5 ${isEnableEdit === true ? "enabledButton" : "disabledButton"}`}>
                                    <i className="bi bi-pencil mx-1 fs-6"></i>  <span>Edit</span>
                                </NavLink>
                                <NavLink disabled={!buttonEnabled} onClick={() => this.DeleteMentorsBench()}
                                    className={`action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5`}>
                                    <i className="bi bi-x fs-4 me-1"></i><span>Remove</span>
                                </NavLink>
                            </>
                        }
                    </div>
                </div>
                {this.state != null && this.state.searchedMentors && this.state.searchedMentors.length > 0 && (
                    <div className="dropdown">
                        {this.state.searchedMentors.map((item, index) => (
                            <div key={index + 1} onClick={() => this.showMentor(item, true)}
                                className={item.isMouseEnter ? 'custom-dropdown-item dl-mouse-over-item d-flex align-items-center' : 'custom-dropdown-item d-flex align-items-center'}
                                onMouseEnter={() => this.isMouseEnter(item, true)} onMouseLeave={() => this.isMouseEnter(item, false)}>
                                {item.imageurl ? (<div className="" style={{ lineHeight: "38px" }} >
                                    <img src={item.imageurl} alt="" onError={() => this.onImageInvalid(item)} class="rounded-circle css_profile_cell" />
                                </div>) : (<div className="table-cell-profile-name">
                                    {item.label && item.label.match(/\b(\w)/g) ? item.label.match(/\b(\w)/g).join('').toUpperCase() : item.label.toUpperCase()}
                                </div>)}
                                <div>
                                    <span style={{ float: "left", width: "100%" }} className="fs-6 ps-3 ring_color">{item.label}</span>
                                    <span className="custom-dropdown-item-mail ps-3 ring_color">{item.mail}</span>
                                </div>
                            </div>
                        ))}

                        {/*{this.state.searchedMentors.map((item) => (*/}
                        {/*    <div onMouseEnter={() => this.isMouseEnter(item, true)} onMouseLeave={() => this.isMouseEnter(item, false)}*/}
                        {/*        className={item.isMouseEnter ? 'custom-dropdown-item dl-mouse-over-item' : 'custom-dropdown-item'}*/}
                        {/*        key={item.value} onClick={() => this.showMentor(item, true)}> {item.label}</div>*/}
                        {/*))}*/}
                    </div>
                )}

                <div class="table-responsive mt-3">
                    {this.state.isLoading ?
                        <Loading rowCount={5} isRow={true} />
                        :
                        <table id="tblMentorBench" className="table" data-searching="false" data-ordering="false">
                            <thead>
                                <tr>
                                    <th className="selectBox" ref={(node) => { if (node) { node.style.setProperty("width", "6%", "important"); } }}></th>
                                    <th id="thName" ref={(node) => { if (node) { node.style.setProperty("width", "14%", "important"); } }}>
                                        <Tippy content={<span> Name</span>}>
                                            <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" class="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                placeholder="Name"
                                                onChange={(e) => this.searchMentor(e.target.value, this.state.searchEmail, this.state.searchTitle, this.state.searchLocation,
                                                    this.state.searchRingCount, this.state.searchMenteeCount, this.state.searchTimezone, this.state.searchRequest)} />
                                        </Tippy>
                                        <div style={{ width: "10%", textAlign: "right", float: "right", color: this.state.selectedCol == 1 ? "black" : "gainsboro" }}>
                                            {this.state != null && (this.state.selectedCol != 1 || this.state.isNameSortAsc == true) && (
                                                <span onClick={() => this.changeMentorSortOrder((this.state.selectedCol == 1 ? !this.state.isNameSortAsc : true),
                                                    this.state.isEmailSortAsc, this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRingCountSortAsc,
                                                    this.state.isMenteeCountSortAsc, this.state.isTimezoneSortAsc, 1,
                                                    this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                                            )}
                                            {this.state != null && this.state.isNameSortAsc != true && this.state.selectedCol == 1 && (
                                                <span onClick={() => this.changeMentorSortOrder(!this.state.isNameSortAsc, this.state.isEmailSortAsc,
                                                    this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRingCountSortAsc, this.state.isMenteeCountSortAsc,
                                                    this.state.isTimezoneSortAsc, 1, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                                            )}
                                        </div>
                                    </th>
                                    <th id="thEmail" ref={(node) => { if (node) { node.style.setProperty("width", "13%", "important"); } }}>
                                        <Tippy content={<span>Email</span>}>
                                            <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" class="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                placeholder="Email"
                                                onChange={(e) => this.searchMentor(this.state.searchFullName, e.target.value, this.state.searchTitle, this.state.searchLocation,
                                                    this.state.searchRingCount, this.state.searchMenteeCount, this.state.searchTimezone, this.state.searchRequest)} />
                                        </Tippy>
                                        <div style={{ width: "10%", textAlign: "right", float: "right", color: this.state.selectedCol == 2 ? "black" : "gainsboro" }}>
                                            {this.state != null && (this.state.selectedCol != 2 || this.state.isEmailSortAsc == true) && (
                                                <span onClick={() => this.changeMentorSortOrder(this.state.isNameSortAsc, (this.state.selectedCol == 2 ? !this.state.isEmailSortAsc : true),
                                                    this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRingCountSortAsc,
                                                    this.state.isMenteeCountSortAsc, this.state.isTimezoneSortAsc, 2,
                                                    this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                                            )}
                                            {this.state != null && this.state.isEmailSortAsc != true && this.state.selectedCol == 2 && (
                                                <span onClick={() => this.changeMentorSortOrder(this.state.isNameSortAsc, !this.state.isEmailSortAsc,
                                                    this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRingCountSortAsc, this.state.isMenteeCountSortAsc,
                                                    this.state.isTimezoneSortAsc, 2, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                                            )}
                                        </div>
                                    </th>
                                    <th id="thTitle" ref={(node) => { if (node) { node.style.setProperty("width", "10%", "important"); } }}>
                                        <Tippy content={<span>Title</span>}>
                                            <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" class="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                placeholder="Title"
                                                onChange={(e) => this.searchMentor(this.state.searchFullName, this.state.searchEmail, e.target.value, this.state.searchLocation,
                                                    this.state.searchRingCount, this.state.searchMenteeCount, this.state.searchTimezone, this.state.searchRequest)} />
                                        </Tippy>
                                        <div style={{ width: "10%", textAlign: "right", float: "right", color: this.state.selectedCol == 3 ? "black" : "gainsboro" }}>
                                            {this.state != null && (this.state.selectedCol != 3 || this.state.isTitleSortAsc == true) && (
                                                <span onClick={() => this.changeMentorSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, (this.state.selectedCol == 3 ? !this.state.isTitleSortAsc : true),
                                                    this.state.isLocationSortAsc, this.state.isRingCountSortAsc,
                                                    this.state.isMenteeCountSortAsc, this.state.isTimezoneSortAsc, 3,
                                                    this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                                            )}
                                            {this.state != null && this.state.isTitleSortAsc != true && this.state.selectedCol == 3 && (
                                                <span onClick={() => this.changeMentorSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc,
                                                    !this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRingCountSortAsc, this.state.isMenteeCountSortAsc,
                                                    this.state.isTimezoneSortAsc, 3, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                                            )}
                                        </div>
                                    </th>
                                    <th id="thLocation" ref={(node) => { if (node) { node.style.setProperty("width", "10%", "important"); } }}>
                                        <Tippy content={<span>Location</span>}>
                                            <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" class="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                placeholder="Location"
                                                onChange={(e) => this.searchMentor(this.state.searchFullName, this.state.searchEmail, this.state.searchTitle, e.target.value,
                                                    this.state.searchRingCount, this.state.searchMenteeCount, this.state.searchTimezone, this.state.searchRequest)} />
                                        </Tippy>
                                        <div style={{ width: "10%", textAlign: "right", float: "right", color: this.state.selectedCol == 4 ? "black" : "gainsboro" }}>
                                            {this.state != null && (this.state.selectedCol != 4 || this.state.isLocationSortAsc == true) && (
                                                <span onClick={() => this.changeMentorSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc,
                                                    (this.state.selectedCol == 4 ? !this.state.isLocationSortAsc : true), this.state.isRingCountSortAsc,
                                                    this.state.isMenteeCountSortAsc, this.state.isTimezoneSortAsc, 4,
                                                    this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                                            )}
                                            {this.state != null && this.state.isLocationSortAsc != true && this.state.selectedCol == 4 && (
                                                <span onClick={() => this.changeMentorSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc,
                                                    this.state.isTitleSortAsc, !this.state.isLocationSortAsc, this.state.isRingCountSortAsc, this.state.isMenteeCountSortAsc,
                                                    this.state.isTimezoneSortAsc, 4, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                                            )}
                                        </div>
                                    </th>
                                    <th id="thNoOfRing" ref={(node) => { if (node) { node.style.setProperty("width", "11%", "important"); } }}>
                                        <Tippy content={<span>Number Of Programs</span>}>
                                            <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" class="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                placeholder="No Of Programs"
                                                onChange={(e) => this.searchMentor(this.state.searchFullName, this.state.searchEmail, this.state.searchTitle,
                                                    this.state.searchLocation, e.target.value, this.state.searchMenteeCount, this.state.searchTimezone, this.state.searchRequest)} />
                                        </Tippy>
                                        <div style={{ width: "10%", textAlign: "right", float: "right", color: this.state.selectedCol == 5 ? "black" : "gainsboro" }}>
                                            {this.state != null && (this.state.selectedCol != 5 || this.state.isRingCountSortAsc == true) && (
                                                <span onClick={() => this.changeMentorSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc,
                                                    this.state.isLocationSortAsc, (this.state.selectedCol == 5 ? !this.state.isRingCountSortAsc : true),
                                                    this.state.isMenteeCountSortAsc, this.state.isTimezoneSortAsc, 5,
                                                    this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                                            )}
                                            {this.state != null && this.state.isRingCountSortAsc != true && this.state.selectedCol == 5 && (
                                                <span onClick={() => this.changeMentorSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc,
                                                    this.state.isTitleSortAsc, this.state.isLocationSortAsc, !this.state.isRingCountSortAsc, this.state.isMenteeCountSortAsc,
                                                    this.state.isTimezoneSortAsc, 5, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                                            )}
                                        </div>
                                    </th>
                                    <th id="thNoOfMentees" ref={(node) => { if (node) { node.style.setProperty("width", "11%", "important"); } }}>
                                        <Tippy content={<span>Number Of Mentees</span>}>
                                            <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" class="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                placeholder="No Of Mentees"
                                                onChange={(e) => this.searchMentor(this.state.searchFullName, this.state.searchEmail, this.state.searchTitle,
                                                    this.state.searchLocation, this.state.searchRingCount, e.target.value, this.state.searchTimezone, this.state.searchRequest)} />
                                        </Tippy>
                                        <div style={{ width: "10%", textAlign: "right", float: "right", color: this.state.selectedCol == 6 ? "black" : "gainsboro" }}>
                                            {this.state != null && (this.state.selectedCol != 6 || this.state.isMenteeCountSortAsc == true) && (
                                                <span onClick={() => this.changeMentorSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc,
                                                    this.state.isLocationSortAsc, this.state.isRingCountSortAsc, (this.state.selectedCol == 6 ? !this.state.isMenteeCountSortAsc : true),
                                                    this.state.isTimezoneSortAsc, 6, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                                            )}
                                            {this.state != null && this.state.isMenteeCountSortAsc != true && this.state.selectedCol == 6 && (
                                                <span onClick={() => this.changeMentorSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc,
                                                    this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRingCountSortAsc, !this.state.isMenteeCountSortAsc,
                                                    this.state.isTimezoneSortAsc, 6, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                                            )}
                                        </div>
                                    </th>
                                    <th id="thTimeZone" ref={(node) => { if (node) { node.style.setProperty("width", "10%", "important"); } }}>
                                        <Tippy content={<span>Time Zone</span>}>
                                            <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" class="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                placeholder="Time Zone"
                                                onChange={(e) => this.searchMentor(this.state.searchFullName, this.state.searchEmail, this.state.searchTitle,
                                                    this.state.searchLocation, this.state.searchRingCount, this.state.searchMenteeCount, e.target.value, this.state.searchRequest)} />
                                        </Tippy>
                                        <div style={{ width: "10%", textAlign: "right", float: "right", color: this.state.selectedCol == 7 ? "black" : "gainsboro" }}>
                                            {this.state != null && (this.state.selectedCol != 7 || this.state.isTimezoneSortAsc == true) && (
                                                <span onClick={() => this.changeMentorSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc,
                                                    this.state.isLocationSortAsc, this.state.isRingCountSortAsc, this.state.isMenteeCountSortAsc,
                                                    (this.state.selectedCol == 7 ? !this.state.isTimezoneSortAsc : true), 7, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                                            )}
                                            {this.state != null && this.state.isTimezoneSortAsc != true && this.state.selectedCol == 7 && (
                                                <span onClick={() => this.changeMentorSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc,
                                                    this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRingCountSortAsc, this.state.isMenteeCountSortAsc,
                                                    !this.state.isTimezoneSortAsc, 7, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                                            )}
                                        </div>
                                    </th>
                                    <th id="thRequestStatus" ref={(node) => { if (node) { node.style.setProperty("width", "15%", "important"); } }}>
                                        <Tippy content={<span>Request Status</span>}>
                                            <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" class="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                placeholder="Request Status"
                                                onChange={(e) => this.searchMentor(this.state.searchFullName, this.state.searchEmail, this.state.searchTitle,
                                                    this.state.searchLocation, this.state.searchRingCount, this.state.searchMenteeCount, this.state.searchTimezone, e.target.value)} />
                                        </Tippy>
                                        <div style={{ width: "10%", textAlign: "right", float: "right", color: this.state.selectedCol == 8 ? "black" : "gainsboro" }}>
                                            {this.state != null && (this.state.selectedCol != 8 || this.state.isRequestSortAsc == true) && (
                                                <span onClick={() => this.changeMentorSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc,
                                                    this.state.isLocationSortAsc, this.state.isRingCountSortAsc, this.state.isMenteeCountSortAsc, this.state.isTimezoneSortAsc,
                                                    8, (this.state.selectedCol == 8 ? !this.state.isRequestSortAsc : true))} style={{ cursor: "pointer" }}>&#8593;</span>
                                            )}
                                            {this.state != null && this.state.isRequestSortAsc != true && this.state.selectedCol == 8 && (
                                                <span onClick={() => this.changeMentorSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc,
                                                    this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRingCountSortAsc, this.state.isMenteeCountSortAsc,
                                                    this.state.isTimezoneSortAsc, 8, !this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                                            )}
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <colgroup ref={(node) => { if (node) { node.style.setProperty("border-top", "none", "important"); } }}>
                                <col width="6%" />
                                <col width="14%" />
                                <col width="13%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="11%" />
                                <col width="11%" />
                                <col width="10%" />
                                <col width="15%" />
                            </colgroup>
                            <tbody>
                                {this.state.mentors.map((result, index) => {
                                    return (
                                        <tr key={index + 1}>
                                            <td>
                                                <div class="form-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value={result.isSelected} checked={result.isSelected}
                                                        onChange={(e) => this.SelectMentorsBench(result, index, e)} />

                                                    <div style={{ paddingLeft: "5px", paddingRight: "3px" }} className="d-flex align-items-center">
                                                        {result.imageurl ? (<div className="" style={{ lineHeight: "38px" }} >
                                                            <img src={result.imageurl} alt="" class="rounded-circle css_profile" />
                                                        </div>) : (<div className="table-profile-name">
                                                            {(result.firstName + ' ' + result.lastName) && (result.firstName + ' ' + result.lastName).match(/\b(\w)/g) ? (result.firstName + ' ' + result.lastName).match(/\b(\w)/g).join('').toUpperCase() : (result.firstName + ' ' + result.lastName).toUpperCase()}
                                                        </div>)}
                                                    </div>
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
                                                    {result.title}
                                                </OverflowTip>
                                            </td>
                                            <td className="ellipsis-content">
                                                <OverflowTip>
                                                    {result.country && result.city ? (result.country + ' - ' + result.city) : (result.country + ' ' + result.city)}
                                                </OverflowTip>
                                            </td>
                                            <td>{result.ringCount}</td>
                                            <td>{result.menteesPerMentor}</td>
                                            <td className="ellipsis-content">
                                                <OverflowTip>
                                                    {result.timezone}
                                                </OverflowTip>
                                            </td>
                                            <td>
                                                {result.requestStatus == 1 && (
                                                    <>
                                                        <span className="status-invite">{result.requestStatusName}</span>
                                                        <Tippy content={<span>Invite Again</span>}>
                                                            <button onClick={() => this.SendInviteAgain(result)} className="send-request"><i style={{ color: "white" }} class="fa fa-send-o"></i></button>
                                                        </Tippy>
                                                        <Tippy content={<span>Cancel Invite</span>}>
                                                            <button onClick={() => this.CancelMentorRequest(result)} className="cancel-request"><i style={{ color: "white" }} class="fa fa-close"></i></button>
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

                                {this.state.isLoaded && (!this.state.mentors || !this.state.mentors.length) && (
                                    <tr>
                                        <td colSpan="9">
                                            <div style={{ textAlign: "center" }}>
                                                ------ There is no mentors ------
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
                </div>

                {this.state != null && this.state.showMentor == true && (
                    <Mentor showMentor={this.state.showMentor} onCloseMentor={this.closeMentor} popupHeader={this.state.mentorPopupHeader}
                        popupContent={this.state.mentorContent} onSaveMentor={this.saveMentor}></Mentor>
                )}

                {this.state != null && this.state.showMentors == true && (
                    <GroupMentor popUpSize={'xl'} showMentors={this.state.showMentors} onCloseMentor={this.closeMentorGroup} popupHeader={this.state.mentorPopupHeader}
                        popupContent={this.state.mentorContent} onSaveMentor={this.saveMentor}></GroupMentor>
                )}
            </div>
        )
    }
}