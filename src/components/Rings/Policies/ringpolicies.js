import React, { Component, Fragment } from 'react';
import Service from '../../../Service/Service';
import Loading from '../../Layout/Loading';
import AlertService from '../../../AlertService/Alert';
import Policy from './policy';
import OverflowTip from '../../Layout/OverflowTip';


export class RingPolicies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            policies: [],
            isLoading: true,
            showPolicy: false,
            policyPopupContent:null
        }
    }

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem("login_data"));
        this.setState({
            userId: data.id,
            accessToken: data.token,
        }, this.GetPolices)
    }

    GetPolices() {
        Service.GetUserRingPolicyList(this.state).then((response => {
            if (response && response.length) {
                this.setState({
                    policies: response,
                });
            }
            this.setState({
                isLoading: false,
            });
        })).catch(function (error) {
            this.setState({
                isLoading: false,
            });
            alert(JSON.stringify(error));
        });
    }

    deletePolicy(row) {
        AlertService.confirmation('Confirmation', 'Are you sure you want to delete the policy?', 'warning', 'Yes').then((res) => {
            if (res && res.isConfirmed) {
                this.setState({
                    isLoading: true,
                });
                let postData = {
                    policyId: row.policyId,
                    ringId: row.ringId,
                    userId: this.state.userId,
                }
                Service.DeleteRingPolicy(this.state.accessToken, postData).then((response => {
                    if (response == true) {
                        this.state.policies.filter(item => item.ringId == row.ringId).map((sitem, ind) => {
                            sitem.policyId = null;
                            sitem.policyDescription ='';
                        });
                        this.setState({ policies: this.state.policies });
                    }

                    this.setState({
                        isLoading: false,
                    });
                })).catch(function (error) {
                    alert(JSON.stringify(error));
                    this.setState({
                        isLoading: false,
                    });
                });
            }
        });
    }

    createPolicy(row = {}) {
        this.setState({
            policyPopupContent: {
                policyId: row.policyId,
                ringId: row.ringId,
                policyDescription: row.policyDescription,
                ringName: row.ringName
            }, showPolicy: true
        });
    }

    updatePolicyData = (val) => {
        if (val && val.ringId && val.policyId) {
            this.state.policies.filter(item => item.ringId == val.ringId).map((sitem, ind) => {
                sitem.policyId = val.policyId;
                sitem.policyDescription = val.policyDescription;
            });
            this.setState({showPolicy:false, policies: this.state.policies});
        }
    }

    closePolicy = (status = false) => {
        this.setState({ showPolicy: status, policyPopupContent: null });
    }

    render() {
        return (
            <Fragment>
                <div class="card-body" style={{padding:"0px 5% "}}>
                    <div class="fs-3 breadcrumb d-flex align-items-center  ">
                        <span class="" style={{ fontSize: "28px" }}>Programs</span>
                        <span class="px-2 fs-3">&#62;</span>
                        <span class="text-dark font-bold" style={{ fontSize: "28px" }}>Policies</span>
                    </div>
                    <div class="breadcrumb d-flex align-items-center text-dark policy-menu-item-name">
                        Add or edit policies for your programs.
                    </div>
                    {this.state.isLoading ?
                        <>
                            <div style={{ float: "left", width: "100%" }}>
                                <div style={{ float: "left", width: "85%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                                <div style={{ float: "left", marginLeft:"10px", width: "6%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                                <div style={{ float: "left", marginLeft: "10px", width: "6%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                            </div>
                            <div style={{ float: "left", width: "100%" }}>
                                <div style={{ float: "left", width: "85%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                                <div style={{ float: "left", marginLeft: "10px", width: "6%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                                <div style={{ float: "left", marginLeft: "10px", width: "6%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                            </div>
                            <div style={{ float: "left", width: "100%" }}>
                                <div style={{ float: "left", width: "85%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                                <div style={{ float: "left", marginLeft: "10px", width: "6%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                                <div style={{ float: "left", marginLeft: "10px", width: "6%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                            </div>
                            <div style={{ float: "left", width: "100%" }}>
                                <div style={{ float: "left", width: "85%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                                <div style={{ float: "left", marginLeft: "10px", width: "6%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                                <div style={{ float: "left", marginLeft: "10px", width: "6%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                            </div>
                            <div style={{ float: "left", width: "100%" }}>
                                <div style={{ float: "left", width: "85%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                                <div style={{ float: "left", marginLeft: "10px", width: "6%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                                <div style={{ float: "left", marginLeft: "10px", width: "6%" }}>
                                    <Loading rowCount={1} height={55} isRow={true} />
                                </div>
                            </div>
                        </>
                        : <div style={{ marginTop: "70px" }}>
                            {this.state.policies && this.state.policies.length >0 && this.state.policies.map((result, ind) => {
                                return (
                                    <div key={ind + 1} style={{ height: "60px" }}>
                                         <div className="ring-polices-text">
                                          
                                                {result.ringName}
                                          
                                        </div>
                                        <div style={{ width: "40%", float: "right", marginTop: "-2px", paddingBottom:"11px", textAlign: "right", paddingRight: "70px" }}>
                                            {result.policyId ? (
                                                <>
                                                    <button style={{ width: "130px" }} onClick={() => this.deletePolicy(result)} class="font-size-16px border-Button btn btn-outline btn-app py-1">Delete</button>
                                                    <>&nbsp;&nbsp;&nbsp;</>
                                                    <button style={{ width: "130px", marginLeft: "15px" }} onClick={() => this.createPolicy(result)} class="font-size-16px btn btn-app py-1">{'Edit'}</button>
                                                </>
                                            )
                                                : <button style={{ width: "130px" }} onClick={() => this.createPolicy({ ringId: result.ringId, ringName: result.ringName })} class="font-size-16px border-Button btn btn-outline btn-app py-1">Create Policy</button>
                                            }
                                        </div>

                                        <hr className='disabled hr-width'></hr>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>

                {
                    this.state != null && this.state.showPolicy == true && (
                        <Policy showPolicy={this.state.showPolicy} onClosePolicy={this.closePolicy}
                            popupContent={this.state.policyPopupContent} onSavePolicy={this.updatePolicyData}></Policy>
                    )
                }
            </Fragment>
        )
    }
}