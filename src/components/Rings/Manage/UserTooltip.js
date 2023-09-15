import React, { useState, useEffect } from 'react';

const UserTooltip = ({ user, userindex }) => {
    const [TopValue, setTopValue] = useState('100');

    useEffect(() => {
        let newEquation = (100 + userindex * 30)
        setTopValue(newEquation)
    }, [userindex]);


    const styles = {
        position: "absolute",
        //top: `${TopValue}px`,
        //left: 0,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        padding: "10px",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
        width: "15rem",
        height: "12rem",
    }
    return (
        <div style={styles}>
            <div style={{ width: "100%", display: "flex", borderBottom: "none" }} className="custom-dropdown-item d-flex align-items-center">
                {user.imageurl ? (
                    <img  src={user.imageurl} alt="" class="rounded-circle css_profile_cell" />
                ) : (<div className="table-cell-profile-name">
                    {(user.firstName + ' ' + user.lastName).match(/\b(\w)/g) ? (user.firstName + ' ' + user.lastName).match(/\b(\w)/g).join('').toUpperCase() : (user.firstName + ' ' + user.lastName)}
                </div>)}
                <div>
                    <span style={{ float: "left", width: "100%" }} className="tooltip-truncate fs-6 ps-3 ring_color">{user.firstName + ' ' + user.lastName}</span>
                    <span style={{ paddingTop: "5px" }} className="tooltip-truncate notification-nested-item ps-3 ring_color">{user.designation}</span>
                </div>
            </div>

            <div class="d-flex  align-items-center" style={{ width: "100%", paddingTop: "10px" }}>
                <div class="tooltip-icon" style={{ overflow: "hidden", marginLeft: "3rem" }} >
                    <img src="img/icons/Vector.svg" alt="" class="img-fluid p-2" />
                </div>
                <div class="tooltip-icon" style={{ overflow: "hidden", marginLeft: "1rem" }}>
                    <img src="img/icons/call.svg" alt="" class="img-fluid p-2" />
                </div>
                <div class="tooltip-icon" style={{ overflow: "hidden", marginLeft: "1rem" }}>
                    <img src="img/icons/Envelope.svg" alt="" class="img-fluid p-2" />
                </div>
            </div>

            <div class="d-flex  align-items-center" style={{ width: "100%", paddingTop: "10px" }} >
                <div>
                    <img src="img/icons/Envelope.svg" alt="" style={{ marginLeft: "1rem" }} />
                </div>
                <div className='useremail_tooltip tooltip-truncate'>
                    {user.emailAddress}
                </div>
            </div>

            <div class="d-flex  align-items-center" style={{ width: "100%", paddingTop: "10px" }} >
                <div>
                    <img src="img/icons/call.svg" alt="" style={{ marginLeft: "1rem" }} />
                </div>
                <div className='useremail_tooltip'>
                    (123) 456-7890
                </div>
            </div>
        </div>

    );
};

export default UserTooltip;
