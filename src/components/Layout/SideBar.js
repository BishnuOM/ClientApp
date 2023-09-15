import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import SideBarMenu from './SideBarMenu';
import Service from '../../Service/Service';
import OrgImage from '../Layout/OrgImage';
import $ from 'jquery';

export class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            imageurl: "img/icons/Mentorz_logo.svg",
            AccessToken: '',
            photoId: '',
            activeId: '1',
            showRingmenu: false,
            showInsights: false,
            showCulture: false,
            showSettings: false,
            orgId:0,
            orgName: '',
            orgEmail: '',
            showOrgImg: false,
            OrgImgPopupHeader: '',
            orgimg: '',
            navBarStatus: false,
            prevShowRingmenu: false,
            prevShowCulture: false,
            prevShowInsights: false,
            prevShowSettings: false,
            selectedMenuItem: '',

            isHomeSelected: false,
            isRingSelected: false,
            isInSightSelected: false,
            isCultureSelected: false,
            isSettingSelected: false,
            isNotificationSelected: false,
        };
    }
    componentDidMount() {

        localStorage.setItem("OrganizationImage", "");
        let path = window.location.pathname.split('/');
        if (path && path.length > 1) {
            let ringmenu = this.expandedMenu('RingList,MentorBench,Templates,ringpolicies,Ring', path[1]);
            let culture; this.expandedMenu('steps,learning,measure', 'selectedMenu', path[1]);
            let insights = this.expandedMenu('Engagementkpi,Expertise,Interest,Values', path[1]);
            let settings = this.expandedMenu('Subscription,Billing,Feedback,Privacy,Support', path[1]);
            this.setState({
                selectedMenuItem: path[1],

                isHomeSelected: path[1].toLowerCase() == "home" ? true : false,
                isNotificationSelected: path[1].toLowerCase() == "notification" ? true : false,
                isRingSelected: ringmenu,
                isInSightSelected: insights,
                isCultureSelected: culture,
                isSettingSelected: settings,

                prevShowRingmenu: ringmenu,
                prevShowCulture: culture,
                prevShowInsights: insights,
                prevShowSettings: settings,
            });
        }
        var self = this;
        const data = JSON.parse(localStorage.getItem("login_data"));
        self.setState({
            AccessToken: data.token,
        }, self.GetOrganization)

    }

    componentWillReceiveProps(props) {
        if (props.navBarStatus) {
            setTimeout(() => {
                this.setState({
                    showRingmenu: this.state.prevShowRingmenu,
                    showCulture: this.state.prevShowCulture,
                    showInsights: this.state.prevShowInsights,
                    showSettings: this.state.prevShowSettings,
                    navBarStatus: true
                });
            }, 800);
        }
        else {
            setTimeout(() => {
                this.setState({
                    prevShowRingmenu: this.state.showRingmenu,
                    prevShowCulture: this.state.showCulture,
                    prevShowInsights: this.state.showInsights,
                    prevShowSettings: this.state.showSettings,

                    showRingmenu: false,
                    showCulture: false,
                    showInsights: false,
                    showSettings: false,
                    navBarStatus: false
                });
            }, 800);
        }
    }

    SetSelectedMenu(isHome, isRing, isInSight, isCulture, isSetting, isNotification, urlName) {
        if (urlName) {
            this.setState({
                isHomeSelected: isHome,
                isRingSelected: isRing,
                isInSightSelected: isInSight,
                isCultureSelected: isCulture,
                isSettingSelected: isSetting,
                isNotificationSelected: isNotification,
                showRingmenu: isRing,
                showCulture: isCulture,
                showInsights: isInSight,
                showSettings: isSetting,
                selectedMenuItem: urlName
            });
        }
        else {
            this.setState({
                showRingmenu: isRing,
                showCulture: isCulture,
                showInsights: isInSight,
                showSettings: isSetting,
            });
        }

       
        if (urlName!="") {
            $(".NavbarSection").addClass("hide_menu");
        }
    }

    GetOrganization() {
        var self = this;
        Service.GetOrganization(self).then((response => {
            if (response && response.result && response.result.length) {
                self.setState({
                    orgId: response.result[0].id,
                    orgName: response.result[0].orgName,
                    orgEmail: response.result[0].userEmail,
                    orgimg: response.result[0].photoId

                }, this.GetImage)
            }
        }))
    }

    GetImage() {
        Service.GetImageById(this.state.AccessToken, this.state.orgimg).then((res => {
            var imagedata = res ? ("data:image/png;base64," + res) : '';
            let orgDetail = {
                orgId: this.state.orgId,
                orgName: this.state.orgName,
                orgImg: (imagedata ? imagedata : this.state.imageurl)
                }
            localStorage.setItem("OrganizationDetail", JSON.stringify(orgDetail));
            if (imagedata != '') {
                this.setState({
                    imageurl: imagedata
                })
            }
        }))
    }

    Submenu_location = (name) => {
        window.location.replace(name.url);
    }

    showOrgImg = () => {
        this.setState({
            showOrgImg: true, OrgImgPopupHeader: 'Update Org Image'
        });
    }

    closeOrg = (img) => {
        if (img) {
            this.setState({
                imageurl: img
            })
        }
        this.setState({ OrgImgPopupHeader: '', showOrgImg: false });
    }

    selectedMenu = (value, newClass, existClass = '') => {
        if (this.state.selectedMenuItem) {
            let menus = value.split(',');
            return menus && menus.length && menus.filter(item => item == this.state.selectedMenuItem).length > 0 ? (newClass + ' ' + existClass) : existClass;
        }
        return existClass;
    }

    selectedMenuIcon = (value, selectedMenu, menu) => {
        if (this.state.selectedMenuItem) {
            let menus = value.split(',');
            return menus && menus.length && menus.filter(item => item == this.state.selectedMenuItem).length > 0 ? selectedMenu : menu;
        }
        return menu;
    }

    expandedMenu = (value, path) => {
        if (path) {
            let menus = value.split(',');
            return menus && menus.length && menus.filter(item => item.toLowerCase() == path.toLowerCase()).length > 0 ? true : false;
        }
        return false;
    }
  

    render() {
        return (
            <>
                <div>
                    <div className="row header_toggle mb-1" id="header-toggle">
                        <div className="col-3">
                            <a onClick={() => this.showOrgImg()}>
                                <img src={`${this.state.imageurl}`} alt="image" className="logo" />
                            </a>
                        </div>
                        <div className="col-8  nav-menu-name" >
                            <span title={this.state.orgName} className="nav_name nav_company_name nav_title mt-5" style={{ fontSize: "17px" }}>{this.state.orgName}</span><br />
                            <span title={this.state.orgEmail} className="Logotext nav_name nav_email" style={{ fontSize: "14px"}} >{this.state.orgEmail}</span>
                        </div>
                    </div>

                    <nav className="navigation">
                        <div className="nav_list">
                            <ul className="navbar-nav flex-grow">
                                <NavItem key="1" className="nav-menu-name">
                                    <NavLink key="11" className="nav-menu-name" tag={Link} to="/Home"
                                        onClick={() => this.SetSelectedMenu(true, false, false, false, false, false, 'Home')}>
                                        <span key="101"style={{ display: "inline-block" }} className="nav_icon nav_icon-span-w">
                                            <img src={this.state.isHomeSelected ? 'img/icons/SelectedHome.png' : 'img/icons/Home.png'} alt="image" className="nav_icon" />
                                        </span>
                                        <span key="102" className={ `nav_menu ${this.state.isHomeSelected ? 'selectedMenu nav_name nav-menu-name' : 'nav_name nav-menu-name'}`} title="Home">Home</span>
                                    </NavLink>
                                </NavItem>

                                <NavItem key="2" className="nav-menu-name">
                                    <NavLink key="21"  className="nav-menu-name"
                                        onClick={() => this.SetSelectedMenu(false, !this.state.showRingmenu, false, false, false, false, '')}>
                                        <span style={{ display: "inline-block" }} className="nav_icon nav_icon-span-w">
                                            <img src={this.state.isRingSelected ? 'img/icons/SelectedRing.png' : 'img/icons/Ring.png'}
                                                alt="image" className="nav_icon" />
                                        </span>
                                        <span title="Rings" className={`nav_menu ${this.state.isRingSelected ? 'selectedMenu nav_name nav-menu-name' : 'nav_name nav-menu-name'}`}>
                                            Programs
                                        </span>
                                        {/* <i style={{ marginTop: "5px", display: this.state.navBarStatus ? "block" : "none" }} className="bi bi-chevron-down navdownIcon" ></i> */}
                                        <i style={{ marginTop: "5px"}}  className={this.state.isRingSelected ? '  selectedMenu bi bi-chevron-up navdownIcon' : ' bi bi-chevron-down navdownIcon'} ></i>
                                    </NavLink>
                                    <div className="submenu"  style={{ display: this.state.showRingmenu ? "contents" : "none" }} >
                                        <ul   style={{ marginLeft: "30px" }}>
                                            {
                                                SideBarMenu.RingMenu.map((name, index) => {
                                                    return (
                                                        <li  title={name.name} key={name.id}><NavLink key={name.id + name.id} className={`nav-submenu ${this.state.navBarStatus == true ? this.selectedMenu(name.urlName, 'selectedMenu') : ''}`}
                                                            tag={Link} to={name.url}
                                                            onClick={() => this.SetSelectedMenu(false, true, false, false, false, false, name.urlName)} key={name.id + name.id}>{name.name} </NavLink></li>
                                                    )
                                                }
                                                )}
                                        </ul>
                                    </div>
                                </NavItem>

                                <NavItem key="3" className="nav-menu-name">
                                    <NavLink  className="nav-menu-name" key="33"
                                        onClick={() => this.SetSelectedMenu(false, false, !this.state.showInsights, false, false, false, '')}>
                                        <span style={{ display: "inline-block" }} className="nav_icon nav_icon-span-w">
                                            <img src={this.state.isInSightSelected ? "img/icons/SelectedInsight.png" : "img/icons/Insight.png"} alt="image" className="nav_icon" />
                                        </span>
                                        <span title="Insights" className={`nav_menu ${this.state.isInSightSelected == true ? 'selectedMenu nav_name nav-menu-name' : 'nav_name nav-menu-name'}`}>
                                            Insights
                                        </span>
                                        {/* <i style={{ marginTop: "5px", display: this.state.navBarStatus ? "block" : "none" }} className="bi bi-chevron-down navdownIcon" ></i> */}
                                        <i style={{ marginTop: "5px" }} className={this.state.isInSightSelected ? '  selectedMenu bi bi-chevron-up navdownIcon' : ' bi bi-chevron-down navdownIcon'} ></i>
                                    </NavLink>

                                    <div className="submenu" style={{ display: this.state.showInsights ? "contents" : "none" }}>
                                        <ul style={{ marginLeft: "30px" }}>
                                            {
                                                SideBarMenu.InsightsMenu.map((name, index) => {
                                                    return (
                                                        <li title={name.name} key={name.id}><NavLink key={name.id + name.id} className={`nav-submenu ${this.state.navBarStatus == true ? this.selectedMenu(name.urlName, 'selectedMenu') : ''}`}
                                                            tag={Link} to={name.url}
                                                            onClick={() => this.SetSelectedMenu(false, false, true, false, false, false, name.urlName)} key={name.id + name.id}>{name.name} </NavLink></li>
                                                    )
                                                }
                                                )}
                                        </ul>
                                    </div>
                                </NavItem>

                                <NavItem key="4" className="nav-menu-name">
                                    <NavLink key="41"  className="nav-menu-name"
                                        onClick={() => this.SetSelectedMenu(false, false, false, !this.state.showCulture, false, false, '')}>
                                        <span style={{ display: "inline-block" }} className="nav_icon nav_icon-span-w">
                                            <img src={this.state.isCultureSelected ? "img/icons/SelectedCulture.png" : "img/icons/Culture.png"} alt="image" className="nav_icon" />
                                        </span>
                                        <span title="Culture" className={`nav_menu ${this.state.isCultureSelected ? 'selectedMenu nav_name nav-menu-name' : 'nav_name nav-menu-name'}`}>
                                            Culture
                                        </span>
                                        {/* <i style={{ marginTop: "5px", display: this.state.navBarStatus ? "block" : "none" }} className="bi bi-chevron-down navdownIcon" ></i> */}
                                        <i style={{ marginTop: "5px" }} className={this.state.isCultureSelected ? '  selectedMenu bi bi-chevron-up navdownIcon' : ' bi bi-chevron-down navdownIcon'} ></i>
                                    </NavLink>
                                    <div style={{ display: this.state.showCulture ? "contents" : "none" }}>
                                        <ul style={{ marginLeft: "30px" }}>
                                            {
                                                SideBarMenu.CultureMenu.map((name, index) => {
                                                    return (
                                                        <li title={name.name} key={name.id}> <NavLink key={name.id + name.id} tag={Link} to={name.url} className={` nav-submenu ${this.state.navBarStatus == true ? this.selectedMenu(name.urlName, 'selectedMenu') : ''}`}
                                                            onClick={() => this.SetSelectedMenu(false, false, false, true, false, false, name.urlName)} key={name.id + name.id} >{name.name} </NavLink></li>
                                                    )
                                                }
                                                )}
                                        </ul>
                                    </div>
                                </NavItem>
                                <hr style={{ marginRight: "8px" }} />
                                <NavItem key="5" className="nav-menu-name">
                                    <NavLink key="51" className="nav-menu-name"
                                        onClick={() => this.SetSelectedMenu(false, false, false, false, !this.state.showSettings, false, '')}>
                                        <span style={{ display: "inline-block", position: "relative" }} className="nav_icon nav_icon-span-w">
                                            <img src={this.state.isSettingSelected == true ? 'img/icons/Settings_red.svg' : 'img/icons/settings.svg'} alt="settings" style={{ width: "30px", height: "30px" }} className="nav_icon" />
                                        </span>

                                        <span title="Settings" className={`nav_menu ${this.state.isSettingSelected ? 'selectedMenu nav_name nav-menu-name' : 'nav_name nav-menu-name'}`}>
                                            Settings
                                        </span>
                                        {/* <i style={{ marginTop: "5px", display: this.state.navBarStatus ? "block" : "none" }} className="bi bi-chevron-down navdownIcon" ></i> */}
                                        <i style={{ marginTop: "5px" }} className={this.state.isSettingSelected ? '  selectedMenu bi bi-chevron-up navdownIcon' : ' bi bi-chevron-down navdownIcon'} ></i>
                                    </NavLink>
                                    <div style={{ display: this.state.showSettings ? "contents" : "none" }}>
                                        <ul style={{ marginLeft: "30px" }}>
                                            {
                                                SideBarMenu.SettingsMenu.map((name, index) => {
                                                    return (
                                                        <li title={name.name} key={name.id} > <NavLink key={name.id + name.id} tag={Link} to={name.url} className={'submenu nav-submenu ' + (this.state.navBarStatus == true ? this.selectedMenu(name.urlName, 'selectedMenu ') : '')}
                                                            onClick={() => this.SetSelectedMenu(false, false, false, false, true, false, name.urlName)} key={name.id + name.id}>{name.name} </NavLink></li>
                                                    )
                                                }
                                                )}
                                        </ul>
                                    </div>
                                </NavItem>
                                <NavItem key="6" className="nav-menu-name">
                                    <NavLink key="61" className="nav-menu-name" tag={Link} to="/notification"
                                        onClick={() => this.SetSelectedMenu(false, false, false, false, false, true, 'notification')}>
                                        <span style={{ display: "inline-block" }} className="nav_icon nav_icon-span-w">
                                            <img src={this.state.isNotificationSelected ? 'img/icons/SelectedNotification.png' : 'img/icons/notification.svg'} alt="image" className="nav_icon" /></span>
                                        <span className={`nav_menu ${this.state.isNotificationSelected ? 'selectedMenu nav_name nav-menu-name' : 'nav_name nav-menu-name'}`} title="Notifications">Notifications</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem key="7" className="nav-menu-name">
                                    <NavLink key="71" className="nav-menu-name" tag={Link} to="/" onClick={(e) => this.props.logOut(false)}>
                                        <span style={{ display: "inline-block" }} className="nav_icon nav_icon-span-w">
                                            <img src="img/icons/logout.svg" alt="image" className="nav_icon" /></span>
                                        <span title="Logout" className="nav_name nav-menu-name nav_menu">Logout</span>
                                    </NavLink>
                                </NavItem>


                                {/*<NavItem key="8" className="nav-footer">*/}
                                {/*    <NavLink className="nav_link pt-1 nav-menu-name">*/}
                                {/*        <span className="nav_icon" style={{ marginTop: '20px' }}><img src="img/icons/Mentorz_logo.svg" alt="image" className="nav_icon" /></span>*/}
                                {/*        <span className="nav_name nav-menu-name">Mentorz Admin Center</span>*/}
                                {/*    </NavLink>*/}
                                {/*</NavItem>*/}

                                <NavItem key="8" className="nav-footer footer-li" style={{ borderBottomLeftRadius: "1.5rem", borderBottomRightRadius: "1.5rem" }}>
                                    <NavLink key="81" className="nav_link pt-1 nav-menu-name" style={{ display: "flex" }}>
                                        <span className="nav_footer_icon" >
                                            <img src="img/icons/Mentorz_logo_red_.svg" alt="image" className="nav_icon" />
                                        </span>
                                        <span title="Mentorz Admin Center" style={{ paddingTop: "20px", marginLeft: "-9px", marginRight: "15px" }} className="nav_name nav-menu-name">Mentorz Admin Center</span>
                                    </NavLink>
                                </NavItem>
                            </ul>
                        </div>
                    </nav>

                    {
                        this.state != null && this.state.showOrgImg == true && (
                            <OrgImage showOrgImg={this.state.showOrgImg} onCloseOrg={this.closeOrg}
                                popupHeader={this.state.OrgImgPopupHeader} imageData={this.state.imageurl}></OrgImage>
                        )
                    }

                </div>

                {/* <NavItem key="8" className="nav-footer">
                    <NavLink className="nav_link pt-1 nav-menu-name" style={{ display: "flex" }}>
                        <span className="nav_icon" style={{ marginTop: '20px' }}>
                            <img src="img/icons/Mentorz_logo_red_.svg" alt="image" className="nav_icon" />
                        </span>
                        <span title="Mentorz Admin Center" style={{ paddingTop: "20px", marginLeft: "-9px", marginRight: "15px" }} className="nav_name nav-menu-name">Mentorz Admin Center</span>
                    </NavLink>
                </NavItem> */}
            </>
        );
    }
}
