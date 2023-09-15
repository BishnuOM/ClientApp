import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
//import { Home } from "./components/Home";


import { Login } from './components/Login/Login';
import { LoginRequest } from './components/Login/LoginRequest';
import { MobileLoginRequest } from './components/Login/MobileLoginRequest';


import { Layout } from './components/Layout/Layout';
import { Home } from './components/Home/Home';


/*Ring Components*/
import  RingList  from './components/Rings/Manage/RingsList';
import { RingManage } from './components/Rings/Manage/RingManage';
import { AddManage } from './components/Rings/Manage/AddManage';
import { ManageSettings } from './components/Rings/Manage/AddMangetabs/ManageSettings/Settings';
import  Rings  from './components/Rings/Manage/Rings';
import ChatList from './components/Rings/Manage/ChatList';
import  {ChatMessages}  from "./components/Rings/ChatMessages";

import { EditManage } from './components/Rings/Manage/EditManage';
import { RingPolicies } from './components/Rings/Policies/ringpolicies';
import { Templates } from './components/Rings/Templetes/Templates';
import { ViewManage } from './components/Rings/Manage/ViewManage';
import { MentorBench } from './components/Rings/Mentors bench/MentorBench';
import { MentorBenchNew } from './components/Rings/Mentors bench/MentorBenchNew';


/*Insignts Components*/
import { Insights } from './components/Insights/insights';
import { EngagementKpi } from './components/Insights/Engagementkpi';
import { Expertise } from './components/Insights/Expertise';
import { Interest } from './components/Insights/Interest';
import { Values } from './components/Insights/Value';

/*Culture Components*/
import { Culture } from './components/Culture/culture';
import { Steps } from './components/Culture/Steps';
import { Learning } from './components/Culture/Learning';
import { Measure } from './components/Culture/Measure';

/*Settings Components*/
import { Settings } from './components/Settings/Settings';
import { Subscription } from './components/Settings/Subscription';
import { Product } from './components/Settings/Product';
import { Feedback } from './components/Settings/Feedback';
import { Privacy } from './components/Settings/Privacy';
import { Support } from './components/Settings/Support';
import Billing from './components/Settings/Billing';
import Invoices from './components/Settings/InvoiceList';

/*Notification Components*/
import { Notification } from './components/Notification/Notification';

/*Signup  Components*/
import { Signup } from './components/SignUp/Signup';
/*LinkedIn  Components*/
import { LinkedIn } from './components/LinkedInReturnPage/LinkedIn';

/*Password  Components*/
import { ForgotPassword } from './components/Password/ForgotPassword';
import { ChangePassword } from './components/Password/ChangePassword';
import { RingRequestStatus } from './components/Rings/RingRequest/RingRequestStatus';
import { MentorRequestStatus } from './components/Rings/Mentors bench/MentorRequestStatus';
import { elements } from "chart.js";

// Message Component
import { Chat } from './components/Message/Chat';



const AppRoutes = [
    {
        index: true,
        path: '/',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />
    },

    /*Ring Routes*/
    {
        path: '/RingList',
        element: <RingList />
    },
    {
        path: '/Ring',
        element: <RingManage />
    },
    {
        path: '/Ring/:ringId',
        element: <RingManage />
    },
    {
        path: '/AddManage',
        element: <AddManage />
    },
    {
        path: '/ManageSettings',
        element: <ManageSettings />
    },
    {
        path: '/Rings',
        element: <Rings />
    },
    {
        path: '/EditManage',
        element: <EditManage />
    },
    {
        path: '/RingPolicies',
        element: <RingPolicies />
    },
    {
        path: '/Templates',
        element: <Templates />
    },
    {
        path: '/ViewManage',
        element: <ViewManage />
    },
    {
        path: '/MentorBench',
        element: <MentorBench />
    },

    {
        path: '/MentorBenchNew',
        element: <MentorBenchNew />
    },
   
    /*Insights Routes*/
    {
        path: '/Insights',
        element: <Insights />
    },
    {
        path: '/EngagementKpi',
        element: <EngagementKpi />
    },
    {
        path: '/Expertise',
        element: <Expertise />
    },
    {
        path: '/Interest',
        element: <Interest />
    },
    {
        path: '/Values',
        element: <Values />
    },

    /*Culture Routes*/
    {
        path: '/Culture',
        element: <Culture />
    },
    {
        path: '/Steps',
        element: <Steps />
    },
    {
        path: '/Learning',
        element: <Learning />
    },
    {
        path: '/Measure',
        element: <Measure />
    },

    /*Settings Routes*/
    {
        path: '/Settings',
        element: <Settings />
    },
    {
        path: '/Billing',
        element: <Billing />
    },
    {
        path: '/Billing/Invoices',
        element: <Invoices />
    },
    {
        path: '/Feedback',
        element: <Feedback />
    },
    {
        path: '/Privacy',
        element: <Privacy />
    },
    {
        path: '/Subscription',
        element: <Subscription />
    },
    {
        path: '/Support',
        element: <Support />
    },

    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/notification',
        element: <Notification />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/LinkedIn',
        element: <LinkedIn />
    },
    {
        path: '/ForgotPassword',
        element: <ForgotPassword />
    },
    {
        path: '/ChangePassword/:email',
        element: <ChangePassword />
    },
    {
        path: '/RingRequest/:requestId/:requestStatus',
        element: <RingRequestStatus />
    },
    {
        path: '/MentorRequest/:requestId/:requestStatus',
        element: <MentorRequestStatus />
    },
    {
        path: '/LoginRequest/:requestId',
        element: <LoginRequest />
    },
    {
        path: '/MobileLoginRequest/:requestId',
        element: <MobileLoginRequest />
    },
    {
        path:'/chat/:ringchatId', 
        element:<Chat />
    },
    {
       // path:'/ChatList/:ringchatId', 
        path:'/ChatList/:ringchatId', 
        element:<ChatList />
    },
    {
        path:'/ChatMessages/:ringchatId/:ringId', 
        element:<ChatMessages />
    },
    
    {
        path: '/Product/:productId',
        element: <Product />
    },
];

export default AppRoutes;
