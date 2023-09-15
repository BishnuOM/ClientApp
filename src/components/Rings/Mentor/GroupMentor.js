import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import Service from '../../../Service/Service';
import AlertService from '../../../AlertService/Alert';
import Loader from '../../Layout/Loader';


export default class GroupMentor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mentors: this.props.popupContent,
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
        this.props.onCloseMentor(false);
    }

    saveMentor() {
        if (this.state.userId && this.state.accessToken) {
            this.setState({
                isLoading: true,
            })
            Service.SaveMentor(this.state.accessToken, this.state.mentors).then((response) => {
                this.setState({
                    isLoading: false,
                })
                if (response && response.length) {
                    let infoMessage = '';
                    let icon = 'warning';
                    response.map((result, index) => {
                        if (result.responseErrorMessage == "EMAILEXIST") {
                            infoMessage = "<span style = 'color:red',fontWeight: 'bold' >Same email address already exist.</span>";
                        }
                        else if (result.responseErrorMessage == "INVITED") {
                            infoMessage = "<span style = 'color:green',fontWeight: 'bold'>Mentor request invitation sent successfully.</span >";
                        }
                    });

                    if (infoMessage) {
                        AlertService.warningInfo("Information", infoMessage, icon).then((res) => {
                            this.props.onSaveMentor(true);
                        });
                    }
                    else {
                        this.props.onSaveMentor(true);
                    }
                }
                else {
                    this.props.onSaveMentor(true);
                }
            }).catch(function (error) {
                this.setState({
                    isLoading: false,
                })
                alert(JSON.stringify(error));
            })
        }
    }

    render() {
        return (

            <Fragment >
                <Loader isLoading={this.state.isLoading}></Loader>
                <Modal fullscreen={true} contentClassName="group-mentor-model-w" show={this.props.showMentors} onHide={() => this.handleClose()}
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.mentors.map((item, index) => {
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
                        <button style={{ marginLeft: "4px" }} onClick={() => this.saveMentor()} class="btn btn-app py-1 px-4">Add Mentor</button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}

