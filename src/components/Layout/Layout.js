import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { SideBar } from './SideBar';
import $ from 'jquery';
import { useLocation } from "react-router";

export class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navmenu_show: false,
            isEntered: false,
            menu: '',
            menuShow:''
        }
    }

    componentDidMount() {
        let width = window.innerWidth;

        if (width <= 1199) {
            this.state.menuShow = "hide_menu";
        }
        //$(document).ajaxStart(function () {
        //    $("#AjaxLoader").show();
        //});
        
        //$(document).ajaxStop(function () {
        //    $("#AjaxLoader").hide();
        //});
        let path = window.location.pathname.split('/');
        if (path && path.length >= 2) {
            this.setState({ menu: path[1].toLowerCase() });
        }

        if ((path && path.length >= 2 && (!path[1] || (path[1] && (path[1].toLowerCase() == "signup" || path[1].toLowerCase() == "linkedin" || path[1].toLowerCase() == "forgotpassword" || path[1].toLowerCase() == "changepassword" || path[1].toLowerCase() == "ringrequest" || path[1].toLowerCase() == "mentorrequest" || path[1].toLowerCase() == "loginrequest" || path[1].toLowerCase() == "mobileloginrequest" )))) || this.props.loginStatus==0) {
            this.setState({ navmenu_show: false });
            if (path[1] && path[1].toLowerCase() != "signup" && path[1].toLowerCase() != "linkedin" && path[1].toLowerCase() != "forgotpassword" && path[1].toLowerCase() != "mentorrequest" && path[1].toLowerCase() != "loginrequest" && path[1].toLowerCase() != "mobileloginrequest"
                && path[1].toLowerCase() != "changepassword" && path[1].toLowerCase() != "ringrequest" && this.props.loginStatus == 0) {
                window.location.replace('/');
            }
            else if ((!path[1] || (path[1] && (path[1].toLowerCase() == "signup" || path[1].toLowerCase() == "linkedin" || path[1].toLowerCase() == "forgotpassword" || path[1].toLowerCase() == "changepassword" || path[1].toLowerCase() == "ringrequest" || path[1].toLowerCase() == "mentorrequest" || path[1].toLowerCase() == "loginrequest" || path[1].toLowerCase() == "mobileloginrequest"))) && this.props.loginStatus > 0) {
                localStorage.setItem("LogInStatus", "0");
            }
        } else {
            this.setState({ navmenu_show: true })
        }
       
    }

    logOut = (isLogOut) => {
        this.setState({ navmenu_show: isLogOut, menu:'' });
        localStorage.setItem("LogInStatus", "0");
        localStorage.clear();
    }

    navBarMouseEnter = () => {
        this.setState({ isEntered: true });
    }

    navBarMouseLeave = () => {
        this.setState({ isEntered: false });
    }
    SideMenu = () => {
        $(".NavbarSection").toggleClass("hide_menu");
    }

    //async componentDidUpdate(prevProps) {
    //    alert(1);
    //    debugger;
    //    if (this.props.location.pathname !== prevProps.location.pathname) {
    //        //route has been changed. do something here
    //        alert(1);
    //    }
    //}
    

  render() {
    return (
        <>
            
            {!this.state.navmenu_show ? 
                <div className="grow w-100" style={{ height: "100vh" }}>
                    {this.state != null && !this.state.menu && (
                        <div className="main col-12  h-100 login-main-div">
                            {this.props.children}
                        </div>
                    )}
                    {this.state != null && this.state.menu && (
                        <div className="main col-12  h-100">
                            {this.props.children}
                        </div>
                    )}
                </div>
                :
                <div className="row grow w-100"   >
                    <span onClick={() => this.SideMenu()} className="menu-icon"><img src="img/navicon-round-icon.png" /> </span>
                   {/* className="l-navbar sidenav" id="nav-bar"*/}
                    <div className= {"NavbarSection " + this.state.menuShow}  onMouseEnter={() => this.navBarMouseEnter()} onMouseLeave={() => this.navBarMouseLeave()} >
                        <div className="bg-gradient sidenav" >
                            <SideBar logOut={this.logOut} navBarStatus={this.state.isEntered} />
                        </div>
                    </div>
                    <div className="main h-100 py-3 MainBody">
                        <div className="loader" id="AjaxLoader" style={{ display: "none" }}>
                            <img alt="image" src="img/Loader.gif" />
                        </div> 
                        {this.props.children}
                    </div>
                </div>
        }
        </>
    );
  }
}
