import $ from 'jquery';
import axios from 'axios';
import { axiosClient } from "../Service/ServiceClient";
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import {authHeader} from '../redux/auth-header';

//const API1 = process.env.REACT_APP_MyApi;
const API = 'https://mentorzapi.azurewebsites.net/api';
const ENV_API = process.env.REACT_APP_API;

let User=JSON.parse(localStorage.getItem('login_data'));
let IMAGE_URL='https://mentorzstorageaccount1.blob.core.windows.net/mentorz/';
const Service = {
    
    imageURL(imageId){
        let image;
        try{
            if(imageId!=="" && imageId!==undefined && imageId!=="string" )
            {
              image=IMAGE_URL+ imageId;
               
            }
            else{
             image='./img/svg/group_chat.svg';
            }
            return image
        }
        catch(e){
            return e;
        }
      }
,

    GetImageService: async function (token, photoId) {
        let url = API + `/File/GetFile?id=${photoId}`
        var settings = {
            "url": url,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + token
            }
        };
        return $.ajax(settings).done(function (response) {
            return response;
        });
    },
    GetImageUri: async function (token, photoId) {
        if (token) {
            let url = API + `/File/GetFileUri?fileName=${photoId}`
            return axiosClient(token).get(`${url}`, {
            }).then((response) => {
                return response?.data
            }).catch(error => {
                throw (error);
            })
        }
    },

    GetImageById: async function (token, photoId) {
        if (token) {
            let url = API + `/File/GetFile?id=${photoId}`
            return axiosClient(token).get(`${url}`, {
            }).then((response) => {
                return response?.data
            }).catch(error => {
                throw (error);
            })
        }
    },

    UpdateRingImage: async function (token, ringId, imageId, ringImage) {
        if (token) {
            let model = new FormData();
            model.append("id", ringId);
            model.append("photoId", imageId);
            model.append("ringPicture", ringImage);
            let url = API + `/Ring/UpdateRingImage`
            return axiosClient(token).post(`${url}`, model, {
            }).then((response) => {
                return response?.data?.result
            }).catch(error => {
                throw (error);
            })
        }
    },

    LoginAuth: async function (req) {
        var settings = {
            "url": API + "/OrgUser/Authenticate",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
            },
            "data": JSON.stringify({
                "username": req.state.email,
                "password": req.state.password,
                "isNormalLogin": true
            }),
        };
        return $.ajax(settings).done(function (response) {
            return response;

        }).fail(function (data) {
            return data;
        });

    },

    SaveRingSettings: async function (data) {
        if (data.AccessToken) {
            let model = new FormData();
            model.append("id", data.ringid);
            model.append("userId", data.userid);
            model.append("status", data.status);
            model.append("name", data.ringname);
            model.append("description", data.description);
            model.append("ringTypeId", parseInt(data.ringtype));
            model.append("scopeId", parseInt(data.scopetype));
            model.append("photoId", data.photoId ? data.photoId : "");
            model.append("isLoadRingMember", data.isLoadRingMember ? true : false);
            if (!data.id && data.ringImage) {
                model.append("ringPicture", data.ringImage);
            }

            let url = API + `/Ring/SaveSettings`
            return await axiosClient(data.AccessToken).post(`${url}`, model, {
            }).then((response) => {
                return response?.data
            }).catch(error => {
                throw (error);
            })
        }
    },

    SaveMember: async function (data) {
        if (data.accessToken) {
            let model = new FormData();
            model.append("id", data.id ? data.id : '');
            model.append("userId", data.userId);
            model.append("ringId", data.ringId);
            model.append("firstName", data.firstName ? data.firstName : '');
            model.append("lastName", data.lastName ? data.lastName : '');
            model.append("emailAddress", data.emailAddress);
            model.append("title", data.title ? data.title : '');
            model.append("country", data.country ? data.country : '');
            model.append("city", data.city ? data.city : '');
            model.append("roleId", parseInt(data.roleId));
            model.append("userRoleId", parseInt(data.userRoleId));
            model.append("isOrgUser", data.isOrgUser);

            let url = API + `/Ring/SaveRingMember`
            return await axiosClient(data.accessToken).post(`${url}`, model, {
            }).then((response) => {
                return response?.data
            }).catch(error => {
                throw (error);
            })
        }
    },

    SaveMembers: async function (token, data) {
        if (token) {
            let model = new FormData();
            model.append("data", JSON.stringify(data));

            let url = API + `/Ring/SaveRingMembers`
            return await axiosClient(token).post(`${url}`, model, {
            }).then((response) => {
                return response?.data
            }).catch(error => {
                throw (error);
            })
        }
    },

    SaveMentor: async function (token, data) {
        if (token) {
            let model = new FormData();
            model.append("data", JSON.stringify(data));
            let url = API + `/Ring/SaveMentorsBench`
            return await axiosClient(token).post(`${url}`, model, {
            }).then((response) => {
                return response?.data
            }).catch(error => {
                throw (error);
            })
        }
    },

    DeleteMentorBench: async function (token, userId, mentors = [], request = [], isConfirm) {
        if (token) {
            let model = new FormData();
            model.append("userId", userId);
            model.append("mentorBenchIds", mentors);
            model.append("requestIds", request);
            model.append("isDeleteRing", isConfirm);

            let url = API + `/Ring/DeleteMentorBench`
            return axiosClient(token).post(`${url}`, model, {
            }).then((response) => {
                return response?.data;
            }).catch(error => {
                throw (error);
            })
        }
    },

    EditManageService: async function (req) {
        var settings = {
            "url": API + "/Ring/Update",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + req.AccessToken,
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "id": req.ringid,
                "userId": req.userid,
                "status": 1,
                "name": req.ringname,
                "description": req.description,
                "ringTypeId": parseInt(req.ringtype),
                "scopeId": parseInt(req.scopetype),
                "ringTypeName": req.ringTypeName,
                "photoId": req.photoId,
                "ringMemberCount": 0,
                "memberId": null,
                "roleId": 0,
                "isAdmin": true,
                "isOwner": true,
                "responseErrorMessage": ""
            }),
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });

    },

    CreateManageService: async function (req, GUUID) {
        let fileupload = new FormData();
        fileupload.append("id", GUUID.GUUID1);
        fileupload.append("userId", req.userid);
        fileupload.append("status", "1");
        fileupload.append("name", req.ringname);
        fileupload.append("description", req.description);
        fileupload.append("ringTypeId", parseInt(req.ringtype));
        fileupload.append("scopeId", parseInt(req.scopetype));
        fileupload.append("photoId", "");
        fileupload.append("ringMemberCount", "0");
        fileupload.append("memberId", GUUID.GUUID2);
        fileupload.append("roleId", "1");
        fileupload.append("isAdmin", "true");
        fileupload.append("isOwner", "true");
        fileupload.append("RingPicture", req.ringImage);
        let url = API + `/Ring/CreateWithImage`;
        return axiosClient(req.AccessToken).post(`${url}`, fileupload, {
        }).then((response) => {
            return response
        }).catch(error => {
            throw (error);
        })



        //return axios({
        //    method: "post",
        //    url: url,
        //    data: fileupload,
        //    headers: {
        //        'Content-Type': `multipart/form-data; ${fileupload.getBoundary()}`,
        //    })
        //    .then(function (response) {
        //        return response
        //    })
        //    .catch(function (response) {
        //        return response
        //    });


        //return await axiosClient(req.AccessToken).post(url, fileupload, {
        //}).then((response) => {
        //    return response
        //}).catch(error => {
        //    throw (error);
        //})

        //return await axios.post(url, fileupload, config)
        //.then(response => {
        //    return response
        //})
        //.catch(data => {
        //    return data;
        //});
    },

    /*  Ring*/
    GetUserRingPolicyList: async function (req) {
        if (req && req.accessToken) {
            let url = API + `/Ring/Policy/Get?userId=${req.userId}`
            return axiosClient(req.accessToken).get(`${url}`, {
            }).then((response) => {
                return response?.data;
            }).catch(error => {
                throw (error);
            })
        }
    },

    SaveRingPolicy: async function (token, data) {
        if (data && token) {
            let url = API + `/Ring/Policy/Create`
            return axiosClient(token).post(`${url}`, data, {
            }).then((response) => {
                return response?.data;
            }).catch(error => {
                throw (error);
            })
        }
    },


    DeleteRingPolicy: async function (token, data) {
        if (data && token) {
            let url = API + `/Ring/Policy/Delete`
            return axiosClient(token).post(`${url}`, data, {
            }).then((response) => {
                return response?.data;
            }).catch(error => {
                throw (error);
            })
        }
    },

    RingList: async function (req, isLoadRingImage = 0) {
        if (req && req.AccessToken) {
            let url = API + `/Ring/GetManageRings?Id=${req.userid}&includeImage=${isLoadRingImage}`
            return axiosClient(req.AccessToken).get(`${url}`, {
            }).then((response) => {
                return response?.data;
            }).catch(error => {
                throw (error);
            })
        }
    },

    GetRingById: async function (token, ringId) {
        if (token) {
            let url = API + `/Ring/GetRingById?Id=${ringId}`
            return axiosClient(token).get(`${url}`, {
            }).then((response) => {
                return response?.data
            }).catch(error => {
                throw (error);
            })
        }
    },

    GetRingSettingsByRingId: async function (token, ringId) {
        if (token) {
            let url = API + `/Ring/GetSettings?ringId=${ringId}`
            return axiosClient(token).get(`${url}`, {
            }).then((response) => {
                return response?.data
            }).catch(error => {
                throw (error);
            })
        }
    },

    GetRingMembersByRingId: async function (token, ringId) {
        if (token) {
            let url = API + `/Ring/GetMembers?ringId=${ringId}`
            return axiosClient(token).get(`${url}`, {
            }).then((response) => {
                return response?.data
            }).catch(error => {
                throw (error);
            })
        }
    },

    GetMentorsBench: async function (token, userId) {
        if (token) {
            let url = API + `/Ring/GetMentorsBench?userId=${userId}`
            return axiosClient(token).get(`${url}`, {
            }).then((response) => {
                return response?.data
            }).catch(error => {
                throw (error);
            })
        }
    },

    /*  MatchingCriteria */
    GetMatchingCriteria: async function (expFrom, expTo, token) {
        var request = {
            "url": API + `/Ring/GetMatchingCriterionByYear/${expFrom}/${expTo}`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + token
            },
        };
        return $.ajax(request).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },

    DeleteRingMember: async function (token, userId, ringId = '', ringMembers = [], request = []) {
        if (token) {
            let model = new FormData();
            model.append("userId", userId);
            model.append("ringId", ringId);
            model.append("members", ringMembers);
            model.append("ringRequestIds", request);

            let url = API + `/Ring/DeleteRingMember`
            return axiosClient(token).post(`${url}`, model, {
            }).then((response) => {
                return response?.data;
            }).catch(error => {
                throw (error);
            })
        }
    },

    InviteAgainRingRequest: async function (token, userId, ringItem) {
        if (token) {
            let model = new FormData();
            model.append("firstName", ringItem.firstName);
            model.append("lastName", ringItem.lastName);
            model.append("emailAddress", ringItem.emailAddress);
            model.append("roleName", ringItem.roleName);
            model.append("ringName", ringItem.ringName);
            model.append("ringRequestedId", ringItem.ringRequestedId);
            model.append("emailId", ringItem.emailId);
            model.append("userId", userId);

            let url = API + `/Ring/InviteAgainRingRequest`
            return axiosClient(token).post(`${url}`, model, {
            }).then((response) => {
                return response?.data;
            }).catch(error => {
                throw (error);
            })
        }
    },

    CancelRingRequest: async function (token, ringRequestId) {
        if (token) {
            let url = API + `/Ring/CancelRingRequest?ringRequestId=${ringRequestId}`
            return axiosClient(token).get(`${url}`, {
            }).then((response) => {
                return response?.data
            }).catch(error => {
                throw (error);
            })
        }
    },

    InviteAgainMentorRequest: async function (token, userId, item) {
        if (token) {
            let model = new FormData();
            model.append("firstName", item.firstName);
            model.append("lastName", item.lastName);
            model.append("emailAddress", item.emailAddress);
            model.append("requestedId", item.requestedId);
            model.append("emailId", item.emailId);
            model.append("userId", userId);

            let url = API + `/Ring/InviteAgainMentorRequest`
            return axiosClient(token).post(`${url}`, model, {
            }).then((response) => {
                return response?.data;
            }).catch(error => {
                throw (error);
            })
        }
    },

    CancelMentorRequest: async function (token, requestId) {
        if (token) {
            let url = API + `/Ring/CancelMentorRequest?requestId=${requestId}`
            return axiosClient(token).get(`${url}`, {
            }).then((response) => {
                return response?.data
            }).catch(error => {
                throw (error);
            })
        }
    },

    DeleteRings: async function (token, userId, ringIds) {
        if (token) {
            let model = new FormData();
            model.append("userId", userId);
            model.append("ringIds", ringIds);

            let url = API + `/Ring/DeleteRings`
            return axiosClient(token).post(`${url}`, model, {
            }).then((response) => {
                return response?.data;
            }).catch(error => {
                throw (error);
            })
        }
    },

    // Culture 
    GetMentorshipCulture: async function (req) {

        var settings = {
            "url": API + "/App/GetMenu",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + req.state.AccessToken,
                "Content-Type": "application/json",

            },
            "data": JSON.stringify({
                "id": req.state.userid,
                "menuType": req.MenuType
            }),
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },

    /* Setting*/
    GetSettings: async function (req) {
        var settings = {
            "url": API + "/App/GetMenu",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + req.state.AccessToken,
                "Content-Type": "application/json",

            },
            "data": JSON.stringify({
                "id": req.state.userid,
                "menuType": req.MenuType
            }),
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },

    SaveFeedback: async function (req) {
        let localData = localStorage.getItem("login_data");
        localData = localData ? JSON.parse(localData) : {};
        var settings = {
            "url": API + "/App/PostFeedback",
            "method": "POST",
            "headers": {
                "Authorization": 'Bearer ' + req.state.AccessToken,
                "Content-Type": "application/json",
            },
            "data": JSON.stringify({
                "userId": localData.id,
                "rating": ""+req.feedbackrating,
                "email": localData.emailAddress,
                "feedBackMsg": req.feedbackmsg
            }),
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },

    GetDashBoardData: async function (req) {
        var settings = {
            "url": API + `/DashBoard/GetDashBoardData?UserId=${req.state.userid}`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + req.state.AccessToken
            },
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },

    GetChartData: async function (req) {
        var settings = {
            "url": API + "/DashBoard/GetChartData",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + req.state.AccessToken,
                "Content-Type": "application/json",

            },
            "data": JSON.stringify({
                "days": 10,
                "chartType": "Test",
                "userId": req.state.userid
            }),
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },

    GetNotificationData: async function (req) {
        var settings = {
            "url": API + `/User/GetUserNotification?userId=${req.state.userId}`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + req.state.accessToken
            },
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },

    AddAdminService: async function (req, GUUID) {
        let data = JSON.parse(localStorage.getItem('Userprofile'));
        if (data != null) {
            var settings = {
                "url": API + "/Organizaton/AddAdmin",
                "method": "POST",
                "timeout": 0,
                "headers": {

                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "userId": GUUID,
                    "firstName": req.state.FirstName,
                    "lastName": req.state.LastName,
                    "organization": req.state.BusinessName,
                    "emailAddress": req.state.Email,
                    "password": req.state.Password,
                    "phoneNumber": "",
                    "age": 0,
                    "photoId": "",
                    "facebookLink": "",
                    "linkedInLink": "",
                    "bioData": "",
                    "designation": "",
                    "isOrganizationUser": true,
                    "role": 0,
                    "school": "",
                    "city": "",
                    "country": "",
                    "yearsOfExperience": 0,
                    "mentorshipRate": 0,
                    "timezone": "",
                    "educationLevel": "",
                    "degree": "",
                    "headline": "",
                    "loginUserId": "",
                    "userInterestIds": [
                        ""
                    ],
                    "userValueIds": [
                        ""
                    ],
                    "userExpertiseIds": [
                        ""
                    ],
                    "isFacebookUser": true,
                    "isLinkedInUser": true,
                    "isMicroosoftUser": true,
                    "stripeCustomerId": "",
                    "stripeAccountId": ""

                }),
            };
        } else {
            var settings = {
                "url": API + "/Organizaton/AddAdmin",
                "method": "POST",
                "timeout": 0,
                "headers": {

                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "userId": GUUID,
                    "firstName": req.state.FirstName,
                    "lastName": req.state.LastName,
                    "organization": req.state.BusinessName,
                    "emailAddress": req.state.Email,
                    "password": req.state.Password,
                    "phoneNumber": "",
                    "age": 0,
                    "photoId": "",
                    "facebookLink": "",
                    "linkedInLink": "",
                    "bioData": "",
                    "designation": "",
                    "isOrganizationUser": true,
                    "role": 0,
                    "school": "",
                    "city": "",
                    "country": "",
                    "yearsOfExperience": 0,
                    "mentorshipRate": 0,
                    "timezone": "",
                    "educationLevel": "",
                    "degree": "",
                    "headline": "",
                    "loginUserId": "",
                    "userInterestIds": [
                        ""
                    ],
                    "userValueIds": [
                        ""
                    ],
                    "userExpertiseIds": [
                        ""
                    ],
                    "isFacebookUser": true,
                    "isLinkedInUser": true,
                    "isMicroosoftUser": false,
                    "stripeCustomerId": "",
                    "stripeAccountId": ""

                }),
            };
        }
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });

    },

    ForgotPassword: async function (email) {
        let model = new FormData();
        model.append("email", email);

        let url = API + `/User/ForgotPassword?email=${email}`
        return axiosClient('').post(`${url}`, {
        }).then((response) => {
            return response?.data;
        }).catch(error => {
            throw (error);
        })
    },

    ChangePassword: async function (emailId, password) {
        let model = new FormData();
        model.append("emailId", emailId);
        model.append("password", password);

        let url = API + `/User/ChangePassword`
        return axiosClient('').post(`${url}`, model, {
        }).then((response) => {
            return response?.data;
        }).catch(error => {
            throw (error);
        })
    },

    CheckEmailRequestValidation: async function (emailId) {
        let url = API + `/User/GetEmailValidation?emailId=${emailId}`
        return axiosClient('').get(`${url}`, {
        }).then((response) => {
            return response?.data
        }).catch(error => {
            throw (error);
        })
    },

    UpdateRingRequest: async function (emailId, status) {
        let url = API + `/Ring/UpdateRingRequest?emailId=${emailId}&status=${status}`
        return axiosClient('').get(`${url}`, {
        }).then((response) => {
            return response?.data
        }).catch(error => {
            throw (error);
        })
    },

    UpdateMentorRequest: async function (emailId, status) {
        let url = API + `/Ring/UpdateMentorRequest?emailId=${emailId}&status=${status}`
        return axiosClient('').get(`${url}`, {
        }).then((response) => {
            return response?.data
        }).catch(error => {
            throw (error);
        })
    },

    updateInviteStatus: async function (requestedEmailRecordId) {
        let url = API + `/Organizaton/UpdateInviteRequest?requestedEmailRecordId=${requestedEmailRecordId}`
        return axiosClient('').get(`${url}`, {
        }).then((response) => {
            return response?.data
        }).catch(error => {
            throw (error);
        })
    },

    getSearchedUser: async function (token, searchText) {
        let url = API + `/User/GetExistingUser?searchText=${searchText}`
        return axiosClient(token).get(`${url}`, {
        }).then((response) => {
            return response?.data
        }).catch(error => {
            throw (error);
        })
    },

    DeleteNotificationData: async function (req, result) {

        var settings = {
            "url": API + "/User/DeleteUserNotification",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + req.state.AccessToken,
                "Content-Type": "application/json",

            },
            "data": JSON.stringify({
                "id": result.id,
                "userId": req.state.userid
            }),
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },

    GetChartData: async function (req, data) {

        var settings = {
            "url": API + "/DashBoard/GetChartData",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + req.state.AccessToken,
                "Content-Type": "application/json",

            },
            "data": JSON.stringify({
                "days": parseInt(data.days),
                "chartType": data.chartType,
                "userId": req.state.userid

            }),
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },

    GetOrganization: async function (req) {
        var settings = {
            "url": API + `/Organizaton/GetOrganization`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + req.state.AccessToken
            },
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });

        //let url = API + `/Organizaton/GetOrganization`
        //return axiosClient(req.state.AccessToken).get(`${url}`, {
        //}).then((response) => {
        //    return response?.data
        //}).catch(error => {
        //    throw (error);
        //})
    },

    GetEngagmentkpi: async function (req) {
        var settings = {
            "url": API + `/App/GetEngagaementKPI/${req.state.selectedRingId}`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + req.state.AccessToken
            },
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },

    AddOrgImgService: async function (token, orgId, imageData) {
        if (token) {
            let fileupload = new FormData();
            fileupload.append("data", JSON.stringify(orgId));
            fileupload.append("OrganizationImage", imageData);
            let url = API + `/Organizaton/SaveOrgImage`;
            return axiosClient(token).post(`${url}`, fileupload, {
            }).then((response) => {
                return response
            }).catch(error => {
                throw (error);
            })
        }
    },

    GetExpertise: async function (req) {
        var settings = {
            "url": API + `/Ring/GetInsightExpertise/${req.state.selectedRingId}`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + req.state.AccessToken
            },
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },

    GetInterest: async function (req) {
        var settings = {
            "url": API + `/Ring/GetInsightInterest/${req.state.selectedRingId}`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + req.state.AccessToken
            },
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },

    GetValues: async function (req) {
        var settings = {
            "url": API + `/Ring/GetInsightValues/${req.state.selectedRingId}`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + req.state.AccessToken
            },
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },

    GetOrganizationUser: async function () {
        let url = 'https://graph.microsoft.com/v1.0/users'
        return axiosClient(localStorage.getItem('access_token')).get(`${url}`, {
        }).then((response) => {
            return response?.data
        }).catch(error => {
            throw (error);
        })
    },

    GetOrganizationGroup: async function () {
        let url = 'https://graph.microsoft.com/v1.0/groups'
        return axiosClient(localStorage.getItem('access_token')).get(`${url}`, {
        }).then((response) => {
            return response?.data
        }).catch(error => {
            throw (error);
        })
    },

    Getprofiledata: async function (req) {
        var settings = {
            "url": API + `/OrgUser/GetProfileById/${req.state.id}`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + req.state.AccessToken
            },
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },

    UpdateProfileImg: async function (token, imageData) {
        if (token) {
            let fileupload = new FormData();
            fileupload.append("profilePicture", imageData);
            let url = API + `/OrgUser/UpdateImage`;
            return axiosClient(token).post(`${url}`, fileupload, {
            }).then((response) => {
                return response
            }).catch(error => {
                throw (error);
            })
        }
    },

    GetGroupMembers: async function (groupid) {
        var settings = {
            "url": `https://graph.microsoft.com/v1.0/groups/${groupid}/members?$count=true`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + localStorage.getItem('access_token')
            },
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },

    UpdateMemberDetails: async function (req, ringsvalue, ringsid, requestId = '') {
        var settings = {
            "url": API + "/Ring/UpdateMemberDetails",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + req.state.AccessToken,
                "Content-Type": "application/json",

            },
            "data": JSON.stringify({
                "memberId": ringsid,
                "userId": req.state.userid,
                "roleId": parseInt(ringsvalue),
                "ringRequestId": requestId
            }),
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },

    SupportEmail: async function (req) {
        var settings = {
            "url": API + "/Support/SendEmail",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + req.state.AccessToken,
                "Content-Type": "application/json",

            },
            "data": JSON.stringify({
                "requesterId": req.state.userid,
                "name": req.state.name,
                "emailAddress": req.state.email,
                "company": req.state.company,
                "notes": req.state.note
            }),
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });
    },
    GetChatProviderKeys: async function (token) {
        if (token) {
            let url = API + `/ChatProvider/Keys`
            return axiosClient(token).get(`${url}`, {
            }).then((response) => {
                return response?.data;
            }).catch(error => {
                throw (error);
            })
        }
    },
    GetMembersByRingId: async function (token, ringId) {
        if (token) {
            let url = API + `/Ring/GetMembersByRingId?Id=${ringId}`
            return axiosClient(token).get(`${url}`, {
            }).then((response) => {
                debugger
                console.log(response?.data)
                return response?.data
            }).catch(error => {
                throw (error);
            })
        }
    },

    ChatGet: async function (usersid, ringid, token) {
        var settings = {
            "url": API + `/Ring/Chat/Get?Id=${ringid}&userId=${usersid}`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": 'Bearer ' + token
            },
        };
        return $.ajax(settings).done(function (response) {
            return response
        }).fail(function (data) {
            return data;
        });

    },

    ChatGetList: async function (ringid,usersid ){
          var settings = {
              "url": API+'/Ring/Chat/Get?Id='+ringid +'&userId='+User.id,
              "method": "get",
              "headers": authHeader(),
          };
          try {
              const response = await axios.request(settings);
              return response;
          } catch (error) {
              throw error;
          }
      },

      uploadFile: async function (selectedFile) {
        const authUser=JSON.parse(localStorage.getItem("login_data"));
        const formData = new FormData();
        formData.append("Files", selectedFile);
        formData.append("type", 'image/png');
        var settings = {
            "url": API+`/File/UploadFiles`,
            "method": "post",
            "timeout": 0,
            "headers": {
                'Authorization': 'Bearer ' + authUser.token,
                "Content-Type": "multipart/form-data",
            },
            "data": formData
        };
        try {
            const response = await axios.request(settings);
            return response?.data;
        } catch (error) {
            throw error;
        }
      
    },

      CreateChat: async function (req) {
        var settings = {
            "url": API+'/Ring/Chat/Create',
            "method": "post",
            "headers": authHeader(),
            "data": JSON.stringify({
                "ringChatId": req.ringChatId,
                "ringId": req.ringId,
                "name": req.name,
                "photoId": req.photoId,
                "ownerId": req.ownerId,// '2d7d1097-2397-4ef0-a948-3099827e4bb4',//
                "chatMemberRoleTypeId": req.chatMemberRoleTypeId
              }),
        };
        try {
            const response = await axios.request(settings);
            
            return response;
        } catch (error) {
            throw error;
        }
    },

    SendChatReq: async function (req) {
        var settings = {
            "url": API+'/Ring/Chat/SendRequest',
            "method": "post",
            "headers": authHeader(),
            "data": JSON.stringify({
                "ringChatRequestId": req.ringChatRequestId,//// uuid
                "ringId": req.ringId,
                "ringChatId": req.ringChatId,
                "userIdList": req.userIdList,
                "status": req.status,////1
                "roleId": req.roleId,/////1
              }),
        };
        try {
            const response = await axios.request(settings);
            debugger
            return response;
        } catch (error) {
            throw error;
        }
    },

    AcceptChatReq: async function (req) {
        var settings = {
            "url": API+'/Ring/Chat/AcceptRequest',
            "method": "post",
            "headers": authHeader(),
            "data": JSON.stringify({
                "ringChatRequestId": req.ringChatRequestId,
                "ringId": req.ringId,
                "ringChatId":  req.ringChatId,
                "userId":req.userId,
                "status": req.status,
                "roleId": req.roleId
                
              }),
        };
        try {
            const response = await axios.request(settings);
            debugger
            return response;
        } catch (error) {
            throw error;
        }
    },

    GetMembersByRingID: async function (ringId) {
        var settings = {
            "url": API+'/Ring/GetMembers?ringId='+ringId ,
            "method": "get",
            "headers": authHeader(),
        };
        try {
            const response = await axios.request(settings);
            return response?.data;
        } catch (error) {
            throw error;
        }
    },

    SendVerifyEmailInvite: async function (userId) {
        let url = API + `/User/SendVerifyEmailInvite?userId=${userId}&isAppRequest=false`;
        return axiosClient('').post(`${url}`, {
        }).then((response) => {
            return response?.data
        }).catch(error => {
            throw (error);
        })
    },

    GetIMAGEURI: async function (photoId) {
        var settings = {
            "url": API+'/File/GetFileUri?fileName='+photoId,
            "method": "get",
            "headers": authHeader(),
        };
        try {
            const response = await axios.request(settings);
            return response;
        } catch (error) {
            throw error;
        }
    },

    GetSubscriptions: async function (state) {
        if (state) {
            let url = API + `/Stripe/Product/List?orgId=${state.orgId}&userId=${state.userId}`;
            return axiosClient(state.accessToken).get(`${url}`, {
            }).then((response) => {
                return response?.data
            }).catch(error => {
                throw (error);
            })
        }
    },

    GetSubscriptionDetail: async function (state) {
        if (state) {
            let url = API + `/Stripe/Product/Detail?productId=${state.productId}&orgId=${state.orgId}&userId=${state.userId}`;
            return axiosClient(state.accessToken).get(`${url}`, {
            }).then((response) => {
                return response?.data
            }).catch(error => {
                throw (error);
            })
        }
    },

    SaveProductSeatCount: async function (state) {
        if (state) {
            let model = {
                organizationId: state.orgId,
                userId: state.userId,
                productId: state.productId,
                numberOfSeats: state.seatCount
            }

            let url = API + `/Stripe/ProductSeat/Save`;
            return axiosClient(state.accessToken).post(`${url}`, model, {
            }).then((response) => {
                return response?.data
            }).catch(error => {
                throw (error);
            })
        }
    },
}


export default Service;