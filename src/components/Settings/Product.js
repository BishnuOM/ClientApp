import React, { Component } from 'react';
import $ from 'jquery';
import Service from '../../Service/Service';
import Swal from "sweetalert2";
import Loading from '../Layout/Loading';


export class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriptionDetail: {
                product: {},
                prices: []
            },
            userId: '',
            accessToken: '',
            seatCount: 0,
            isLoading: true,
            isNext: false,
            isFinish: false,
        }
    }

    componentDidMount() {
        let orgDetail = localStorage.getItem("OrganizationDetail");
        orgDetail = orgDetail ? JSON.parse(orgDetail) : {}; 
        const data = JSON.parse(localStorage.getItem("login_data"));
        let query = window.location.pathname.split('/');
        if (query && query.length == 3 && query[2]) {
            this.setState({
                userId: data.id,
                accessToken: data.token,
                productId: query[2],
                orgId: orgDetail.orgId,
                imageurl: orgDetail.orgImg ? orgDetail.orgImg : 'img/icons/Mentorz_logo.svg'
            }, this.getSubscriptionDetail)
        }
    }

    getSubscriptionDetail() {
        Service.GetSubscriptionDetail(this.state).then((response) => {
            if (response) {
                response.product = response.product ? response.product : {};
                response.prices = response.prices && response.prices.length ? response.prices : [];
                response.productSeatCount = response.productSeatCount ? response.productSeatCount : 0;
                this.setState({
                    subscriptionDetail: response,
                    seatCount: response.productSeatCount
                });
            }
            this.setState({
                isLoading: false,
            });
        }).catch(function (error) {
            this.setState({
                isLoading: false,
            });
        })
    }

    setSeatCount(count) {
        this.setState({
            seatCount: count,
        });
    }

    cancelProductNext() {
        this.setState({
            seatCount: 0,
        });
    }

    onNextOrBack(isVal) {
        if (isVal) {
            if (this.state.subscriptionDetail.prices && this.state.subscriptionDetail.prices.length
                && this.state.subscriptionDetail.prices[0].unitAmountDecimal.toString().length > 2) {
                var len = this.state.subscriptionDetail.prices[0].unitAmountDecimal.toString().length;
                this.state.subscriptionDetail.prices[0].userAmount = this.state.subscriptionDetail.prices[0].unitAmountDecimal.toString().substring(0, len - 2) + '.' + this.state.subscriptionDetail.prices[0].unitAmountDecimal.toString().substring(len - 2, len);
                this.state.subscriptionDetail.prices[0].userAmount = (parseFloat(this.state.subscriptionDetail.prices[0].userAmount) * this.state.seatCount).toFixed(2);
                this.setState({
                    subscriptionDetail: this.state.subscriptionDetail,
                });
            }
        }
        this.setState({
            isNext: isVal,
        });
    }

    onFinish() {
        this.setState({
            isLoading: true,
        });
        Service.SaveProductSeatCount(this.state).then((response) => {
            if (response) {
                this.setState({
                    isFinish: true,
                });
            }
            this.setState({
                isLoading: false,
            });
        }).catch(function (error) {
            this.setState({
                isLoading: false,
            });
        })
    }

    backToSubscription() {
        window.location.replace(`/Subscription`);
    }

    render() {
        return (
            <div class="height-95 pt-5 px-2 px-lg-5">
                <div class="conatiner">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="breadcrumb d-flex align-items-center fs-3 mb-0">
                            <span style={{ fontSize: "28px" }}>Settings</span>
                            <span class="px-2 fs-3">&#62;</span>
                            <span class="font-bold text-dark" style={{ fontSize: "28px" }}>Subscriptions</span>
                        </div>
                    </div>

                    <div class="conatner-fluid mt-4">
                        {this.state.isLoading ?
                            <>
                                <div style={{ float: "left", width: "100%" }}>
                                    <div style={{ float: "left", width: "85%" }}>
                                        <Loading rowCount={5} height={40} isRow={true} />
                                    </div>
                                </div>
                            </>
                            : this.state.isFinish != true ?
                                <div className="product-main-div">
                                    <div style={{ fontSize: "22px" }}>
                                        Your selected plan
                                    </div>
                                    {this.state.isNext != true ? <>
                                        <div style={{ width: "100%" }}>
                                            <div style={{ width: "50px", float: "left", marginTop: "15px" }}>
                                                <img src={`${this.state.imageurl}`} alt="image" className="productlogo" />
                                            </div>

                                            <div style={{ width: "91%", float: "right", marginTop: "11px" }}>
                                                <div style={{ fontSize: "36px" }}>
                                                    {this.state.subscriptionDetail.product.name}
                                                </div>
                                                <div style={{ fontSize: "12px", marginTop: "8px" }}>
                                                    {this.state.subscriptionDetail.product.description}
                                                </div>

                                                <div style={{ marginTop: "25px", fontSize: "22px" }}>
                                                    Select the number of seats on this plan
                                                </div>
                                                <div style={{ marginTop: "17px" }}>
                                                    <span onClick={(e) => this.state.seatCount > 0 && this.setSeatCount(this.state.seatCount - 1)} style={{ fontSize: "45px", color: "#FF4339", cursor: "pointer", fontWeight: "700" }}>&#8722;</span>
                                                    <span style={{ marginLeft: "15px", marginRight: "15px", fontSize: "45px", fontWeight: "600" }}>{this.state.seatCount} seats</span>
                                                    <span onClick={(e) => this.setSeatCount(this.state.seatCount + 1)} style={{ fontSize: "45px", color: "#FF4339", cursor: "pointer", fontWeight: "700" }}>&#43;</span>
                                                </div>

                                                <div style={{ marginTop: "64px", float: "right", textAlign: "right", marginRight: "40px" }}>
                                                    <button onClick={(e) => this.state.seatCount > 0 && this.backToSubscription()} class="border-Button btn btn-outline btn-app px-4 py-1">Cancel</button>
                                                    <button onClick={(e) => this.onNextOrBack(true)} style={{ marginLeft: "8px" }} class="btn btn-app py-1 px-4">Next </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                        :
                                        <>
                                            <div style={{ width: "100%" }}>
                                                <div style={{ width: "50px", float: "left", marginTop: "15px" }}>
                                                    <img src={`${this.state.imageurl}`} alt="image" className="productlogo" />
                                                </div>
                                                <div style={{ width: "91%", float: "right", marginTop: "11px" }}>
                                                    <div style={{ fontSize: "36px" }}>
                                                        {this.state.subscriptionDetail.product.name}
                                                    </div>
                                                    <div style={{ fontSize: "12px", marginTop: "8px" }}>
                                                        {this.state.subscriptionDetail.product.description}
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ marginTop: "60px", width: "100%", float: "left" }}>
                                                <div style={{ fontSize: "18px", width: "80%", float: "left" }}>
                                                    {this.state.subscriptionDetail.product.name} ({this.state.seatCount} seats, billed annualy)
                                                </div>
                                                <div style={{ fontSize: "18px", width: "20%", float: "right", textAlign: "right", paddingRight: "40px" }}>
                                                    ${this.state.subscriptionDetail.prices && this.state.subscriptionDetail.prices.length ? this.state.subscriptionDetail.prices[0].userAmount :'0.00'}
                                                </div>
                                                <div style={{ fontSize: "18px", marginTop: "15px", width: "80%", float: "left" }}>
                                                    Estimated taxes to be collected (TBC)
                                                </div>
                                                <div style={{ fontSize: "18px", width: "20%", float: "right", textAlign: "right", paddingRight: "40px" }}>
                                                    $0.00
                                                </div>
                                                <hr></hr>

                                                <div style={{ fontSize: "18px", marginTop: "10px", width: "80%", float: "left", textAlign: "right", paddingRight: "40px" }}>
                                                    Total
                                                </div>
                                                <div style={{ fontWeight: "700", fontSize: "18px", width: "20%", float: "right", textAlign: "right", paddingRight: "40px" }}>
                                                    ${this.state.subscriptionDetail.prices && this.state.subscriptionDetail.prices.length ? this.state.subscriptionDetail.prices[0].userAmount : '0.00'}
                                                </div>

                                                <div style={{ marginTop: "40px", float: "right", textAlign: "right", marginRight: "40px" }}>
                                                    <button onClick={(e) => this.onNextOrBack(false)} class="border-Button btn btn-outline btn-app px-4 py-1">Back</button>
                                                    <button onClick={(e) => this.onFinish()} style={{ marginLeft: "8px" }} class="btn btn-app py-1 px-4">Finish </button>
                                                </div>
                                            </div>
                                        </>}
                                </div>
                                :
                                <div className="product-main-div product-success-div">
                                    <div style={{ float: "right", marginTop:"-25px" }}>
                                        <span className="product-close-icon" onClick={(e) => this.backToSubscription()}>&#x2715;</span>
                                    </div>
                                    <div style={{ marginTop: "45px" }}>
                                        <div style={{ textAlign: "center" }}>
                                            <div className="product-success">
                                                <img src={'img/icons/done.png'} alt="image" className="product-success-icon" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "center", marginTop: "20px", fontSize: "36px" }}>You're all set!</div>
                                    <div style={{ textAlign: "center", marginTop: "30px", fontSize: "22px", paddingLeft: "20px", paddingRight:"20px" }}>Than you for choosing {this.state.subscriptionDetail.name} Plan. You will be charged using the preferred payment and may view all invoices in the Billing tab.</div>
                                </div>
                        }
                    </div>
                </div>
            </div >
        )
    }
}