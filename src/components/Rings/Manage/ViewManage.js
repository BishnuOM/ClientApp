import React, { Component } from 'react';

export class ViewManage extends Component {
    constructor(props) {
        super(props);
        this.state={
            mentors:true,
            mentees:false,
            Viewall:false,
            activeId:"1"

        }
    }

    render(){
    return(
        <div class="height-95 pt-5 px-4 px-lg-5">
            <div class="breadcrumb d-flex align-items-center fs-3 font-bold text-dark mb-5">
                <span>Programs</span>
                <span class="px-2 fs-5"><i class="bi bi-chevron-right"></i></span>
                <span>Manage</span>
                <span class="px-2 fs-5"><i class="bi bi-chevron-right"></i></span>
                <span>Design II</span>
            </div>
            <div class="conatiner">
                <div class="col-lg-8 col-12">
                    <div class="view-manage">
                        <div class="fs-5 font-bold lh-base text-center text-dark py-4">Designer II</div>
                        <div class="px-lg-5">
                            <ul class="nav nav-tabs px-4 d-flex align-items-center justify-content-between" id="myTab"
                                role="tablist">
                                <li class="nav-item" >
                                    <button  className={`nav-link lh-base ${this.state.activeId === "1" ? "nav-link lh-base active" : "nav-link lh-base"}`}
                                     onClick={(e) => {
                                    this.setState({mentors:true, mentees: false,Viewall:false,activeId:"1"});
                                                                                                           
                                       }}
                                       
                                        type="button"  >Mentors</button>
                                       
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button className={`nav-link lh-base ${this.state.activeId === "2" ? "nav-link lh-base active" : "nav-link lh-base"}`}
                                     onClick={(e) => {
                                        this.setState({mentors:false, mentees: true,Viewall:false,activeId:"2"});
                                                                                                               
                                           }}
                                       type="button" role="tab" 
                                        >Mentees</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button className={`nav-link lh-base ${this.state.activeId === "3" ? "nav-link lh-base active" : "nav-link lh-base"}`}
                                      onClick={(e) => {
                                        this.setState({mentors:false, mentees: false,Viewall:true,activeId:"3"});
                                                                                                               
                                           }}
                                         type="button" role="tab" 
                                        >View All</button>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade w-100 show pb-5" style={{ display: this.state.mentors ? "contents" : "none" }}>
                                    <div class="fs-6 font-bold text-dark mt-4 ps-3 ps-lg-0">Members</div>
                                    <div class="table-responsive">
                                        <table class="table">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">Thomas Allen</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentor</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">John Blakely</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentor</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">Nina Carter</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentor</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">Leila Gilani</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentor</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">Jerry Harry</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentor</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">John Smith</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentor</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="tab-pane fade w-100 pb-5" style={{ display: this.state.mentees ? "contents" : "none" }}>
                                <div class="fs-6 font-bold text-dark mt-4 ps-3 ps-lg-0">Members</div>
                                    <div class="table-responsive">
                                        <table class="table">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">Thomas Allen</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentee</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">John Blakely</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentee</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">Nina Carter</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentee</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">Leila Gilani</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentee</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">Jerry Harry</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentee</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">John Smith</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentee</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="tab-pane fade w-100 pb-5" style={{ display: this.state.Viewall ? "contents" : "none" }}>
                                <div class="fs-6 font-bold text-dark mt-4 ps-3 ps-lg-0">Members</div>
                                    <div class="table-responsive">
                                        <table class="table">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">Thomas Allen</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentor</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">John Blakely</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentee</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">Nina Carter</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentor</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">Leila Gilani</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentee</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">Jerry Harry</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentee</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="d-flex align-items-center py-3">
                                                            <div class="table-profile-pic p-1 px-2">
                                                                <img src="img/pic.png" alt=""
                                                                    class="image-fluid" />
                                                            </div>
                                                            <div class="fs-6 ps-4">
                                                                <div class="font-medium lh-sm">John Smith</div>
                                                                <div class="font-light lh-base">+4 648 728 3839
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Mentor</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
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