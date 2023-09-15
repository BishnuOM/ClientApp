import React from 'react';
import Service from '../../Service/Service';
import Dropdown from '../../Service/Dropdown';

export class EngagementKpi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rings: [],
            selectedRingId: null,
            ringDetail: {},
            TotalScheduled:'',
            TotalCompleted:'',
            AverageDuration:'',
            Assigned:'',
            Completed:'',
            Trainingcompleted:'',
            Certifications:''
            
        }
    }

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem("login_data"));
        this.setState({
            ...this.state, AccessToken: data.token,
            userid: data.id,
        }, () => {
            this.GetRingList();
        });
    }

    GetRingList() {
        Service.RingList(this.state).then((response => {
           if (response && response.length) {
                response[0].isSelectedRingId = response[0].id;
                this.setState({
                    rings: response
                });
                this.getSelectedRingDetails(response[0]);
            }
        })).catch(function (error) {
            alert(JSON.stringify(error));
        });
    }

    changeRing(option) {
        this.setState({
            ...this.state, selectedRingId: option.id,
            ringDetail: {}
        }, () => {
            let item = this.state.rings.filter(item => item.id == this.state.selectedRingId);
            if (item && item.length) {
                this.getSelectedRingDetails(item[0]);
            }
        });
    }

    getSelectedRingDetails(item) {
        var self=this;
        self.setState({
            selectedRingId: item.id,
            ringDetail: {
                id: item.id,
                ringId: item.id,
                ringName: item.name,
                name: item.name,
                mentees: item.mentees,
                mentors: item.mentors,
                type: item.ringTypeName,
                status: item.status,
                description: item.description,
            }
        },this.GetEngagmentkpi);
      
    }
    GetEngagmentkpi(){
    var self=this;
    Service.GetEngagmentkpi(self).then((response => {
          
            self.setState({
              
              TotalScheduled:response.result.totalScheduledSessions,
              TotalCompleted:response.result.completedSessions,
              AverageDuration:response.result.averageDurationOfSessions,
              Assigned:response.result.totalTask,
              Completed:response.result.completedTask,
              Trainingcompleted:response.result.trainingCompleted,
              Certifications:response.result.certificationCompleted
            })
    
        }))


    }

    render() {
        return (
            <div id="content" className="tab-content w-100" role="tablist"style={{padding:"0px 4% "}}>
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <div className="fs-3 breadcrumb d-flex align-items-center  ">
                        <span className="" style={{ fontSize: "28px" }}>Insights</span>
                        <span className="px-2 fs-3">&#62;</span>
                        <span className="text-dark font-bold" style={{ fontSize: "28px" }}>Engagement KPIs</span>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-2 mb-3 mt-2 m-lg-0">
                            <div className="fs-5 text-dark font-bold pe-lg-4 pe-2 nowrap pt-lg-5 mt-2">Select program</div>
                        </div>
                        <div className="col-lg-10">
                            <table className="table ring-table">
                                <tr>
                                    <th style={{ width: "30%" }} className="font-bold heading-section p-3 nowrap"><span>Program Name</span></th>
                                    <th style={{ width: "10%" }} className="font-bold heading-section p-3"><span>Mentees</span></th>
                                    <th style={{ width: "10%" }} className="font-bold heading-section p-3"><span>Mentors</span></th>
                                    <th style={{ width: "10%" }} className="font-bold heading-section p-3"><span>Type</span></th>
                                    <th style={{ width: "10%" }} className="font-bold heading-section p-3"><span>Status</span></th>
                                    <th style={{ width: "30%" }} className="font-bold heading-section p-3"><span>Description</span></th>
                                </tr>

                                <tr className="bg-color p-2">
                                    <td className="p-3">
                                        <Dropdown isSearchable placeHolder="Select..." options={this.state.rings} selectedItem={this.state.ringDetail} onChangeItem={(val) => this.changeRing(val)} />
                                    </td>
                                    <td className="p-3">{this.state.ringDetail.mentees}</td>
                                    <td className="p-3">{this.state.ringDetail.mentors}</td>
                                    <td className="p-3">{this.state.ringDetail.type}</td>
                                    <td className="p-3">{this.state.ringDetail.status ?'Active':'Inactive'}</td>
                                    <td className="p-3">{this.state.ringDetail.description}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="row mt-4 align-items-center">
                        <div className="col-lg-2 mb-3 mt-2 m-lg-0">
                            <div className="fs-5 text-dark font-bold w-15 pe-lg-4 pe-2 nowrap">Sessions
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <div className="container-fluid bg-color rounded-3 px-lg-5 py-4">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="text-center">
                                            <div className="count font-medium text-dark">{this.state.TotalScheduled}</div>
                                            <div className="fs-5 text-dark">Scheduled </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <div className="count font-medium text-dark">{this.state.TotalCompleted}</div>
                                        <div className="fs-5 text-dark">Completed </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="text-center">
                                            <div className="count font-medium text-dark">{this.state.AverageDuration}<span
                                                className="fs-5">min</span></div>
                                            <div className="fs-5 text-dark">Average Duration </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 align-items-center">
                        <div className="col-lg-2 mb-3 mt-2 m-lg-0">
                            <div className="fs-5 text-dark font-bold w-15 pe-lg-4 pe-2 nowrap">Tasks</div>
                        </div>
                        <div className="col-lg-10">
                            <div className="container-fluid bg-color rounded-3 px-lg-5 py-4">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="text-center">
                                            <div className="count font-medium text-dark">{this.state.Assigned}</div>
                                            <div className="fs-5 text-dark">Assigned </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <div className="count font-medium text-dark">{this.state.Completed}</div>
                                        <div className="fs-5 text-dark">Completed </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 align-items-center">
                        <div className="col-lg-2 mb-3 mt-2 m-lg-0">
                            <div className="fs-5 text-dark font-bold w-15 pe-lg-4 pe-2 nowrap">Learning
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <div className="container-fluid bg-color rounded-3 px-lg-5 py-4">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="text-center">
                                            <div className="count font-medium text-dark">{this.state.Trainingcompleted}</div>
                                            <div className="fs-5 text-dark">Training completed</div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <div className="count font-medium text-dark">{this.state.Certifications}</div>
                                        <div className="fs-5 text-dark">Certifications</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}