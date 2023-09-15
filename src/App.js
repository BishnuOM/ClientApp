import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import store from './redux/sagas/store';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout/Layout';
import './custom.css';
import { msalConfig } from './authConfig';
import { AzureService } from "./AzureService"

let User=JSON.parse(localStorage.getItem('login_data'));

const generate_uuidv4=()=> {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    function(c) {
       var uuid = Math.random() * 16 | 0, v = c === 'x' ? uuid : (uuid & 0x3 | 0x8);
       return uuid.toString(16);
    });
  }

  const pubnub = new PubNub({
    publishKey:process.env.REACT_APP_PUB_KEY,//'pub-c-3784fe38-e277-44f4-90a6-8550bbfe3d56',
    subscribeKey:process.env.REACT_APP_SUB_KEY,
    secretKey: process.env.REACT_APP_SECRET_KEY,
    uuid:  User?.pubNubUserId ? User?.pubNubUserId : generate_uuidv4(),//"pn_0BFAB2E2-B014-4E28-9740-E016A7AAF76F",//'pn_76e81f63-1e5d-47dd-82e2-c329ae335629',
  });

  
export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);
        localStorage.setItem("REACT_APP_client_id", msalConfig.clientId);
        localStorage.setItem("REACT_APP_client_secret", msalConfig.client_secret);
        // AzureService.ExpireCheck();
        let loginStatus = localStorage.getItem("LogInStatus");
        let path = window.location.pathname.split('/');

       
        this.state = {
            loginStatus: loginStatus ? parseInt(loginStatus) : 0,
            appRoutes: AppRoutes && AppRoutes.length ? loginStatus == 1 ? AppRoutes :
                path && path.length >= 2
                    ? AppRoutes.filter(item => (item.path.toLowerCase() == ("/" + path[1].toLowerCase())) || ((item.path.split('/').length == 3 || item.path.split('/').length == 4) && item.path.split('/')[1].toLowerCase() == path[1].toLowerCase())) : [AppRoutes[0]] : [],
        }
        if ((!loginStatus || parseInt(loginStatus) == 0)) {
            if (path && path.length && path[1] && path[1].toLowerCase() != "signup" && path[1].toLowerCase() != "linkedin" && path[1].toLowerCase() != "ringrequest" && path[1].toLowerCase() != "mentorrequest" && path[1].toLowerCase() != "loginrequest"
                && path[1].toLowerCase() != "mobileloginrequest" && path[1].toLowerCase() != "forgotpassword" && path[1].toLowerCase() != "changepassword") {
                window.location.replace('/');
            }
        }
        else {
            this.setState({ appRoutes: AppRoutes });
        }
    }
    render() {
        return (
             
            <Layout loginStatus={this.state.loginStatus} >
                
                <Provider store={store}>
                        <Routes>
                            {this.state.appRoutes.map((route, index) => {
                                const { element, ...rest } = route;
                                return <Route key={index} {...rest} element={element} />;
                            })}
                        </Routes>
                </Provider>
               
            </Layout>

        );
    }
}
