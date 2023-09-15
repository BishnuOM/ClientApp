import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Service from '../../../Service/Service';
import AlertService from '../../../AlertService/Alert';
import { debounce } from "lodash";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'react-loading-skeleton/dist/skeleton.css'
import Loading from '../../Layout/Loading';
import OverflowTip from '../../Layout/OverflowTip';
import { ChatList } from './ChatList';
import ringActions from '../../../redux/actions/ringActions';


const mapStateToProps = (state) => {
    return {
        modal_name: state.modal.modal_name,
        ring_detail: state.ringReducer.ring_detail,
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    setring_detail: (payload) => dispatch(ringActions.setRingDetail(payload)),
  });


class RingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ringSearchText: '',
            userid: '',
            AccessToken: '',
            ringAllList: [],
            RingList: [],
            status: '',
            isShowPaging: false,
            selectedItems: [],
            photoId: '',
            isLoadedRing: false,
            isNameSortAsc: true,
            isMenteeSortAsc: true,
            isMentorSortAsc: true,
            isTypeSortAsc: true,
            isDesSortAsc: true,
            isStatusSortAsc: true,
            beforeSelectedCol: null,
            selectedCol: null,
            isLoading: true,
            rowCount: 8,
            ringchatId:[]
        }
    }
    componentDidMount() {
        var self = this;
        const data = JSON.parse(localStorage.getItem("login_data"));
        self.setState({
            userid: data.id,
            AccessToken: data.token,
        }, self.GetRingList)
    }

    async GetRingList() {
        Service.RingList(this.state).then((response => {
            response = response ? response : [];
            let tempData = [];
            let promises = [];
            this.setState({
                rowCount: response.length
            })
            response.map((result, index) => {
                result.isSelected = false;
                if (result.photoId) {
                    promises.push(Service.GetImageUri(this.state.AccessToken, result.photoId).then((response => {
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
                    ...this.state, RingList: tempData,
                    isLoading: false,
                    isLoadedRing: true,
                    isShowPaging: false,
                    ringAllList: tempData
                }, () => {
                    if (this.state.RingList && this.state.RingList.length) {
                        this.setRing();
                    }
                });
            });

        })).catch(function (error) {
            this.setState({
                isLoading: false
            })
        });
    }

    setRing(rows) {
        this.setState({
            isShowPaging: true
        })
        window.$('#RingTable').dataTable({
            "pageLength": 8,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "conditionalPaging": true,

            "columnDefs": [
                { "orderable": false, "targets": 0 },
                { "orderable": false, "targets": 1 },
                { "orderable": false, "targets": 2 },
                { "orderable": false, "targets": 3 },
                { "orderable": false, "targets": 4 },
                { "orderable": false, "targets": 5 },
                { "orderable": false, "targets": 6 },
                { "orderable": false, "targets": 7 },
                { "orderable": false, "targets": 8 }
            ],
        });
        if (!this.state.RingList || !this.state.RingList.length || this.state.RingList.length < 9) {
            window.$('.dataTables_paginate').hide();
        }
    }

    SelectRing(data, index, e) {
        if (data) {
            data.isSelected = data.isSelected ? false : true;
            let existData = this.state.selectedItems.filter(item => item.id == data.id);
            if (!data.isSelected && existData && existData.length) {
                this.setState({ selectedItems: this.state.selectedItems.filter(item => item.id != data.id) })
            }
            else if (data.isSelected && (!existData || !existData.length)) {
                this.state.selectedItems.push(data);
                this.setState({ selectedItems: this.state.selectedItems })
            }
        }
    }

    EditRing(ringId) {
        window.location.replace(`/Ring/${ringId}`);
    }
    MessageRing(data){
        localStorage.setItem('Ring_Detail',JSON.stringify(data));
        window.location.replace(`/ChatList/${data.id}`);
    }

    GetChats(){

    }

    deletering() {
        AlertService.warning().then((response) => {
            if (response.isConfirmed && response) {
                let ringIds = this.state.selectedItems.map((result, index) => {
                    return result.id;
                });
                Service.DeleteRings(this.state.AccessToken, this.state.userid, ringIds).then((response) => {
                    if (response) {
                        if (window.$('#RingTable').dataTable() && this.state.isShowPaging) {
                            window.$('#RingTable').dataTable().fnDestroy();
                        }
                        this.setState({ selectedItems: [] })
                        this.GetRingList();
                        AlertService.Success();
                    }
                });
            }
        });
    }

    searchRing(val) {
        this.debouncedRingSearch(val);
    }

    debouncedRingSearch = debounce(function (val) {
        if (this.state.isShowPaging && window.$('#RingTable').dataTable()) {
            window.$('#RingTable').dataTable().fnDestroy();
        }
        this.setState({
            ...this.state, ringSearchText: val,
            isShowPaging: false,
            RingList: []
        }, () => {
            this.setState({
                ...this.state, RingList:
                    (this.state.ringAllList.filter(item => !this.state.ringSearchText ||
                        (item.name && item.name.toLowerCase().includes(this.state.ringSearchText.toLowerCase()))
                        || (item.ringTypeName && item.ringTypeName.toLowerCase().includes(this.state.ringSearchText.toLowerCase()))
                        || (item.mentees >= 0 && ("" + item.mentees).toLowerCase().includes(this.state.ringSearchText.toLowerCase()))
                        || (item.mentors >= 0 && ("" + item.mentors).toLowerCase().includes(this.state.ringSearchText.toLowerCase()))
                        || (item.description && item.description.toLowerCase().includes(this.state.ringSearchText.toLowerCase()))))
            }, () => {
                if (this.state.RingList && this.state.RingList.length) {
                    this.setRing();
                }
            });
        });
    }, 800);

    isringMouseEnter(item, val, ind) {
        item.isMouseEnter = val;
        let RingList = [...this.state.RingList];
        RingList[ind] = item;
        this.setState({ RingList });
        
        this.props.setring_detail(item);
    }

    filterRing(name, mentee, mentor, type, status, description) {
        this.debouncedRingFilter(name, mentee, mentor, type, status, description);
    }

    debouncedRingFilter = debounce(function (name, mentee, mentor, type, status, description) {
        if (this.state.ringAllList && this.state.ringAllList.length) {
            if (this.state.isShowPaging && window.$('#RingTable').dataTable()) {
                window.$('#RingTable').dataTable().fnDestroy();
            }
            let query = this.state.ringAllList.filter(item => !name || (name && item.name && item.name.toLowerCase().includes(name.toLowerCase())));
            query = query.filter(item => !mentee || (mentee && item.mentees >= 0 && ("" + item.mentees).toLowerCase().includes(mentee.toLowerCase())));
            query = query.filter(item => !mentor || (mentor && item.mentors >= 0 && ("" + item.mentors).toLowerCase().includes(mentor.toLowerCase())));
            query = query.filter(item => !type || (type && item.ringTypeName && item.ringTypeName.toLowerCase().includes(type.toLowerCase())));
            query = query.filter(item => !description || (description && item.description && item.description.toLowerCase().includes(description.toLowerCase())));
            query = query.filter(item => !status || (status && ((item.status && ("Active").toLowerCase().includes(status.toLowerCase())) || (!item.status && ("Inactive").toLowerCase().includes(status.toLowerCase())))));
            this.setState({
                ...this.state,
                searchRingName: name,
                searchMentee: mentee,
                searchMentor: mentor,
                searchType: type,
                searchDescription: description,
                searchStatus: status,
                isShowPaging: false,
                RingList: []
            }, () => {
                this.setState({
                    ...this.state, RingList: query
                }, () => {
                    if (this.state.RingList && this.state.RingList.length) {
                        this.setRing();
                    }
                });
            });
        }
    }, 800);

    changeRingSortOrder = (isname, isMentee, isMentor, isType, isStatus, isDes, col) => {
        this.setState({
            selectedCol: col,
            isNameSortAsc: isname,
            isMenteeSortAsc: isMentee,
            isMentorSortAsc: isMentor,
            isTypeSortAsc: isType,
            isDesSortAsc: isDes,
            isStatusSortAsc: isStatus,
        }, () => {
            this.setRingTableOptions(col);
        });
    }

    setRingTableOptions = (col = null) => {
        if (col > 0 && this.state.RingList && this.state.RingList.length) {
            this.setState({
                RingList: this.state.RingList.sort((a, b) => {
                    return (col == 1 ? ((this.state.isNameSortAsc && (a.name > b.name) ? 1 : -1)
                        || (!this.state.isNameSortAsc && (a.name - b.name) ? -1 : 1)) :

                        col == 2 ? ((this.state.isMenteeSortAsc && (a.mentees > b.mentees) ? 1 : -1)
                            || (!this.state.isMenteeSortAsc && (a.mentees - b.mentees) ? -1 : 1)) :

                            col == 3 ? ((this.state.isMentorSortAsc && (a.mentors > b.mentors) ? 1 : -1)
                                || (!this.state.isMentorSortAsc && (a.mentors > b.mentors) ? -1 : 1)) :

                                col == 4 ? ((this.state.isTypeSortAsc && (a.ringTypeName > b.ringTypeName) ? 1 : -1)
                                    || (!this.state.isTypeSortAsc && (a.ringTypeName > b.ringTypeName) ? -1 : 1)) :

                                    col == 5 ? ((this.state.isDesSortAsc && (a.description > b.description) ? 1 : -1)
                                        || (!this.state.isDesSortAsc && (a.description > b.description) ? -1 : 1)) :

                                        ((this.state.isStatusSortAsc && ((a.status ? "Active" : "Inactive") > (b.status ? "Active" : "Inactive")) ? 1 : -1)
                                            || (!this.state.isStatusSortAsc && ((a.status ? "Active" : "Inactive") > (b.status ? "Active" : "Inactive")) ? -1 : 1))


                    );
                }),
                beforeSelectedCol: col
            });
        }
    }


    render() {
        const buttonEnabled = (this.state.selectedItems && this.state.selectedItems.length > 0);

        return (
            <div className="height-95 pt-3 px-5">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="fs-3 breadcrumb d-flex align-items-center  ">
                        <span className="" style={{fontSize:"28px"}}>Program</span>
                        {/* <span className="px-2 fs-3"><i className="bi bi-chevron-right"></i></span> */}
                        <span className="px-2 fs-3">&#62;</span>
                        <span className="text-dark font-bold" style={{fontSize:"28px"}}>Manage</span>
                        {/* {this.props.ring_detail?.name} */}
                    </div>
                </div>

                <div className="bg-color rounded p-2 d-flex align-items-center justify-content-between">
                    {this.state.isLoading ?
                        <Loading rowCount={1} isRow={true} columnCount={2} />
                        : <>
                            <div className="search d-inline-flex align-items-center ps-3 me-3 mentorBench-Search">
                                <i className="fas fa-search"></i>
                                <input type="text" className="font-size-20px form-control bg-transparent border-0 inputSearch" placeholder="Search"
                                    name="" onChange={(e) => this.searchRing(e.target.value)} />
                            </div>
                            <div className="list-actions d-flex align-items-center mentorBench-SearchButtons">
                                <NavLink tag={Link} to={`/Ring`}
                                    className="action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5 text-dark">
                                    <i className="bi bi-plus fs-3"></i><span className="font-size-20px">Add</span>
                                </NavLink>
                                {/* <NavLink tag={Link} to={`/Ring/${this.state.selectedItems && this.state.selectedItems.length == 1 ? this.state.selectedItems[0].id : ''}`} disabled={!isEnableEdit}
                            className={`action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5 ${isEnableEdit === true ? "enabledButton" : "disabledButton"}`}>
                            <i className="bi bi-pencil mx-1 fs-6"></i>  <span>Edit</span>
                        </NavLink> */}

                                <NavLink disabled={!buttonEnabled} onClick={() => this.deletering()}
                                    className={`action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5`}>
                                    <i className="bi bi-x fs-4 me-1"></i><span className="font-size-20px">Remove</span>
                                </NavLink>
                            </div>
                        </>
                    }
                </div>
                <div className="table-responsive mt-3 nav-menu-name">
                    {this.state.isLoading ?
                        <Loading rowCount={5} isRow={true} />
                        :
                        <table id="RingTable" className="table">
                            <thead>
                                <tr>
                                    <th className="selectBox" ref={(node) => { if (node) { node.style.setProperty("width", "6%", "important"); } }}></th>
                                    <th ref={(node) => { if (node) { node.style.setProperty("width", "17%", "important"); } }} >
                                        <Tippy content={<span>Program Name</span>}>
                                            <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" className="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                placeholder="Program Name"
                                                onChange={(e) => this.filterRing(e.target.value, this.state.searchMentee, this.state.searchMentor, this.state.searchType,
                                                    this.state.searchStatus, this.state.searchDescription)} />
                                        </Tippy>
                                        <div style={{ textAlign: "right", float: "right", color: this.state.selectedCol == 1 ? "black" : "gainsboro" }}>
                                            {this.state != null && (this.state.selectedCol != 1 || this.state.isNameSortAsc == true) ?
                                                <span onClick={() => this.changeRingSortOrder((this.state.selectedCol == 1 ? !this.state.isNameSortAsc : true),
                                                    this.state.isMenteeSortAsc, this.state.isMentorSortAsc, this.state.isTypeSortAsc,
                                                    this.state.isStatusSortAsc, this.state.isDesSortAsc, 1)} style={{ cursor: "pointer" }}>&#8593;</span>
                                                :
                                                <span onClick={() => this.changeRingSortOrder(!this.state.isNameSortAsc, this.state.isMenteeSortAsc,
                                                    this.state.isMentorSortAsc, this.state.isTypeSortAsc, this.state.isStatusSortAsc, this.state.isDesSortAsc, 1)} style={{ cursor: "pointer" }}>&#8595;</span>
                                            }
                                        </div>
                                    </th>
                                    <th ref={(node) => { if (node) { node.style.setProperty("width", "10%", "important"); } }} >
                                        <Tippy content={<span>Mentees</span>}>
                                            <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" className="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                placeholder="Mentees"
                                                onChange={(e) => this.filterRing(this.state.searchRingName, e.target.value, this.state.searchMentor, this.state.searchType,
                                                    this.state.searchStatus, this.state.searchDescription)} />
                                        </Tippy>
                                        <div style={{ width: "10%", textAlign: "right", float: "right", color: this.state.selectedCol == 2 ? "black" : "gainsboro" }}>
                                            {this.state != null && (this.state.selectedCol != 2 || this.state.isMenteeSortAsc == true) ?
                                                <span onClick={() => this.changeRingSortOrder(this.state.isNameSortAsc, (this.state.selectedCol == 2 ? !this.state.isMenteeSortAsc : true),
                                                    this.state.isMentorSortAsc, this.state.isTypeSortAsc,
                                                    this.state.isStatusSortAsc, this.state.isDesSortAsc, 2)} style={{ cursor: "pointer" }}>&#8593;</span>
                                                :
                                                <span onClick={() => this.changeRingSortOrder(this.state.isNameSortAsc, !this.state.isMenteeSortAsc,
                                                    this.state.isMentorSortAsc, this.state.isTypeSortAsc, this.state.isStatusSortAsc, this.state.isDesSortAsc, 2)} style={{ cursor: "pointer" }}>&#8595;</span>
                                            }
                                        </div>
                                    </th>
                                    <th ref={(node) => { if (node) { node.style.setProperty("width", "10%", "important"); } }} >
                                        <Tippy content={<span>Mentors</span>}>
                                            <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" className="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                placeholder="Mentors"
                                                onChange={(e) => this.filterRing(this.state.searchRingName, this.state.searchMentee, e.target.value, this.state.searchType,
                                                    this.state.searchStatus, this.state.searchDescription)} />
                                        </Tippy>
                                        <div style={{ width: "10%", textAlign: "right", float: "right", color: this.state.selectedCol == 3 ? "black" : "gainsboro" }}>
                                            {this.state != null && (this.state.selectedCol != 3 || this.state.isMentorSortAsc == true) ?
                                                <span onClick={() => this.changeRingSortOrder(this.state.isNameSortAsc, this.state.isMenteeSortAsc, (this.state.selectedCol == 3 ? !this.state.isMentorSortAsc : true),
                                                    this.state.isTypeSortAsc, this.state.isStatusSortAsc, this.state.isDesSortAsc, 3)} style={{ cursor: "pointer" }}>&#8593;</span>
                                                :
                                                <span onClick={() => this.changeRingSortOrder(this.state.isNameSortAsc, this.state.isMenteeSortAsc,
                                                    !this.state.isMentorSortAsc, this.state.isTypeSortAsc, this.state.isStatusSortAsc, this.state.isDesSortAsc, 3)} style={{ cursor: "pointer" }}>&#8595;</span>
                                            }
                                        </div>
                                    </th>
                                    <th ref={(node) => { if (node) { node.style.setProperty("width", "10%", "important"); } }} >
                                        <Tippy content={<span>Type</span>}>
                                            <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" className="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                placeholder="Type"
                                                onChange={(e) => this.filterRing(this.state.searchRingName, this.state.searchMentee, this.state.searchMentor, e.target.value,
                                                    this.state.searchStatus, this.state.searchDescription)} />
                                        </Tippy>
                                        <div style={{ width: "10%", textAlign: "right", float: "right", color: this.state.selectedCol == 4 ? "black" : "gainsboro" }}>
                                            {this.state != null && (this.state.selectedCol != 4 || this.state.isTypeSortAsc == true) ?
                                                <span onClick={() => this.changeRingSortOrder(this.state.isNameSortAsc, this.state.isMenteeSortAsc, this.state.isMentorSortAsc,
                                                    (this.state.selectedCol == 4 ? !this.state.isTypeSortAsc : true), this.state.isStatusSortAsc, this.state.isDesSortAsc, 4)} style={{ cursor: "pointer" }}>&#8593;</span>
                                                :
                                                <span onClick={() => this.changeRingSortOrder(this.state.isNameSortAsc, this.state.isMenteeSortAsc,
                                                    this.state.isMentorSortAsc, !this.state.isTypeSortAsc, this.state.isStatusSortAsc, this.state.isDesSortAsc, 4)} style={{ cursor: "pointer" }}>&#8595;</span>
                                            }
                                        </div>
                                    </th>
                                    <th ref={(node) => { if (node) { node.style.setProperty("width", "10%", "important"); } }} >
                                        <Tippy content={<span>Status</span>}>
                                            <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" className="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                placeholder="Status"
                                                onChange={(e) => this.filterRing(this.state.searchRingName, this.state.searchMentee, this.state.searchMentor, this.state.searchType, e.target.value,
                                                    this.state.searchDescription)} />
                                        </Tippy>
                                        <div style={{ width: "10%", textAlign: "right", float: "right", color: this.state.selectedCol == 5 ? "black" : "gainsboro" }}>
                                            {this.state != null && (this.state.selectedCol != 5 || this.state.isStatusSortAsc == true) ?
                                                <span onClick={() => this.changeRingSortOrder(this.state.isNameSortAsc, this.state.isMenteeSortAsc, this.state.isMentorSortAsc,
                                                    this.state.isTypeSortAsc, (this.state.selectedCol == 5 ? !this.state.isStatusSortAsc : true), this.state.isDesSortAsc, 5)} style={{ cursor: "pointer" }}>&#8593;</span>
                                                :
                                                <span onClick={() => this.changeRingSortOrder(this.state.isNameSortAsc, this.state.isMenteeSortAsc,
                                                    this.state.isMentorSortAsc, this.state.isTypeSortAsc, !this.state.isStatusSortAsc, this.state.isDesSortAsc, 5)} style={{ cursor: "pointer" }}>&#8595;</span>
                                            }
                                        </div>
                                    </th>
                                    <th ref={(node) => { if (node) { node.style.setProperty("width", "29%", "important"); } }} >
                                        <Tippy content={<span>Description</span>}>
                                            <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" className="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                placeholder="Description"
                                                onChange={(e) => this.filterRing(this.state.searchRingName, this.state.searchMentee, this.state.searchMentor, this.state.searchType,
                                                    this.state.searchStatus, e.target.value)} />
                                        </Tippy>
                                        <div style={{ width: "10%", textAlign: "right", float: "right", color: this.state.selectedCol == 6 ? "black" : "gainsboro" }}>
                                            {this.state != null && (this.state.selectedCol != 6 || this.state.isDesSortAsc == true) ?
                                                <span onClick={() => this.changeRingSortOrder(this.state.isNameSortAsc, this.state.isMenteeSortAsc, this.state.isMentorSortAsc,
                                                    this.state.isTypeSortAsc, this.state.isStatusSortAsc, (this.state.selectedCol == 6 ? !this.state.isDesSortAsc : true), 6)} style={{ cursor: "pointer" }}>&#8593;</span>
                                                :
                                                <span onClick={() => this.changeRingSortOrder(this.state.isNameSortAsc, this.state.isMenteeSortAsc,
                                                    this.state.isMentorSortAsc, this.state.isTypeSortAsc, this.state.isStatusSortAsc, !this.state.isDesSortAsc, 6)} style={{ cursor: "pointer" }}>&#8595;</span>
                                            }
                                        </div>
                                    </th>
                                    <th ref={(node) => { if (node) { node.style.setProperty("width", "4%", "important"); } }}></th>
                                    <th ref={(node) => { if (node) { node.style.setProperty("width", "4%", "important"); } }}></th>
                                </tr>
                            </thead>
                            <colgroup ref={(node) => { if (node) { node.style.setProperty("border-top", "none", "important"); } }}>
                                <col width="6%" />
                                <col width="17%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="29%" />
                                <col width="4%" />
                                <col width="4%" />
                            </colgroup>
                            <tbody>
                                {this.state.RingList.map((result, index) => {
                                    return (
                                        <tr className="SelectableRow" key={index + 1} onMouseEnter={() => this.isringMouseEnter(result, 1)} onMouseLeave={() => this.isringMouseEnter(result, 0)}>
                                            <td>
                                                <div className="form-check d-flex align-items-center">
                                                    <input className="form-check-input" type="checkbox" value={result.isSelected} checked={result.isSelected}
                                                        onChange={(e) => this.SelectRing(result, index, e)} />
                                                    {/* <div style={{ paddingLeft: "5px", paddingRight: "3px" }} className="d-flex align-items-center">
                                                        {result.imageurl ? (<div className="table-profile-name" style={{ lineHeight: "38px" }} >
                                                            <img src={result.imageurl} alt="" className="img-fluid p-2" />
                                                        </div>) : (<div className="table-profile-name">
                                                            {result.name && result.name.match(/\b(\w)/g) ? result.name.match(/\b(\w)/g).join('').toUpperCase() : result.name.toUpperCase()}
                                                        </div>)}
                                                    </div> */}

                                                        <div style={{ paddingLeft: "5px", paddingRight: "3px" }} className="d-flex align-items-center">
                                                        {result.imageurl ? (<div className="" style={{ lineHeight: "38px" }} >
                                                            <img src={result.imageurl} alt="" className="rounded-circle css_profile" />
                                                        </div>) : (<div  className="table-profile-name">
                                                            {result.name && result.name.match(/\b(\w)/g) ? result.name.match(/\b(\w)/g).join('').toUpperCase() : result.name.toUpperCase()}
                                                        </div>)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="ellipsis-content font-size-16px">
                                                <OverflowTip>
                                                    {result.name}
                                                </OverflowTip>
                                            </td>
                                            <td className="font-size-16px">{result.mentees}</td>
                                            <td className="font-size-16px">{result.mentors}</td>
                                            <td className="ellipsis-content font-size-16px">
                                                <OverflowTip>
                                                    {result.ringTypeName}
                                                </OverflowTip>
                                            </td>
                                            <td className="ellipsis-content font-size-16px">{result.status ? 'Active' : 'Inactive'}</td>
                                            <td className="ellipsis-content font-size-16px">
                                                <OverflowTip>
                                                    {result.description}
                                                </OverflowTip>
                                            </td>
                                            <td>
                                                {result.isMouseEnter === 1 && (
                                                    <img src="img/icons/Settings_light.svg" style={{cursor :"pointer"}} alt="image1" onClick={(e) => this.EditRing(result.id)} />
                                                )}
                                                </td>
                                            <td>
                                                {result.isMouseEnter === 1 && (
                                                    <img src="img/icons/message.svg" style={{cursor :"pointer"}} alt="image2" onClick={(e) => this.MessageRing(result)}   />
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}

                                {this.state.isLoadedRing && (!this.state.RingList || !this.state.RingList.length) && (
                                    <tr>
                                        <td colSpan="7">
                                            <div style={{ textAlign: "center" }}>
                                                ------ There is no rings ------
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }

                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RingList);