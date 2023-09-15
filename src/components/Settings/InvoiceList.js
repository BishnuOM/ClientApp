import React, { Component } from "react";
import { connect } from "react-redux";
import { GetUserById } from "../../actions/BillingActions";
import Loading from "../Layout/Loading";
import "tippy.js/dist/tippy.css";
import { NavLink } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    userDetails: state.billings.userDetails,
    paymentMethods: state.billings.paymentMethods,
    stripeCustomerId: state.billings.stripeCustomerId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUserById: (payload) => dispatch(GetUserById(payload)),
});

class Invoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      InvoicesList: [
        {
          InvoiceId: 1,
          InvoiceDate: "2023-08-12",
          BillingPeriod: "1/1/2023-1/31/2023",
          Amount: "$500.00",
          Status: "Pay",
        },
        {
          InvoiceId: 2,
          InvoiceDate: "2023-08-12",
          BillingPeriod: "1/1/2023-1/31/2023",
          Amount: "$500.00",
          Status: "Paid",
        },
        {
          InvoiceId: 3,
          InvoiceDate: "2023-08-12",
          BillingPeriod: "1/1/2023-1/31/2023",
          Amount: "$500.00",
          Status: "Processing",
        },
        {
          InvoiceId: 4,
          InvoiceDate: "2023-08-12",
          BillingPeriod: "1/1/2023-1/31/2023",
          Amount: "$500.00",
          Status: "Pay",
        },
        {
          InvoiceId: 5,
          InvoiceDate: "2023-08-12",
          BillingPeriod: "1/1/2023-1/31/2023",
          Amount: "$500.00",
          Status: "Pay",
        },
      ],
    };
  }

  componentDidMount() {
    var self = this;
    const data = JSON.parse(localStorage.getItem("login_data"));
    self.setState(
      {
        userid: data.id,
        AccessToken: data.token,
      },
      self.getprivacy
    );
  }

  render() {
    return (
      <div className="height-95 pt-5 px-2 px-lg-5">
        <div className="conatiner">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <div className="fs-3 breadcrumb d-flex align-items-center  ">
              <span className="" style={{ fontSize: "28px" }}>
                Settings
              </span>
              <span className="px-2 fs-3">&#62;</span>
              <NavLink to="/Billing">
                {({ isActive, isPending }) => (
                  <span
                    className="text-dark font-bold"
                    style={{ fontSize: "28px" }}
                  >
                    Billing
                  </span>
                )}
              </NavLink>

              <span className="px-2 fs-3">&#62;</span>
              <span
                className="text-dark font-bold"
                style={{ fontSize: "28px" }}
              >
                Invoices
              </span>
            </div>
          </div>
          <div className="table-responsive mt-3 nav-menu-name d-flex align-items-center justify-content-between">
            {this.state.isLoading ? (
              <Loading rowCount={5} isRow={true} />
            ) : (
              <table id="RingTable" className="table">
                <thead>
                  <tr>
                    <th>
                      <input className="form-check-input" type="checkbox" />
                    </th>
                    <th>Invoice ID</th>
                    <th>Date</th>
                    <th>Billing Period</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Download</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.InvoicesList.map((result, index) => {
                    return (
                      <tr
                        className="SelectableRow"
                        key={index + 1}
                        onMouseEnter={() => this.isringMouseEnter(result, 1)}
                        onMouseLeave={() => this.isringMouseEnter(result, 0)}
                      >
                        <td>
                          <div className="form-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={result.isSelected}
                              checked={result.isSelected}
                            />
                          </div>
                        </td>
                        <td className="font-size-16px">{result.InvoiceId}</td>
                        <td className="font-size-16px">{result.InvoiceDate}</td>
                        <td className="font-size-16px">
                          {result.BillingPeriod}
                        </td>
                        <td className="font-size-16px">{result.Amount}</td>
                        <td className="font-size-16px">
                            {result.Status == "Pay" ?
                             (<NavLink className="text-decoration-underline"to="/Billing"> {result.Status}</NavLink>)
                            : (result.Status)}</td>
                        <td className="font-size-16px">
                          <a href="#" className="text-decoration-underline">
                            <i class="bi bi-download"></i> Download
                          </a>
                        </td>
                      </tr>
                    );
                  })}

                  {this.state.isLoading &&
                    (!this.state.InvoicesList ||
                      !this.state.InvoicesList.length) && (
                      <tr>
                        <td colSpan="7">
                          <div style={{ textAlign: "center" }}>
                            ------ There is no invoices ------
                          </div>
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoices);
