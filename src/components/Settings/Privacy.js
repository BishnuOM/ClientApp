import React, { Component } from 'react';
import $ from 'jquery';
import Service from '../../Service/Service';

import Swal from "sweetalert2";

export class Privacy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NotificationsTab: true,
            SubscriptionTab: false,
            BillingTab: false,
            FeedbackTab: false,
            PrivacyTab: false,
            SupportTab: false,
            activeId: "1",
            getprivacy: '',
            AccessToken: '',
            getsupport: [],
            getsupportemail: [],
            feedbackrating: '',
            feedbackmsg: ''
        }

    }

    componentDidMount() {
        var self = this;
        const data = JSON.parse(localStorage.getItem("login_data"));
        self.setState({
            userid: data.id,
            AccessToken: data.token,
        }, self.getprivacy)
    }

    getprivacy() {
        var self = this;
        self.MenuType = "Privacy";
        Service.GetSettings(self).then((response => {
            self.setState({
                getprivacy: response[0].description
            })
        })).catch(function (error) {
            alert(JSON.stringify(error));
        });;
    }




    render() {
        return (

            <div class="height-95 pt-5 px-lg-5 px-2">
                <div class="conatiner">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="fs-3 breadcrumb d-flex align-items-center  ">
                            <span class="" style={{ fontSize: "28px" }}>Settings</span>
                            <span class="px-2 fs-3">&#62;</span>
                            <span class="text-dark font-bold" style={{ fontSize: "28px" }}>Privacy</span>
                        </div>
                        <img src="img/privacy.png" alt="" class="img-fluid" />
                    </div>
                    <div class="container responsive-tabs tab-content w-100 tablist"
                        ref={(node) => {
                            if (node) {
                                node.style.setProperty("margin-left", "0px", "important");
                                node.style.setProperty("padding-left", "0px", "important");
                            }
                        }} >
                        <div class="fs-5 text-dark font-bold">Mentorz Privacy Policy</div>

                        <div style={{ marginTop: "45px" }} class="container responsive-tabs">
                            <div id="content" class="tab-content w-100" role="tablist">

                                <div class="card-body">
                                    <p style={{ marginTop: "-55px", marginLeft: "-58px" }} class="text-dark lh-sm fs-5 mb-4 ">
                                        This privacy policy has been compiled to better serve those who are concerned with how their 'Personally Identifiable Information' (PII) is being used online.
                                        PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact,
                                        or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect,
                                        use, protect or otherwise handle your Personally Identifiable Information in accordance with our website and apps. </p>

                                    <p style={{ marginLeft: "-58px" }} class="text-dark lh-sm fs-5 mb-4 ">
                                        What personal information do we collect from the people that register our website or apps?<br />
                                        When registering on our app, as appropriate, you may be asked to enter your name, email address, interests, values, expertise, birthday or other details to help you with your experience.

                                    </p>

                                    <p style={{ marginLeft: "-58px" }} class="text-dark lh-sm fs-5 mb-4 ">
                                        When do we collect information?<br />
                                        We collect information from you when you register, fill out forms or enter information on our website or apps.


                                    </p>
                                    <p style={{ marginLeft: "-58px" }} class="text-dark lh-sm fs-5 mb-4 ">
                                        How do we use your information?<br />
                                        We may use the information we collect from you when you register, accept mentorship requests, make mentorship requests, follow others, mark content as favorite,
                                        sign up for our newsletter, respond to a survey or marketing communication, or use certain other website or app features in the following ways:

                                    </p>

                                    <p style={{ marginLeft: "-58px" }} class="text-dark lh-sm fs-5 mb-4 ">
                                        To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br />
                                        To improve our app in order to better serve you.<br />
                                        To allow us to better service you in responding to your customer service requests.<br />
                                        To administer a contest, promotion, survey or other app feature.<br />
                                        To quickly process your transactions.<br />
                                        To ask for ratings and reviews of services or mentorship calls <br />
                                        To follow up with them after correspondence (live chat, email or phone inquiries) <br />
                                        How do we protect your information? <br />
                                        We do not use vulnerability scanning and/or scanning to PCI standards. An external PCI compliant payment gateway handles all CC transactions. We use regular Malware Scanning.
                                    </p>

                                    <p style={{ marginLeft: "-58px" }} class="text-dark lh-sm fs-5 mb-4 ">
                                        Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology. We implement a variety of security measures when a user enters, submits, or accesses their information to maintain the safety of your personal information.<br /> <br />
                                        All transactions are processed through a gateway provider and are not stored or processed on our servers.<br /> <br />
                                        Do we use 'cookies'? <br />
                                        We do not use cookies for tracking purposes <br /> <br />
                                        You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies.<br /> <br />
                                        If you turn cookies off, some of the features that make your app experience more efficient may not function properly. That make your app experience more efficient and may not function properly.<br /> <br />
                                        Third-party disclosure <br />
                                        We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information (PII) unless we provide users with advance notice. This does not include app hosting partners and other parties who assist us in operating our app, conducting our business, or serving our users, so long as those parties agree to keep this information confidential. We may also release information when it's release is appropriate to comply with the law, enforce our app policies, or protect ours or others' rights, property or safety <br /> <br />
                                        However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses. <br /> <br />
                                        Third-party links<br />
                                        We do not include or offer third-party products or services on our app.<br /> <br />
                                        Google <br />
                                        Google's advertising requirements can be summed up by Google's Advertising Principles. They are put in place to provide a positive experience for users. https://support.google.com/adwordspolicy/answer/1316548?hl= <br />
                                        We use Google AdSense Advertis <br /> <br />
                                        Google, as a third-party vendor, uses cookies to serve ads on our app. Google's use of the DART cookie enables it to serve ads to our users based on previous visits to our app and other apps on the Internet. Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.<br /> <br />
                                        We have implemented the following:<br />
                                        We, along with third-party vendors such as Google use first-party cookies (such as the Google Analytics cookies) and third-party cookies (such as the DoubleClick cookie) or other third-party identifiers together to compile data regarding user interactions with ad impressions and other ad service functions as they relate to our app.
                                        Opting out:<br /> <br />
                                        Users can set preferences for how Google advertises to you using the Google Ad Settings page. Alternatively, you can opt out by visiting the Network Advertising Initiative Opt Out page or by using the Google Analytics Opt Out Browser add on.<br /><br />
                                        California Online Privacy Protection Act<br />
                                        CalOPPA is the first state law in the nation to require commercial apps and online services to post a privacy policy. The law's reach stretches well beyond California to require any person or company in the United States (and conceivably the world) that operates apps collecting Personally Identifiable Information from California consumers to post a conspicuous privacy policy on its app stating exactly the information being collected and those individuals or companies with whom it is being shared. - See more at: http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf <br /><br />

                                        According to CalOPPA, we agree to the following:<br />
                                        Users can visit our app anonymously.<br />
                                        Once this privacy policy is created, we will add a link to it on our home page or as a minimum, on the first significant page after entering our app.Our Privacy Policy link includes the word 'Privacy' and can easily be found on the page specified above.<br /> <br />

                                        You will be notified of any Privacy Policy changes:<br /> <br />

                                        On our Privacy Policy Page<br />
                                        You can change your personal information:<br /> <br />

                                        By logging in to your account <br />
                                        Others<br />
                                        How does our app handle Do Not Track signals?<br />
                                        We honor Do Not Track signals and Do Not Track, plant cookies, or use advertising when a Do Not Track (DNT) browser mechanism is in place.<br /> <br />

                                        Does our app allow third-party behavioral tracking?<br />
                                        It's also important to note that we do not allow third-party behavioral tracking.<br /> <br />

                                        COPPA (Children Online Privacy Protection Act)<br />
                                        When it comes to the collection of personal information from children under the age of 13 years old, the Children's Online Privacy Protection Act (COPPA) puts parents in control. The Federal Trade Commission, United States' consumer protection agency, enforces the COPPA Rule, which spells out what operators of apps and online services must do to protect children's privacy and safety online.<br /> <br />

                                        We do not specifically market to children under the age of 13 years old.<br /> <br />

                                        Fair Information Practices<br />
                                        The Fair Information Practices Principles form the backbone of privacy law in the United States and the concepts they include have played a significant role in the development of data protection laws around the globe. Understanding the Fair Information Practice Principles and how they should be implemented is critical to comply with the various privacy laws that protect personal information.<br /> <br />

                                        In order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur:<br />
                                        We will notify you via email or through our website or apps within 7 business days.<br /> <br />

                                        We also agree to the Individual Redress Principle which requires that individuals have the right to legally pursue enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only that individuals have enforceable rights against data users, but also that individuals have recourse to courts or government agencies to investigate and/or prosecute non-compliance by data processors.<br /> <br />

                                        CAN SPAM Act<br />
                                        The CAN-SPAM Act is a law that sets the rules for commercial email, establishes requirements for commercial messages, gives recipients the right to have emails stopped from being sent to them, and spells out tough penalties for violations.<br /> <br />

                                        We collect your email address in order to:<br />
                                        Send information, respond to inquiries, and/or other requests or questions
                                        To be in accordance with CANSPAM, we agree to the following:<br />
                                        Not use false or misleading subjects or email addresses.<br />
                                        Identify the message as an advertisement in some reasonable way.<br />
                                        Include the physical address of our business or app headquarters.<br />
                                        Monitor third-party email marketing services for compliance, if one is used.<br />
                                        Honor opt-out/unsubscribe requests quickly.<br />
                                        Allow users to unsubscribe by using the link at the bottom of each email.<br />
                                        If at any time you would like to unsubscribe from receiving future emails, you can email us at
                                        support@mentorz.com and we will promptly remove you from ALL correspondence.<br /> <br />

                                        Contacting Us <br />
                                        If there are any questions regarding this privacy policy, you may contact us using the information below.<br />
                                        Mentorz Inc <br />
                                        P.O. Box 2451 <br />
                                        Redmond, WA 98073 <br />
                                        USA <br />
                                        support@mentorz.com <br />
                                        Last Edited on March 3rd 2018.  <br />


                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}