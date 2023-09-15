import jwtDecode from "jwt-decode";



export const AzureService = {
    // LoginIfRequre(Route) {

    //     if (!this.ExpireCheck()) {
    //         localStorage.setItem("reRoute", window.location.pathname)
    //         var login = window.requestConsent();
    //     }
    //     else {
    //         return false;
    //     }
    // },
     GetRefreshToken: function() {
        var data = {
            "grant_type": "refresh_token",
            "code": "",
            "refresh_token": localStorage.getItem("refresh_token"),
            "client_id": localStorage.getItem("REACT_APP_client_id"),
            "userId": "eefff682-c1a4-4290-a86d-bd760bef0130",
            "userEmail": "asheesh@facileconsulting.com",
            "tenantId": "f50d7f47-bec5-46dd-9eb0-e2a38d7689dc",
            "client_secret": localStorage.getItem("REACT_APP_client_secret"),
            "redirect_uri": window.location.origin + "/AuthEnd.html"
         };
         var myHeaders = new Headers();
         myHeaders.append("x-functions-key", "k0LRVnEqAPlNb/UZrKyLHsK6FWh1qqJ108scaq0VX64IYuCB3eBg=="); 
         myHeaders.append("Content-Type", "application/json");
        
        fetch('https://mentorzapi.azurewebsites.net/api/AdminDashboard/AzureGetTokenByTanant', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(
                data
            )
        }).then((response) => {

            if (response.status === 200) {
               var currentDate = new Date();
                var formattecurrentDate = currentDate.toLocaleString(['en-US'], { hour12: true });
                localStorage.setItem("AccesTokenTime", formattecurrentDate);
                var res = JSON.parse(response)
                localStorage.setItem("access_token", res.access_token);
                localStorage.setItem("refresh_token", res.refresh_token);
                localStorage.setItem('expires_in', res.expires_in);
            }
        });
    },

     ExpireCheck: function () {
        let token = localStorage.getItem('access_token');
        if (token != null) {
            const { exp } = jwtDecode(token)
            const expirationTime = (exp * 1000) - 60000;
            if (Date.now() <= expirationTime) {
                return true;
            }
            else {
                this.GetRefreshToken();
                
            }
         }
         this.GetRefreshToken();
    }
    // getUser: function () {


    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    //     myHeaders.append("Authorization", "Bearer " +localStorage.getItem("access_token"));

    //     var requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };

    //     fetch("https://graph.microsoft.com/v1.0/me", requestOptions)
    //         .then((response) => {
                
    //             var data = response.text();
    //             alert(data.displayName);
    //         })
    //         .then(result => console.log(result))
    //         .catch(error => console.log('error', error));


    // }

    
};
