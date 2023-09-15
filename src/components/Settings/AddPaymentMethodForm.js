import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  addPaymentMethod,
  getPaymentMethodList,
  updatePaymentMethod,
  getPaymentMethod,
  setPaymentMethodId,
} from '../../actions/BillingActions'

class AddPaymentMethodForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cvc: '',
      expMonth: 0,
      expYear: 0,
      cardnumber: '',
      token: '',
    }
  }

  componentDidMount() {
    var self = this
    if (!!self.props.paymentMethodId) {
      this.props.getPaymentMethod(self.props.paymentMethodId).then((res) => {
        this.setState({
          cvc: res.cvc,
          cardnumber: `XXXX XXXX XXXX ${res.cardLast4}`,
        })
      })
    }
  }
  componentWillUnmount() {
    this.props.setPaymentMethodId(null)
    this.props.getPaymentMethod(null)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitPaymentMethod = () => {
    const data = JSON.parse(localStorage.getItem('login_data'))
    var expiry = this.state.expirydate.split('/')
    const payload = {
      stripeCustomerId: this.props.stripeCustomerId,
      paymentMethodId: this.props.paymentMethodId,
      paymentMethodCardOptions: {
        cvc: this.state.cvc,
        expMonth: parseInt(expiry[0]),
        expYear: parseInt(expiry[1]),
        number: this.state.cardnumber,
        token: data.token,
      },
    }
    if (!!this.props.paymentMethodId) {
      payload.paymentMethodCardOptions.number = '4000056655665556'
      this.props.updatePaymentMethod(payload).then(() => {
        this.props.getPaymentMethodList(this.props.stripeCustomerId)
        this.props.setPanelType('paymentOptions')
      })
    } else {
      this.props.addPaymentMethod(payload).then(() => {
        this.props.getPaymentMethodList(this.props.stripeCustomerId)
        this.props.setPanelType('paymentOptions')
      })
    }
  }
  cancelPaymentMethod = () => {
    this.props.setPanelType('paymentOptions')
  }
  render() {
    return (
      <div className="">
        <form>
          <h4>Enter Payment Details</h4>
          <div className="form-group">
            <label className="payment-title1 mt-1">Cardholder’s Name</label>
            <input
              type="text"
              id="token"
              name="token"
              className="form-control payment-input mt-2"
              placeholder="John Smith"
            />
          </div>
          <div className="form-group">
            <label className="payment-title1 mt-3">Card Number</label>
            <input
              type="text"
              name="cardnumber"
              value={this.state.cardnumber}
              placeholder="1234 5678 9012 3456"
              className="form-control payment-input mt-2"
              onChange={this.handleChange}
            />
          </div>
          <div className="row">
            <div className="form-group col-md-2">
              <label className="payment-title1 mt-3">Expiration Date</label>
              <input
                type="text"
                name="expirydate"
                placeholder="MM/YYYY"
                className="form-control payment-input2 mt-2"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-md-10">
              <label
                className="payment-title1 mt-3"
                style={{ marginLeft: '75px' }}
              >
                CVV
              </label>
              <input
                type="text"
                placeholder="###"
                name="cvc"
                style={{ marginLeft: '75px' }}
                disabled={this.props.paymentMethodId ? 'disabled' : ''}
                onChange={this.handleChange}
                className="form-control payment-input2 mt-2"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="payment-title1 mt-3"> Billing Address</label>
            <input
              type="text"
              id="billingaddress"
              name="billingaddress"
              placeholder="12345 Smith Lane"
              className="form-control payment-input mt-2"
            />
          </div>
          <div className="row">
            <div className="form-group col-md-1">
              <label className="payment-title1 mt-3">City</label>
              <input
                type="text"
                name="city"
                placeholder="12345 Smith Lane"
                className="form-control payment-input3 mt-2"
              />
            </div>
            <div className="form-group col-md-1">
              <label
                className="payment-title1 mt-3"
                style={{ marginLeft: '99px' }}
              >
                State
              </label>
              <input
                type="text"
                style={{ marginLeft: '99px' }}
                placeholder="WA"
                name="statename"
                className="form-control payment-input4 mt-2"
              />
            </div>
            <div className="form-group col-md-10">
              <label
                className="payment-title1 mt-3"
                style={{ marginLeft: '142px' }}
              >
                Zip
              </label>
              <input
                type="text"
                style={{ marginLeft: '142px' }}
                placeholder="00000"
                name="zipcode"
                className="form-control payment-input3 mt-2"
              />
            </div>
          </div>
          <div className="form-group" style={{ marginLeft: '337px' }}>
            <input
              type="button"
              value="Cancel"
              onClick={this.cancelPaymentMethod}
              className="btn btn-secondary ms-2 m-4 enterPayCancel-details"
            />
            <input
              type="button"
              value="Next"
              onClick={this.submitPaymentMethod}
              className="btn btn-primary ms-2 m-4 enterPay-details"
            />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stripeCustomerId: state.billings.stripeCustomerId,
    paymentMethodId: state.billings.selectedPaymentMethodId,
    paymentMethod: state.billings.paymentMethod,
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPaymentMethod: (payload) => dispatch(addPaymentMethod(payload)),
  updatePaymentMethod: (payload) => dispatch(updatePaymentMethod(payload)),
  getPaymentMethodList: (payload) => dispatch(getPaymentMethodList(payload)),
  getPaymentMethod: (payload) => dispatch(getPaymentMethod(payload)),
  setPaymentMethodId: (val) => dispatch(setPaymentMethodId(val)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPaymentMethodForm)
