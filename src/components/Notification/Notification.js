import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import Service from '../../Service/Service';
import Moment from 'moment';
import Swal from "sweetalert2";
import Confirmation from '../Layout/Confirmation';
import Loading from '../Layout/Loading';

export class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accessToken: '',
            userId: '',
            NotificationData: [],
            showConfirmation: false,
            confirmationMsg: '',
            deleteNotificationData: null,
            isLoading: true,
        }
    }

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem("login_data"));
        this.setState({
            accessToken: data.token,
            userId: data.id,
        }, this.getnotification)
    }

    getnotification() {
        var self = this;
        Service.GetNotificationData(self).then((response) => {
            if (response && response.length) {
                let finalObj = []
                response.forEach((item) => {
                    let day = new Date(item.createDate).getDate() + "/" + (new Date(item.createDate).getMonth() + 1) + "/" + new Date(item.createDate).getFullYear()
                    let currentDate = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();
                    let dayName = day == currentDate ? "Today" : day == ((new Date().getDate() - 1) + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()) ? "Yesterday" : Moment(item.createDate).format('DD/MM/YYYY');
                    let data = finalObj.filter(sitem => sitem.day == day);
                    if (data && data.length) {
                        finalObj.filter(sitem => sitem.day == day).map((result, index) => {
                            result.data.push(item);
                        });
                    }
                    else {
                        finalObj.push({ day: day, dayName: dayName, data: [item] });
                    }
                })

                self.setState({
                    NotificationData: finalObj,
                })
            }
            self.setState({
                isLoading: false
            })
        });

    }

    RemoveNotification = (item) => {
        this.setState({ deleteNotificationData: item, showConfirmation: true, confirmationMsg: 'Do you really want to delete?' });
    };

    confirmDelete = () => {
        if (this.state.deleteNotificationData) {
            var self = this;
            Service.DeleteNotificationData(self, this.state.deleteNotificationData).then((response) => {
                self.getnotification();
            }).catch(function (error) {
                Swal.fire(
                    "error" + "" + '!',
                )
            });
        }
        this.setState({ deleteNotificationData: null, showConfirmation: false, confirmationMsg: '' });
    }

    closeConfirmation = (status) => {
        this.setState({ deleteNotificationData: null, showConfirmation: false, confirmationMsg: '' });
    }

    render() {
        return (
            <Fragment>
                <div class="card-body">
                    <div class="fs-4 font-medium text-dark notification_header" >Notifications
                    </div>
                    {this.state.isLoading ?
                        <>
                            <div style={{ float: "left", width: "100%" }}>
                                <div style={{ float: "left", width: "60px" }}>
                                    <Loading isCircle={true} height={55} width={55} />
                                </div>
                                <div style={{ float: "left", width: "85%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                            </div>
                            <div style={{ float: "left", width: "100%" }}>
                                <div style={{ float: "left", width: "60px" }}>
                                    <Loading isCircle={true} height={55} width={55} />
                                </div>
                                <div style={{ float: "left", width: "85%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                            </div>
                            <div style={{ float: "left", width: "100%" }}>
                                <div style={{ float: "left", width: "60px" }}>
                                    <Loading isCircle={true} height={55} width={55} />
                                </div>
                                <div style={{ float: "left", width: "85%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                            </div>
                            <div style={{ float: "left", width: "100%" }}>
                                <div style={{ float: "left", width: "60px" }}>
                                    <Loading isCircle={true} height={55} width={55} />
                                </div>
                                <div style={{ float: "left", width: "85%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                            </div>
                            <div style={{ float: "left", width: "100%" }}>
                                <div style={{ float: "left", width: "60px" }}>
                                    <Loading isCircle={true} height={55} width={55} />
                                </div>
                                <div style={{ float: "left", width: "85%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                            </div>
                        </>
                        : <>
                            {this.state.NotificationData.map((item, index) => {
                                return (
                                    <div key={index + 1}>
                                        <div style={{ fontWeight: "bold", fontSize: "20px", paddingTop: "25px", paddingBottom: "20px", paddingLeft: "10px" }}>
                                            {item.dayName}</div>

                                        {item.data.map((result, ind) => {
                                            return (
                                                <div key={ind + 1}>
                                                    <div style={{ width: "90%", display: "flex", borderBottom: "none" }} className="custom-dropdown-item d-flex align-items-center">
                                                        {result.photoUrl ? (
                                                            <img style={{ width: "55px", height: "55px", borderRadius: "100%" }} src={result.photoUrl} alt="" class="img-icon" />
                                                        ) : (<div className="table-cell-profile-name">
                                                            {result.userName && result.userName.match(/\b(\w)/g) ? result.userName.match(/\b(\w)/g).join('').toUpperCase() : result.userName.toUpperCase()}
                                                        </div>)}
                                                        <div>
                                                            <span style={{ float: "left", width: "100%" }} className="fs-6 ps-3 ring_color">{result.title}</span>
                                                            <span className="notification-nested-item ps-3 ring_color">{Moment(result.createDate).format('hh:mm a')}</span>
                                                        </div>
                                                    </div>
                                                    {result.isRead!=true && (
                                                    <div className="notification-dot-div">
                                                        <span className="notification-dot-spn"></span>
                                                        </div>
                                                    )}

                                                    {/*<div style={{ marginLeft: "10px", minWidth: "20%", maxWidth: "30%" }}>*/}
                                                    {/*    <small>{Moment(result.createDate).format('D MMMM YYYY')}</small>*/}
                                                    {/*</div>*/}

                                                    {/*<div style={{ marginLeft: "10px", minWidth: "2%", maxWidth: "5%" }}>*/}
                                                    {/*    <i class="fa fa-trash-o" onClick={() => this.RemoveNotification(result)} ></i>*/}
                                                    {/*</div>*/}

                                                    <hr className='disabled hr-width'></hr>
                                                </div>
                                            )
                                        })}

                                    </div>
                                )
                            })}
                        </>
                    }
                </div>


                {
                    this.state != null && this.state.showConfirmation == true && (
                        <Confirmation showConfirmation={this.state.showConfirmation} onCloseConfirmation={this.closeConfirmation}
                            popupContent={this.state.confirmationMsg} confirmation_Confirm={this.confirmDelete} ></Confirmation>
                    )
                }
            </Fragment>
        )
    }
}