import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Service from '../../Service/Service';
import { LineChart } from './LineChart';
import { TrainingChart } from './TrainingChart';
import $ from 'jquery';
import ProfileImage from '../Home/Profileimage'
import OverflowTip from '../Layout/OverflowTip';


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            imageurl: "img/ProfilePhoto.jpg",
            AccessToken: '',
            photoId: '',
            userid: '',
            DashBoardData: '',
            linechart_show: true,
            activeId: "1",
            mentorshipdata: "7",
            trainingdata: "7",
            showProfileImg: false,
            ProfileImgPopupHeader: '',
            id: '',
            chartHeight: 0
        }
    }
    componentDidMount() {
        const data = JSON.parse(localStorage.getItem("login_data"));
        this.setState({
            firstname: data.firstName,
            AccessToken: data.token,
            photoId: data.photoId,
            userid: data.id,
            id: data.id
        }, this.GetProfileByID)
    }

    GetProfileByID() {
        this.GetChatProviderKeys();
        var self = this;
        Service.Getprofiledata(self).then((res) => {
            self.setState({
                photoId: res.photoId
            }, self.GetImage)
        })
    }

    GetImage() {
        this.GetDashBoardData();
        var self = this;
        Service.GetImageService(this.state.AccessToken, this.state.photoId).then((res) => {
            var imagedata = res ? ("data:image/png;base64," + res) : '';
            if (imagedata != '') {
                this.setState({
                    imageurl: imagedata
                })
            }
        });
    }
    GetChatProviderKeys = () => {
        Service.GetChatProviderKeys(this.state.AccessToken).then((response => {
            localStorage.setItem("ChatProviderKeys", JSON.stringify(response));


        }))

    }
    GetDashBoardData() {
        var self = this;
        Service.GetDashBoardData(self).then((response) => {
            self.setState({
                DashBoardData: response
            })
        });
    }

    mentorshipdata(val) {
        if (this.state.activeId == 1) {
            this.setState({
                mentorshipdata: val
            })
        }
        else {
            this.setState({
                trainingdata: val
            })
        }
    }

    showprofileImg = () => {
        this.setState({
            showProfileImg: true, ProfileImgPopupHeader: 'Update Profile Image'
        });
    }

    closeprofileimg = (img) => {
        if (img) {
            this.setState({
                imageurl: img
            })
        }
        this.setState({ ProfileImgPopupHeader: '', showProfileImg: false });
    }

    getChartHeight = (val) => {
        if (val && val > 100 && this.state.chartHeight != val) {
            this.setState({
                chartHeight: val
            });
            $('#divRightSideTag').css({
                height: (val - 75) + 'px'
            });
            if (val > 115) {
                let h = (val - 115) / 3;
                $('#divPeopleMatchedTag').css({
                    height: h + 'px'
                });
                $('#divActiveMentorshipTag').css({
                    height: h + 'px'
                });
                $('#divTrainingCompleteTag').css({
                    height: h + 'px'
                });
                if (h >= 100) {
                    $('.home-chart-right-menu-content1').css({
                        paddingTop: 5 + '%'
                    });
                    $('.home-chart-right-menu-content2').css({
                        paddingTop: 5 + '%'
                    });
                }
            }
        }
    }

    render() {
        return (
            <div className="height-96 pt-1 px-lg-5 px-2">

                <div className="container">
                    <div className="home-name-main-content d-inline-flex align-items-center justify-content-between p-3 bg-color w-auto main-top-section radius-10">
                        <div className="ms-2 home-name-content">
                            <div className="home-ellipsis-content" style={{ fontSize: "36px", fontWeight: "700" }}>
                                <OverflowTip>
                                    Hello {this.state.firstname}!
                                </OverflowTip>
                            </div>
                            <div className="d-aligned-height" style={{ fontSize: "16px", fontWeight: "400" }}>
                                Let's Get Started
                            </div>
                        </div>
                        <div className='customize-profile-img'>
                            <a onClick={() => this.showprofileImg()}>
                                <img src={`${this.state.imageurl}`} alt="" className="profile-img " />
                            </a>.
                        </div>
                    </div>
                    <div className="text-dark" style={{ paddingTop: "15px", paddingBottom: "7px", fontSize: "18px", fontWeight: "700" }}>Get Started</div>
                    <div className="home-started-content d-inline-flex align-items-center justify-content-between bg-color radius-10  px-4 py-3">
                        <div className="text-dark " style={{ margin: "0px 0px 0px 0px", fontSize: '20px', width: "75%" }}>Create a Mentorship Program</div>
                        <button type="button" className="btn btn-app btn-md nowrap"><NavLink style={{ padding: "0px", color: '#ffffff', fontSize: "16px", lineHeight: "19.2px" }} tag={Link} to="/Ring">Create Program</NavLink></button>
                    </div>
                    <div className="row mt-3 pb-5">
                        <div className="col-lg-8 col-sm-4">
                            <div className="d-flex align-items-center">
                                <div style={{ width: "70%" }}>
                                    <ul className="nav flex-row d-flex">
                                        <li className="nav-item" style={{ width: "50%" }}>
                                            <NavLink style={{ paddingLeft: "0px" }} tag={Link} className={`nav-link   ${this.state.activeId === "1" ? "active" : "inactive"}`} aria-current="page" to="#"
                                                onClick={(e) => {
                                                    $('#sessiontime').prop('selectedIndex', 0);
                                                    this.setState({ linechart_show: true, activeId: "1", mentorshipdata: "7" });


                                                }}
                                            >
                                                
                                                <div className=" col-sm font-size-18px">Mentorship Sessions</div></NavLink>
                                        </li>
                                        <li className="nav-item" style={{ width: "50%", float: "right" }}>
                                            <NavLink tag={Link} className={`nav-link   ${this.state.activeId === "2" ? "active" : "inactive"}`} to="#"
                                                onClick={(e) => {

                                                    // $('#sessiontime').prop('selectedIndex',0);
                                                    // this.setState({ linechart_show: false, activeId: "2",trainingdata:"7" });



                                                }}>
                                                    
                                                <div className="d-none  d-sm-block col  font-size-18px">Training Sessions</div></NavLink>
                                        </li>
                                    </ul>
                                </div>
                                <div className=" custom-form-group home-ddl mt-3" >
                                    <select style={{ position: "absolute", right: "0px", top: "-32px", border: "none", width: "auto", backgroundColor: "#F5F5F7", borderRadius: "11.37px", fontWeight: "600" }} className="form-home form-select" id="sessiontime" onChange={(e) => this.mentorshipdata(e.target.value)}>
                                        <option value="7"> Weekly</option>
                                        <option value="30">Monthly</option>
                                        <option value="365">Yearly</option>
                                    </select>

                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-end" >
                                {/* <ul className="chat-legend">
                          <li className="ms-4 this-week">This Week</li>
                          <li className="ms-5 last-week">Last week</li>
                      </ul> */}
                            </div>
                            {this.state.linechart_show ? <LineChart filter={this.state.mentorshipdata} getChartHeight={this.getChartHeight} /> : <TrainingChart trainingsdata={this.state.trainingdata} />

                            }

                            {/*  <img src="img/chat.png" alt=""  width="100%"/>*/}
                        </div>
                        <div className="col-lg-4 col-sm-12" style={{ paddingTop: "6rem", float: "left" }}>
                            <div id="divRightSideTag" className="flex-column d-inline-flex home-chart-right-menu">
                                <div id="divPeopleMatchedTag" className="mb-3 bg-color radius-10 d-inline-flex flex-column  px-4 align-items-start">
                                    <div style={{ height: "50%"}} className="col-lg-12 col-sm-6 home-chart-right-menu-content1">{this.state.DashBoardData ? this.state.DashBoardData.peopleMatched : 0}</div>
                                    <div style={{ height: "50%" , }} className="col-lg-12 col-sm-6 font-medium home-chart-right-menu-content2">People Matched</div>
                                </div>
                                <div id="divActiveMentorshipTag" className="mb-3 bg-color radius-10 d-inline-flex flex-column  px-4 align-items-start">
                                    <div style={{ height: "50%" }} className="home-chart-right-menu-content1">{this.state.DashBoardData ? this.state.DashBoardData.activeMentorship : 0}</div>
                                    <div style={{ height: "50%" }} className="font-medium home-chart-right-menu-content2">Active Mentorships</div>
                                </div>
                                <div id="divTrainingCompleteTag" className="bg-color radius-10 d-inline-flex flex-column  px-4 align-items-start">
                                    <div style={{ height: "50%" }}  className="home-chart-right-menu-content1">{this.state.DashBoardData ? this.state.DashBoardData.trainingComplete : 0}</div>
                                    <div style={{ height: "50%" }} className="font-medium home-chart-right-menu-content2">Trainings Complete</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state != null && this.state.showProfileImg == true && (
                        <ProfileImage showProfileImg={this.state.showProfileImg} onCloseprofile={this.closeprofileimg}
                            popupHeader={this.state.ProfileImgPopupHeader} imageData={this.state.imageurl}></ProfileImage>
                    )
                }
            </div>
        );
    }
}
