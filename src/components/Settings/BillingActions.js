import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class BillingActions extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div
        className="actions-panel"
        style={{
          border: '1px solid black',
          width: '62%',
          marginBottom: '3rem',
          marginTop: '-30px',
          height: '90px',
        }}
      >
        <ul className="list-group list-group-horizontal d-flex justify-content-center">
          <li
            key="1"
            className="list-group-item d-flex align-items-center"
            style={{ borderStyle: 'hidden', width: '35%' }}
          >
            <img src="./img/TimeMachine.png" />
            <NavLink to="/" className="nowrap">
              Transaction History
            </NavLink>
          </li>
          <li
            key="2"
            className="list-group-item d-flex align-items-center"
            style={{ borderStyle: 'hidden', width: '30%' }}
          >
            <img src="./img/Bill.png" />
            <NavLink to="/" className="nowrap">
              Invoices
            </NavLink>
          </li>
          <li
            key="3"
            className="list-group-item d-flex align-items-center"
            style={{ borderStyle: 'hidden', width: '35%' }}
          >
            <img src="./img/MagneticCard.png" />
            <NavLink to="/" className="nowrap">
              Payment Methods
            </NavLink>
          </li>
        </ul>
      </div>
    )
      
        <div className="actions-panel" style={{border: '1px solid black',width: '62%', paddingTop: '20px',marginBottom: '3rem',marginTop: '-30px'}}>
            <ul className="list-group list-group-horizontal d-flex justify-content-center">
                   <li key="1" className="list-group-item d-flex align-items-center" style={{borderStyle:'hidden',width:'35%'}}><img src="./img/TimeMachine.png"/><NavLink to="/" className="nowrap">Transaction History</NavLink></li>
                   <li key="2" className="list-group-item d-flex align-items-center" style={{borderStyle:'hidden',width:'30%'}}><img src="./img/Bill.png"/><NavLink to="/Billing/Invoices" className="nowrap">Invoices</NavLink></li>
                   <li key="3" className="list-group-item d-flex align-items-center" style={{borderStyle:'hidden',width:'35%'}}><img src="./img/MagneticCard.png" /><NavLink to="/" className="nowrap">Payment Methods</NavLink></li>
            </ul>
        </div>
    );
  }
}
