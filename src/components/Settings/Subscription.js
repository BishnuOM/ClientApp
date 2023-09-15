import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery";
import Service from '../../Service/Service';
import Swal from "sweetalert2";
import Loading from '../Layout/Loading';


export class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptions: [],
      userId: '',
      accessToken: '',
      isLoading: true,
      isCurrentProductExist: false,
    };
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("login_data"));
    let orgDetail = localStorage.getItem("OrganizationDetail");
    orgDetail = orgDetail ? JSON.parse(orgDetail) : {};

    this.setState(
      {
        userId: data.id,
        accessToken: data.token,
        orgId: orgDetail.orgId,
      },
      this.getSubscriptions
    );
  }

  getSubscriptions() {
    Service.GetSubscriptions(this.state)
      .then((response) => {
        if (response) {
          response.products = response.products ? response.products : [];
          response.organizationProducts = response.organizationProducts
            ? response.organizationProducts
            : [];

          response.products.map((item, ind) => {
            item.isCurrentProduct = false;
            let filteredItem = response.organizationProducts.filter(
              (sitem) =>
                sitem.productId &&
                sitem.productId.toLowerCase().includes(item.id.toLowerCase())
            );
            if (filteredItem && filteredItem.length) {
              item.isCurrentProduct = true;

              this.setState({
                isCurrentProductExist: true,
              });
            }
          });

          this.setState({
            subscriptions: response.products,
          });
        }
        this.setState({
          isLoading: false,
        });
      })
      .catch(function (error) {
        this.setState({
          isLoading: false,
        });
      });
  }

  getProductDetail(productId) {
    window.location.replace(`/Product/${productId}`);
  }

  render() {
    return (
      <div class="height-95 pt-5 px-2 px-lg-5">
        <div class="conatiner">
          <div class="d-flex align-items-center justify-content-between mb-5">
            <div class="fs-3 breadcrumb d-flex align-items-center  ">
              <span style={{ fontSize: "28px" }}>Settings</span>
              <span class="px-2 fs-3">&#62;</span>
              <span class="text-dark font-bold" style={{ fontSize: "28px" }}>
                Subscriptions
              </span>
            </div>
          </div>

          <div class="conatner-fluid mt-4">
            {this.state.isLoading ? (
              <>
                <div style={{ float: "left", width: "100%" }}>
                  <div style={{ float: "left", width: "85%" }}>
                    <Loading rowCount={3} height={55} isRow={true} />
                  </div>
                </div>
              </>
            ) : (
              <>
                {this.state.subscriptions &&
                  this.state.subscriptions.length &&
                  this.state.subscriptions.map((item, index) => {
                    return (
                      <div class="subscription-div px-4 py-2 mb-3 d-flex align-items-center justify-content-between">
                        <div>
                          <div
                            style={{ borderRadius: "20px" }}
                            class="text-dark lh-base"
                          >
                            {item.name}
                          </div>
                          <div className="subscription-des">
                            {item.description}
                          </div>
                        </div>
                        <div>
                          {item.isCurrentProduct == true ? (
                            <Link 
                              to={`/Product/${item.id}`}
                              ref={(node) => {
                                if (node) {
                                  node.style.setProperty(
                                    "color",
                                    "#FFFFFF",
                                    "important"
                                  );
                                  node.style.setProperty(
                                    "background-color",
                                    "#767A96",
                                    "important"
                                  );
                                }
                              }}
                              type="button"
                              class="btn btn-app py-2"
                            >
                              Current Plan
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) =>
                                this.state.isCurrentProductExist == false &&
                                this.getProductDetail(item.id)
                              }
                              class="btn btn-app py-2"
                            >
                              Buy Now
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
