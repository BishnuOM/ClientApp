import React, { Component } from 'react';
import Service from '../../Service/Service';

export class Steps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            soft: []
        }
    }

    componentDidMount() {
        var self = this;
        const data = JSON.parse(localStorage.getItem("login_data"));
        self.setState({
            userid: data.id,
            AccessToken: data.token,
        }, self.Getsoft)
    }

    Getsoft() {
        var self = this;
        self.MenuType = "CSSteps";
        Service.GetMentorshipCulture(self).then((response => {
            self.setState({
                soft: response
            });
        })).catch(function (error) {
            alert(JSON.stringify(error));
        });
    }
    render() {
        return (
            <div class="height-96 pt-5 px-2 px-lg-5">
                <div class="conatiner">
                    <div class="d-flex align-items-center justify-content-between mb-5">
                        <div class="fs-3 breadcrumb d-flex align-items-center  ">
                            <span class="" style={{ fontSize: "28px" }}>Culture</span>
                            <span class="px-2 fs-3">&#62;</span>
                            <span class="text-dark font-bold" style={{ fontSize: "28px" }}>Steps</span>
                        </div>
                    </div>

                    <div class="conatner-fluid mt-4">
                        <div class="fs-5 text-dark font-bold" style={{ paddingBottom: "20px" }}>Steps to Transform Mentorship Culture</div>
                        <ul>
                            {this.state.soft.map((result, index) => {
                                return (
                                    <li class="mb-4 fs-5 lh-sm text-dark">{result.description}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}