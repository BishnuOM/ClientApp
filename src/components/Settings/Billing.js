import React, { Component } from "react";
import Swal from "sweetalert2"; 
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  GetUserById,
  AddStripeCustomerId,
  updateUserDetails,
  getPaymentMethodList,
  deletePaymentMethod,
  setPaymentMethodId
} from "../../actions/BillingActions";
import AddPaymentMethodForm from "./AddPaymentMethodForm";

class IntialPaymentPage extends Component {
  constructor(props) {
    super(props);
   // alert(this.props.paymentMethods.length) 
    this.state = {
    };
  }
  showPaymentOptions = () => {
    this.props.setPanelType("paymentOptions");
  };

  addPaymentMethod=()=>{
    this.props.setPanelType("addPaymentMethod");
  }
  handleOptionChange = (value) => {
    this.setState(() => {
      return {
        selectedOption: value,      
      };
    });
  };
  render() {
    const addedOptions = this.props.paymentMethods.map((obj) => {
      return  {
        id: obj.id,
        name: obj.cardLast4,
        description: `${obj.cardBrand} ending in ${obj.cardLast4}`,
        image: obj.cardBrand === "visa" ? "img/visa.png": "img/master_card.png",
        isCard: true
      };
   });
   const allPaymentOptions = [...addedOptions];

    return (
      <div>
        {
          this.props.paymentMethods.length===0?
          <>
          <div style={{ marginBottom: "1rem" }}>
           <p className="nopayment">No Payment Methods Set up </p>
          </div>
        <div style={{ marginBottom: "3rem" }}>
          <p className="btn btn-light py-2" onClick={this.showPaymentOptions}>
            Add Payment Method to Continue
          </p>
        </div>
        <div>
          <img src="./img/girl.png" alt=""/>
        </div>
        </>
        :
        <>
        <div className="row">
        <div className="col-lg-6 col-md-8 col-12">
          {allPaymentOptions.map((obj, ind) => {
            return (
              <div className="d-flex align-items-center justify-content-between py-3 border-bottom" key={ind + 1}>
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={obj.name}
                    value={obj.name}
                    checked={ this.state.selectedOption === obj.name}
                    onChange={() => this.handleOptionChange(obj.name)}
                    name="paymentoption"
                    defaultChecked={true}
                  />
                  <label className="form-check-label ps-2 fs-5 pt-2">
                    {obj.description}
                  </label>  
                </div>
                <div id="card-actions" className="d-flex align-items-center justify-content-end">
                  <img src={obj.image} alt={obj.name}/>
                  { obj.isCard &&  this.state.selectedOption === obj.name &&
                    <>
                      <i className="bi bi-pencil-square" onClick={() => this.editPaymentMethod(obj.id)} title="Edit Credit Card Details"></i>
                      <i className="bi bi-trash" title="Delete Credit Card Details" onClick={() => this.deleteConfirmation(obj.id)}></i>
                    </>
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="row">
      <div className="col-lg-4 col-md-6 col-12">
        <div className="d-flex  " >
          <button className="btn btn-primary btn-billing mt-3 " onClick={this.showAddPaymethod}>
              Next
            </button>
            <button className="btn btn-primary btn-billing mt-3  offset-3" onClick={this.addPaymentMethod}>
            Add Payment Method
            </button>
        </div>
      </div>
      </div>
      
      </>
        
        }
      </div>
    );
  }
}

class PaymentOptionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      selectedCardId:null,
    };
  }
  handleOptionChange = (value) => {
    this.setState(() => {
      return {
        selectedOption: value,      
      };
    });
  };
  showAddPaymethod = () => {
    if(this.state.selectedOption === "card")
      this.props.setPanelType("addPaymentMethod");
  };
  editPaymentMethod = (cardId) => {
    this.props.setPaymentMethodId(cardId).then(() => {
      this.props.setPanelType("addPaymentMethod");
    });
  };
  deleteCard = () => {
    return new Promise(() => {
      this.props.deletePaymentMethod(this.state.selectedCardId);
    });
  };
  deleteConfirmation = (cardid) => {  
    this.setState(()=>{
      return{
        selectedCardId:cardid,
      }
    });
    Swal.fire({  
      title: 'Are you sure want to delete ?',     
      showCancelButton: true,  
      confirmButtonColor: '#3085d6',  
      cancelButtonColor: '#d33',  
      confirmButtonText: 'Yes'  
    })
    .then( async (willDelete) => {
      if (willDelete) {
          await this.deleteCard();
            Swal.fire({  
              title: 'Deleted successfully!',     
              icon: "success"
            });
            this.setState(()=>{
              return{
                selectedCardId: null,
              }
            });
      }
  });  
  };  
  render() {
    const paymentOptions = [
      {
        name: "card",
        description: " Credit/Debit Card",
        image: "img/master_card.png",
      },
      {
        name: "applepay",
        description: "Apple pay",
        image: "img/apple.png",
      },
      {
        name: "googlepay",
        description: "Google pay",
        image: "img/google_pay.png",
      },
    ];
   const allPaymentOptions = [...paymentOptions];
    return (
      <div className="conatner-fluid mt-4">
        <div
          className="fs-5 text-dark font-bold"
          style={{ paddingBottom: "20px" }}
        >
          Choose your method
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-8 col-12">
            {allPaymentOptions.map((obj, ind) => {
              return (
                <div className="d-flex align-items-center justify-content-between py-3 border-bottom" key={ind + 1}>
                  <div className="form-check d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="radio"
                      id={obj.name}
                      value={obj.name}
                      checked={ this.state.selectedOption === obj.name}
                      onChange={() => this.handleOptionChange(obj.name)}
                      name="paymentoption"
                      defaultChecked={true}
                    />
                    <label className="form-check-label ps-2 fs-5 pt-2">
                      {obj.description}
                    </label>  
                  </div>
                  <div id="card-actions" className="d-flex align-items-center justify-content-end">
                    <img src={obj.image} alt={obj.name}/>
                    { obj.isCard &&  this.state.selectedOption === obj.name &&
                      <>
                        <i className="bi bi-pencil-square" onClick={() => this.editPaymentMethod(obj.id)} title="Edit Credit Card Details"></i>
                        <i className="bi bi-trash" title="Delete Credit Card Details" onClick={() => this.deleteConfirmation(obj.id)}></i>
                      </>
                    }

                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-12 text-center mt-2">
            <button className="btn btn-primary btn-billing mt-3 mb-5" onClick={this.showAddPaymethod}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.billings.userDetails,
    paymentMethods: state.billings.paymentMethods,
    stripeCustomerId: state.billings.stripeCustomerId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUserById: (payload) => dispatch(GetUserById(payload)),
  addStripeCustomerId: (token, payload) =>
  dispatch(AddStripeCustomerId(token, payload)),
  updateUserDetails: (payload) => dispatch(updateUserDetails(payload)),
  getPaymentMethodList: (payload) => dispatch(getPaymentMethodList(payload)),
  deletePaymentMethod: (cardId) => dispatch(deletePaymentMethod(cardId)),
  setPaymentMethodId: (cardId) => dispatch(setPaymentMethodId(cardId)),
});

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NotificationsTab: true,
      SubscriptionTab: false,
      BillingTab: false,
      FeedbackTab: false,
      PrivacyTab: false,
      SupportTab: false,
      activeId: "1",
      getprivacy: "",
      AccessToken: "",
      getsupport: [],
      getsupportemail: [],
      feedbackrating: "",
      feedbackmsg: "",
      isAddPaymentDisplay: false,
      paymentMethodsCount: 0,
      paneltype: "initial",
    };
  }

  componentDidMount() {
    //alert('componentDidMount')
    var self = this;
    const data = JSON.parse(localStorage.getItem("login_data"));
    self.setState(
      {
        userid: data.id,
        AccessToken: data.token,
      },
      self.getprivacy
    );
    if (!this.props.stripeCustomerId) {
      this.props
        .getUserById({ userId: data.id, token: data.token })
        .then(() => {
          if (
            this.props.userDetails &&
            this.props.userDetails.stripeCustomerId === ""
          ) {
            const payload = {
              firstName: this.props.userDetails.firstName,
              lastName: this.props.userDetails.lastName,
              description: this.props.userDetails.organization,
              email: this.props.userDetails.emailAddress,
            };
            this.props.addStripeCustomerId(data.token, payload).then(() => {
              this.props.updateUserDetails(this.props.userDetails);
              this.props.getPaymentMethodList(this.props.stripeCustomerId);
            });

            // axios call
          }
        });
    } else {
      this.props.getPaymentMethodList(this.props.stripeCustomerId).then(() => {
        this.setPanelType("initial",);
        // this.props.paymentMethods.length > 0
        //   ? this.setPanelType("paymentOptions")
        //   : this.setPanelType("initial");
      });
    }
  }
  setPanelType = (panelname) => {
    this.setState(() => {
      return {
        paneltype: panelname,
      };
    });
  };

  detachPaymentMethod = (cardid) => {
    this.props.deletePaymentMethod(cardid).then(() => {
       this.props.getPaymentMethodList(this.props.stripeCustomerId);
    });
  }

  render() {
    let panel;
    switch (this.state.paneltype) {
      case "initial":
        panel = <IntialPaymentPage setPanelType={this.setPanelType} paymentMethods={this.props.paymentMethods}/>;
        break;
      case "addPaymentMethod":
          panel = <AddPaymentMethodForm setPanelType={this.setPanelType} />;
          break;
      case "paymentOptions":
        panel = <PaymentOptionsPage setPanelType={this.setPanelType} 
                    setPaymentMethodId={this.props.setPaymentMethodId}
                    deletePaymentMethod= {this.detachPaymentMethod}
                    paymentMethods={this.props.paymentMethods} />;
        break;
        default:
          panel = <IntialPaymentPage setPanelType={this.setPanelType} paymentMethods={this.props.paymentMethods}/>;
        break;
    }

   

    return (
      <div className="height-95 pt-5 px-2 px-lg-5">
        <div className="conatiner">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <div className="fs-3 breadcrumb d-flex align-items-center  ">
              <span className="" style={{ fontSize: "28px" }}>
                Settings
              </span>
              <span className="px-2 fs-3">&#62;</span>
              <span
                className="text-dark font-bold"
                style={{ fontSize: "28px" }}
              >
                Billing
              </span>
            </div>
          </div>
        <div className="actions-panel" style={{border: '1px solid black',width: '62%', paddingTop: '20px',marginBottom: '3rem',marginTop: '-30px'}}>
            <ul className="list-group list-group-horizontal d-flex justify-content-center">
                <li key="1" className="list-group-item d-flex align-items-center" style={{borderStyle:'hidden',width:'35%'}}> <img src="./img/TimeMachine.png"/>
                  <NavLink to="/" className="nowrap">Transaction History</NavLink>
                </li>
                <li key="2" className="list-group-item d-flex align-items-center" style={{borderStyle:'hidden',width:'30%'}}><img src="./img/Bill.png"/>
                  <NavLink to="/Billing/Invoices" className="nowrap">Invoices</NavLink>
                </li>
                <li key="3" className="list-group-item d-flex align-items-center" style={{borderStyle:'hidden',width:'35%'}}><img src="./img/MagneticCard.png" />
                  <p to="/" className="nowrap" onClick={()=>this.setPanelType('paymentOptions')}>Payment Methods</p>
                </li>
            </ul>
        </div>
          {panel}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
