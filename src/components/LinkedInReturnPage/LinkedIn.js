import React, { Component } from 'react';
import $ from 'jquery';
import Service from '../../Service/Service';
import Swal from "sweetalert2";
import AlertService from '../../AlertService/Alert';


export class LinkedIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            FirstName: '',
            LastName: ''
        }
    }

    render() {
        return (
            <>
                <div className='signup_background'>
                    <div className='signup_header1'>
                        <img src="img/Mentorz_logo_white.png" alt="image" className="signup_img" />
                        <img src="img/Mentorz_word_white.png" alt="image" className="sign_header_word" />
                    </div>

                    <label id="lblinvalid" style={{ marginLeft: "40px" }} className="text-danger textright" ></label>

                    <div className="linkedIn" style={{ width: "350px", textAlign: "center", padding: "2px", margin: "10px auto" }} >
                        <p style={{ textAlign: "left" }}>
                            <span style={{ fontSize: "24px", fontWeight: "bold" }}>Expand your Horizons</span>
                        </p>

                        <p  style={{ textAlign: "left" }}> 
                            <span>Match with mentors, learn and grow!</span>
                        </p>
                    </div>
                </div>
            </>
        )
    }

}