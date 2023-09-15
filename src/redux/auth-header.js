export function authHeader() {
    // return authorization header with jwt token
    const authUser=JSON.parse(localStorage.getItem("login_data"));
    if (authUser && authUser.token) {
        return { 
            'Authorization': 'Bearer ' + authUser.token,
            "Content-Type": "application/json"
         };
    } else {
        return {
            "Content-Type": "application/json"
        };
    }
}
export default authHeader;