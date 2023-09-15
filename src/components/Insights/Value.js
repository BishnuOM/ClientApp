import React, { Component } from 'react';
import Service from '../../Service/Service';
import Dropdown from '../../Service/Dropdown';
export class Values extends Component {

    constructor(props) {
        super(props);
        this.state={
            rings: [],
            selectedRingId: null,
            ringDetail: {},
            valuesdata:[]
           
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
                mentors:item.mentors,
                type: item.ringTypeName,
                status: item.status,
                description: item.description,
            }
        },this.GetValues);
      
    }

    GetValues(){
        
        var self=this;
        Service.GetValues(self).then((response => {
             this.setState({
                valuesdata:response.result
            })


        }))

    }


    render() {
        return (
            <div id="content" class="tab-content w-100" role="tablist" style={{padding:"0px 4% "}}>
                        <div class="d-flex align-items-center justify-content-between mb-5">
                    <div class="fs-3 breadcrumb d-flex align-items-center  ">
                        <span class="" style={{ fontSize: "28px" }}>Insights</span>
                        <span class="px-2 fs-3">&#62;</span>
                        <span class="text-dark font-bold" style={{ fontSize: "28px" }}>Values</span>
                    </div>
                </div>
                <div class="card-body">
                <div class="row">
                        <div class="col-lg-2 mb-3 mt-2 m-lg-0">
                            <div class="fs-5 text-dark font-bold pe-lg-4 pe-2 nowrap pt-lg-5 mt-2">Select program</div>
                        </div>
                        <div class="col-lg-10">
                            <table class="table ring-table">
                                <tr>
                                    <th style={{ width: "30%" }} class="font-bold heading-section p-3 nowrap"><span>Program Name</span></th>
                                    <th style={{ width: "10%" }} class="font-bold heading-section p-3"><span>Mentees</span></th>
                                    <th style={{ width: "10%" }} class="font-bold heading-section p-3"><span>Mentors</span></th>
                                    <th style={{ width: "10%" }} class="font-bold heading-section p-3"><span>Type</span></th>
                                    <th style={{ width: "10%" }} class="font-bold heading-section p-3"><span>Status</span></th>
                                    <th style={{ width: "30%" }} class="font-bold heading-section p-3"><span>Description</span></th>
                                </tr>

                                <tr class="bg-color p-2">
                                    <td class="p-3">
                                        <Dropdown isSearchable placeHolder="Select..." options={this.state.rings} selectedItem={this.state.ringDetail} onChangeItem={(val) => this.changeRing(val)} />
                                        {/*<select id="rings" styles={CustomStyle} defaultValue={this.state.selectedRingId} onChange={this.changeRing.bind(this)}>*/}
                                        {/*    {this.state.rings.map((obj, ind) => {*/}
                                        {/*        return (<option key={ind + 1} value={obj.id} >{obj.name}</option>)*/}
                                        {/*    })}*/}
                                        {/*</select>*/}
                                    </td>
                                    <td class="p-3">{this.state.ringDetail.mentees}</td>
                                    <td class="p-3">{this.state.ringDetail.mentors}</td>
                                    <td class="p-3">{this.state.ringDetail.type}</td>
                                    <td class="p-3">{this.state.ringDetail.status ? 'Active' : 'Inactive'}</td>
                                    <td class="p-3">{this.state.ringDetail.description}</td>
                                </tr>
                            </table>
                        </div>

                    </div>


                     </div>

                     <div class="col-lg-4 col-md-6 col-12">
                    <div class="border rounded p-4 mb-4">
                        <div class="font-bold mb-3 text-dark">Values Rank</div>
                     

                        {this.state.valuesdata.length ?
                            this.state.valuesdata.map((data, index) => {
                                return (

                                    <>
                                        <div class="d-flex align-items-center justify-content-between mb-3">
                                            <div class="Weekday">{data.key}</div>
                                            <div class="d-flex">{data.value}</div>
                                        </div>
                                    </>
                                )
                            }) :


                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <div class="Weekday">------ There is no Values ------ </div>
                            </div>





                        }

                    </div>
                </div>



                     </div>               

               



        )}




}