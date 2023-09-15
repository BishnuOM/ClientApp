import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import Service from '../../../Service/Service';
import AlertService from '../../../AlertService/Alert';
import $ from 'jquery';
import { debounce } from "lodash";
import Loader from '../../Layout/Loader';


export default class GroupMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupuserdata: this.props.popupContent,
            isLoading: false,
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
    }

    handleClose() {
        this.props.oncloseGroupMember(false);
    }

    saveMember() {
        this.setState({
            isLoading: true,
        })
        this.state.groupuserdata.forEach(function (a) {
            a.id = '';
        });
        Service.SaveMembers(this.state.accessToken, this.state.groupuserdata).then((response) => {
            this.setState({
                isLoading: false,
            })
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
                this.props.onSaveMember(this.state);
            }
        }).catch(function (error) {
            this.setState({
                isLoading: false,
            })
            alert(JSON.stringify(error));
        })
    }

    onChangeInput = (e, item) => {
        item.roleId = e.target.value;
    }

    render() {
        return (

            <Fragment >
                <Loader isLoading={this.state.isLoading}></Loader>
                <Modal fullscreen={true} contentClassName="group-mentor-model-w" show={this.props.showgroupMember} onHide={() => this.handleClose()}
                    aria-labelledby="contained-modal-title-vcenter">

                    <Modal.Header closeButton className="confirmation-header">
                        <Modal.Title>
                            {this.props.popupHeader}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{ minHeight: "250px" }}>
                        <div>
                            <div class="table-responsive mt-3" style={{ marginRight: "40px" }}>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th className="font-size-12px">FirstName</th>
                                            <th className="font-size-12px">LastName</th>
                                            <th className="font-size-12px">Email</th>
                                            <th className="font-size-12px">Title</th>
                                            <th className="font-size-12px">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.groupuserdata && this.state.groupuserdata.map((item, index) => {
                                            return (
                                                <tr key={index + 1}>
                                                    <td className="font-size-16px">
                                                        {item.firstName}
                                                    </td>
                                                    <td className="font-size-16px">
                                                        {item.lastName}
                                                    </td>
                                                    <td className="font-size-16px">
                                                        {item.emailAddress}
                                                    </td>
                                                    <td className="font-size-16px">
                                                        {item.title}
                                                    </td>
                                                    <td>
                                                        <select class="form-control font-size-16px" id="role" name="roleId" defaultValue={item.roleId} onChange={(e) => this.onChangeInput(e, item)} >
                                                            <option value="2">Mentor</option>
                                                            <option value="1">Mentee</option>
                                                            <option value="3">Admin</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer className="confirmation-footer">
                        <button type="reset" class="border-Button btn btn-outline btn-app px-4 py-1" onClick={() => this.handleClose()}>Cancel</button>
                        <button style={{ marginLeft: "4px" }} onClick={() => this.saveMember()} class="btn btn-app py-1 px-4">Add Member</button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}

