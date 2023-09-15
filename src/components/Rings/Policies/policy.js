import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import Service from '../../../Service/Service';
import AlertService from '../../../AlertService/Alert';
import Loader from '../../Layout/Loader';


export default class Policy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            policyId: this.props.popupContent.policyId,
            ringId: this.props.popupContent.ringId,
            policyDescription: this.props.popupContent.policyDescription,
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
        this.props.onClosePolicy(false);
    }

    savePolicy() {
        this.setState({
            isLoading: true,
        })
        let postData = {
            policyId: this.state.policyId,
            ringId: this.state.ringId,
            policyDescription: this.state.policyDescription,
            userId: this.state.userId,
        }
        Service.SaveRingPolicy(this.state.accessToken, postData).then((response) => {
            this.setState({
                isLoading: false,
            })
            if (response) {
                this.props.onSavePolicy(response);
                if (this.state.policyId) {
                    AlertService.showInfoOnly("Policy Updated", "<span style = 'font-family: Myriad Pro;font-style: normal;font-weight: 400;font-size: 16px;line-height: 24px;text-align: center;'>Your policy has been updated.</span >", 'success').then((res) => {
                    });
                }
                else {
                    AlertService.showInfoOnly("Policy Added", "<span style = 'font-family: Myriad Pro;font-style: normal;font-weight: 400;font-size: 16px;line-height: 24px;text-align: center;'>Your policy has been added.</span >", 'success').then((res) => {
                    });
                }
            }
        }).catch(function (error) {
            this.setState({
                isLoading: false,
            })
        })
    }

    render() {
        return (
            <Fragment>
                <Loader isLoading={this.state.isLoading}></Loader>
                <Modal id="mdlPolicy" show={this.props.showPolicy} aria-labelledby="contained-modal-title-vcenter"
                    centered onHide={() => this.handleClose()}
                    aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header className="model-header-without-color">
                        <Modal.Title>
                            <div className="ibox-title policy-ibox-title" >
                                {this.state.policyId ? 'Edit a policy' : 'Add a policy'}
                            </div>
                            <div className="ibox-title policy-sub-title" >
                                Copy and paste your policy below and hit 'save' when complete.
                            </div>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{ minHeight: "300px",paddingTop:"5px" }}>
                        <div>
                            <div class="custom-form-group">
                                <textarea autoFocus id="txtPolicyDescription" value={this.state.policyDescription}
                                    onChange={(e) => this.setState({ policyDescription: e.target.value })} placeholder="Paste or type out your policy here">
                                </textarea>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer className="model-footer-without-color">
                        <div style={{ width: "100%", textAlign: "center", marginTop: "-10px", paddingBottom:"10px" }}>
                            <button type="reset" class="policy-button border-Button btn btn-outline btn-app px-4 py-1" onClick={() => this.handleClose()}>Cancel</button>
                            <button style={{ marginLeft: "15px" }} disabled={!this.state.policyDescription} onClick={() => this.savePolicy()} class="policy-button btn btn-app py-1 px-4">{'Save & Finish'}</button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}

