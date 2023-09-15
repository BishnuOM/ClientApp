
let accessToken;
var tid, sLoggedInUserName, LoggedInUserId;


$(document).ready(function () {
  
});
var mywindow;
function requestConsent(clientId) {
    getToken(clientId)
        .then(data => {
            alert("Test")
        $("#consent").hide();
        $("#divError").hide();
        accessToken = data.accessToken;
           // microsoftTeams.getContext((context) => {
                //alert("team Role :" + context.userTeamRole);
                //getUserRole(context.userPrincipalName);
                var tid = context.tid;
                tid = tid.slice(24, 36) + "_accesstokentime";
                var currentDate = new Date();
                var formattecurrentDate = currentDate.toLocaleString(['en-US'], { hour12: true });
                localStorage.setItem(tid, formattecurrentDate);
                localStorage.setItem("AccesTokenTime",formattecurrentDate);
                $("#lilnkLogin").hide();
            if (context.userTeamRole == "0") {
                $("#liLnkConfigure").show();
                $("#liLnkRefresh").show();
            }
            else {
                $("#liLnkConfigure").hide();
                $("#liLnkRefresh").hide();
            }
        });
    //});
}

function getToken(clientId) {
    return new Promise((resolve, reject) => {
        //mywindow = window.open(window.location.origin + "/AuthStart.html", "Azure Login", "location=1,status=1,scrollbars=1,width=350,height=340");
        var w = 450, h = 450;
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        mywindow = window.open(window.location.origin + "/AuthStart.html?clientId=" + clientId, "Azure Login", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    });

   
}
function Success() {
    GetAzureToken();
}

function GetAzureToken() {
  
    var etcode = localStorage.getItem('et_code')
    var settings = {
        "url": "https://mentorzapi.azurewebsites.net/api/AdminDashboard/AzureGetTokenByTanant",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "x-functions-key": "k0LRVnEqAPlNb/UZrKyLHsK6FWh1qqJ108scaq0VX64IYuCB3eBg==",
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(
            {
                "grant_type": "authorization_code",
                "code": etcode,
                "client_id": "6d5e92a7-28dd-4894-95d9-8b0f1112795a",
                "tenantId": "e5325b09-cfdd-4447-999b-a7a8b34a601b",
                "redirect_uri": window.location.origin + "/AuthEnd.html"
          
            }


        ),
    };
    
    $.ajax(settings).done(function (response) {
     
        var res = JSON.parse(response);
       
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
        localStorage.setItem("expires_in", res.expires_in);
        // if (localStorage.getItem("reRoute") != null) {
        //     window.location.replace(localStorage.getItem("reRoute"));
        // }
        // else {
        //     window.location.replace("/home");
        // }
       
         getUser();
        //return 1;
    


    }).fail(function (data) {
        localStorage.setItem("LogInStatus", "0");
        console.log(data);
        window.location.replace('/');
    });
}





function getRefreshToken(clientSideToken) {
   
}

function IsValidJSONString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


function getUser() {
        let graphUrl = "https://graph.microsoft.com/v1.0/me";
        $.ajax({
            url: graphUrl,
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("access_token"));
            },
            success: function (profile) {  
               localStorage.setItem("Userprofile",JSON.stringify(profile));  
                IsMicrosoftUserExist();
                // window.location.replace('/Home');
                          
                // var displayName = profile.displayName;
                //  alert(displayName);
                // console.log(profile);
            },
            error: function () {
                console.log("Failed");
                window.location.replace('/');
            },
            complete: function (data) {
            }
        });
    


}

function IsMicrosoftUserExist(){
    let email=JSON.parse(localStorage.getItem('Userprofile')).mail
    let Url = `https://mentorzapi.azurewebsites.net/api/OrgUser/IsMicrosoftUserExist/${email}`;
    var settings = {
        "url":Url,
        "method": "GET",
        "timeout": 0,
       
    };
     $.ajax(settings).done(function (response) {
        if(response.statusTypeId === 404){
            window.location.replace('/signup')
        }
        else{
            AuthenticateExternal();
        }
    }).fail(function (data) {
        window.location.replace('/');
    });


}

function AuthenticateExternal(){
    let url='https://mentorzapi.azurewebsites.net/api/OrgUser/AuthenticateExternal'
    var settings = {
        "url": url,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json",
          "Cookie": "ARRAffinity=98d8735951b51aee203cc904a7b413e9df029a577a7fa35f14349cf55fd03775; ARRAffinitySameSite=98d8735951b51aee203cc904a7b413e9df029a577a7fa35f14349cf55fd03775"
        },
        "data": JSON.stringify({
          "email": JSON.parse(localStorage.getItem('Userprofile')).mail,
          "accessToken": localStorage.getItem('access_token'),
          "siteName": "MICROSOFT"
        }),
      };
      
      $.ajax(settings).done(function (response) {
        localStorage.setItem("LogInStatus", "1");
        localStorage.setItem("LogInType", "0");
        window.location.replace('/Home');
        localStorage.setItem("login_data" ,JSON.stringify(response));
       
      }).fail(function (data) {
      window.location.replace('/');
      })
}
