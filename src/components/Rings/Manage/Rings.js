import React, { Component } from 'react';
import { connect } from "react-redux";
import $ from 'jquery';


const mapStateToProps = (state) => {
    return {
       modal_name: state.modal.modal_name,
       ring_detail: state.ringReducer.ring_detail,
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
   // openmodla: (payload) => dispatch(modalActions.toggleModal('CreatChat')),
  });

class Rings extends Component {
    constructor(props) {
        super(props);
        this.state={
            manage:false,
            match:true,
            Active:false,
            activeId:"2"


        }


    }

    componentDidMount() {
        window.$('.input-range').each(function () {
            var value = $(this).attr('data-slider-value');
            var separator = value.indexOf(',');
            if (separator !== -1) {
                value = value.split(',');
                value.forEach(function (item, i, arr) {
                    arr[i] = parseFloat(item);
                });
            } else {
                value = parseFloat(value);
            }
            window.$(this).slider({
                formatter: function (value) {
                    //console.log(value);
                    return value;
                },
                min: parseFloat(window.$(this).attr('data-slider-min')),
                max: parseFloat(window.$(this).attr('data-slider-max')),
                range:window.$(this).attr('data-slider-range'),
                value: value,
                tooltip_split:window.$(this).attr('data-slider-tooltip_split'),
                tooltip:window.$(this).attr('data-slider-tooltip')
            });
        });

    }
    render() {
       return (
           <div class="height-95 pt-5 px-2 px-lg-5">
            <div class="conatiner">
                <div class="breadcrumb d-flex align-items-center fs-3 font-bold text-dark mb-5">
                    <span>Programs</span>
                </div>
                <div class="row">
                    <div class="col-lg-8 offset-lg-2">
                        <div class="px-2 px-lg-5">
                            <ul class="nav nav-tabs px-4 d-flex align-items-center justify-content-between" id="myTab"
                                role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button className={`nav-link lh-base  ${this.state.activeId === "1" ? "active" : "inactive"}`}
                                     style={{ border: "none", cursor: 'pointer' }}
                                        onClick={(e) => {
                                            this.setState({manage:true, match: false,Active:false,activeId:"1"});
                                                                                                                   
                                               }}
                                       type="button" 
                                        >Manage</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button className={`nav-link lh-base  ${this.state.activeId === "2" ? "active" : "inactive"}`}
                                     style={{ border: "none", cursor: 'pointer' }}
                                      onClick={(e) => {
                                        this.setState({manage:false, match: true,Active:false,activeId:"2"});
                                                                                                               
                                           }}
                                        type="button" 
                                        >Match</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button className={`nav-link lh-base  ${this.state.activeId === "3" ? "active" : "inactive"}`}
                                     style={{ border: "none", cursor: 'pointer' }}
                                        onClick={(e) => {
                                            this.setState({manage:false, match:false,Active:true,activeId:"3"});
                                                                                                                   
                                               }}
                                         type="button" 
                                       >Active</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade w-100 pb-5"  style={{ display: this.state.manage ? "contents" : "none" }} >
                     
                        <div class="fs-6 font-bold text-dark mt-4">Manage</div>
                    </div>
                    <div class="tab-pane fade w-100 pb-5 show active" style={{ display: this.state.match ? "contents" : "none" }}>
                      
                        <div class="row">
                            <div class="col-lg-8 offset-lg-2">
                                <div class="d-flex align-items-center justify-content-center my-4">
                                    <div class="search d-inline-flex align-items-center ps-3 py-1 w-50">
                                        <i class="bi bi-search text-dark"></i>
                                        <input type="text" class="form-control bg-transparent border-0"
                                            placeholder="Search for a ring" name="" />
                                    </div>
                                    <div class="px-3">
                                        <div class="dropdown list-dropdown cursor-pointer">
                                            <div class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{width:"40px"}}>
                                                <i class="bi bi-filter fs-2"></i>
                                            </div>
                                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                              <li><a class="dropdown-item py-2" href="#">Action</a></li>
                                              <li><a class="dropdown-item py-2" href="#">Another action</a></li>
                                              <li><a class="dropdown-item py-2" href="#">Something else here</a></li>
                                            </ul>
                                          </div>
                                    </div>
                                    <button type="reset" class="btn btn-app py-2 px-5">Search</button>
                                </div>
                            </div>
                        </div>
                        <div class="row pt-3">
                            <div class="col-lg-4 col-md-6 mb-3">
                                <div class="border rounded p-4">
                                    <div class="fa-6 font-bold mb-3 text-dark">Interests</div>
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="form-check d-flex align-items-center mb-2">
                                            <input class="form-check-input" type="radio" name="interests"
                                                id="retail"/>
                                            <label class="form-check-label ps-2 pt-1" for="retail">
                                                Retail
                                            </label>
                                        </div>
                                        <div class="font-medium">103</div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="form-check d-flex align-items-center mb-2">
                                            <input class="form-check-input" type="radio" name="interests"
                                                id="fintech"/>
                                            <label class="form-check-label ps-2 pt-1" for="fintech">
                                                Fintech
                                            </label>
                                        </div>
                                        <div class="font-medium">23</div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="form-check d-flex align-items-center mb-2">
                                            <input class="form-check-input" type="radio" name="interests"
                                                id="design" defaultChecked={true}/>
                                            <label class="form-check-label ps-2 pt-1" for="design">
                                                Design
                                            </label>
                                        </div>
                                        <div class="font-medium">12</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 mb-3">
                                <div class="border rounded p-4">
                                    <div class="fa-6 font-bold mb-3 text-dark">Filter by Years of Experience</div>
                                    <div class="d-flex align-items-center justify-content-between py-3 position-relative mt-4">
                                        <div class="slider-wrapper w-100">
                                            <input className='input-range' data-slider-id='ex12cSlider' type="text"
                                                data-slider-step="1" data-slider-value="1, 6" data-slider-min="0"
                                                data-slider-max="10" data-slider-range={true}
                                                data-slider-tooltip_split={true} />
                                        </div>
                                    </div>
                                    <div class="row py-2">
                                        <div class="col-md-6">
                                            <div class="custom-form-group">
                                                <input type="text" class="form-control" id="min" name="min"/>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="custom-form-group">
                                                <input type="text" class="form-control" id="max" name="max"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 mb-3">
                                <div class="border rounded p-4">
                                    <div class="fa-6 font-bold mb-3 text-dark">Timezone</div>
                                    <div class="form-check d-flex align-items-center mb-2">
                                        <input class="form-check-input" type="radio" name="timezone" id="pst"
                                          defaultChecked={true}/>
                                        <label class="form-check-label ps-2 pt-1" for="pst">
                                            Pacific Standard Time (PST)
                                        </label>
                                    </div>
                                    <div class="form-check d-flex align-items-center mb-2">
                                        <input class="form-check-input" type="radio" name="timezone" id="ct"/>
                                        <label class="form-check-label ps-2 pt-1" for="ct">
                                            Central Time (CT)
                                        </label>
                                    </div>
                                    <div class="form-check d-flex align-items-center mb-2">
                                        <input class="form-check-input" type="radio" name="timezone" id="est"/>
                                        <label class="form-check-label ps-2 pt-1" for="est">
                                            Easter Standard Time (EST)
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 mb-4">
                                <div class="border rounded p-4">
                                    <div class="fa-6 font-bold mb-3 text-dark">Experience Level</div>
                                    <div class="form-check d-flex align-items-center mb-2">
                                        <input class="form-check-input" type="radio" name="experience"
                                            id="senior"/>
                                        <label class="form-check-label ps-2 pt-1" for="senior">
                                            Senior
                                        </label>
                                    </div>
                                    <div class="form-check d-flex align-items-center mb-2">
                                        <input class="form-check-input" type="radio" name="experience"
                                            id="mid_level"/>
                                        <label class="form-check-label ps-2 pt-1" for="mid_level">
                                            Mid-Level
                                        </label>
                                    </div>
                                    <div class="form-check d-flex align-items-center mb-2">
                                        <input class="form-check-input" type="radio" name="experience" id="junior"
                                          defaultChecked={true} />
                                        <label class="form-check-label ps-2 pt-1" for="junior">
                                            Junior
                                        </label>
                                    </div>
                                    <div class="form-check d-flex align-items-center mb-2">
                                        <input class="form-check-input" type="radio" name="experience" id="intern"
                                        defaultChecked={true} />
                                        <label class="form-check-label ps-2 pt-1" for="intern">
                                            Intern
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 mb-4">
                                <div class="border rounded p-4">
                                    <div class="fa-6 font-bold mb-3 text-dark">Department</div>
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="form-check d-flex align-items-center mb-2">
                                            <input class="form-check-input" type="checkbox" name="design"
                                                id="design" defaultChecked={true} />
                                            <label class="form-check-label ps-2 pt-1" for="design">
                                                Design
                                            </label>
                                        </div>
                                        <div class="font-medium">11</div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="form-check d-flex align-items-center mb-2">
                                            <input class="form-check-input" type="checkbox" name="engineering"
                                                id="engineering" />
                                            <label class="form-check-label ps-2 pt-1" for="engineering">
                                                Engineering
                                            </label>
                                        </div>
                                        <div class="font-medium">23</div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="form-check d-flex align-items-center mb-2">
                                            <input class="form-check-input" type="checkbox" name="hr"
                                                id="hr" />
                                            <label class="form-check-label ps-2 pt-1" for="hr">
                                                HR
                                            </label>
                                        </div>
                                        <div class="font-medium">12</div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="form-check d-flex align-items-center mb-2">
                                            <input class="form-check-input" type="checkbox" name="management"
                                                id="management" />
                                            <label class="form-check-label ps-2 pt-1" for="management">
                                                Management
                                            </label>
                                        </div>
                                        <div class="font-medium">04</div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="form-check d-flex align-items-center mb-2">
                                            <input class="form-check-input" type="checkbox" name="marketing"
                                                id="marketing" />
                                            <label class="form-check-label ps-2 pt-1" for="marketing">
                                                Marketing
                                            </label>
                                        </div>
                                        <div class="font-medium">22</div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="form-check d-flex align-items-center mb-2">
                                            <input class="form-check-input" type="checkbox" name="recruiting"
                                                id="recruiting" />
                                            <label class="form-check-label ps-2 pt-1" for="recruiting">
                                                Recruiting
                                            </label>
                                        </div>
                                        <div class="font-medium">102</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 mb-4">
                                <div class="border rounded p-4">
                                    <div class="fa-6 font-bold mb-3 text-dark">Pronouns</div>
                                    <div class="form-check d-flex align-items-center mb-2">
                                        <input class="form-check-input" type="radio" name="pronouns" id="ps1"
                                            defaultChecked={true} />
                                        <label class="form-check-label ps-2 pt-1" for="ps1">
                                            She/Her/Hers
                                        </label>
                                    </div>
                                    <div class="form-check d-flex align-items-center mb-2">
                                        <input class="form-check-input" type="radio" name="pronouns" id="ps2"/>
                                        <label class="form-check-label ps-2 pt-1" for="ps2">
                                            He/Him/His
                                        </label>
                                    </div>
                                    <div class="form-check d-flex align-items-center mb-2">
                                        <input class="form-check-input" type="radio" name="pronouns" id="ps3"/>
                                        <label class="form-check-label ps-2 pt-1" for="ps3">
                                            They/Them/Their
                                        </label>
                                    </div>
                                    <div class="form-check d-flex align-items-center mb-2">
                                        <input class="form-check-input" type="radio" name="pronouns" id="ps4"/>
                                        <label class="form-check-label ps-2 pt-1" for="ps4">
                                            Prefer Not to Say
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade w-100 pb-5" style={{ display: this.state.Active ? "contents" : "none" }}>
                        <div class="fs-6 font-bold text-dark mt-4">Active</div>
                    </div>

                </div>
            </div>
        </div>






        )
    
    
    
    
    
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Rings);