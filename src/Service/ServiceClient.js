
import axios from 'axios';

export const axiosClient = (token) => {
    const _axios = axios.create({
        headers: GetHeaders(token) 
    })
    _axios.interceptors.response.use(undefined, err => {
        const error = err.response;
        if (error.status === 401) {
            localStorage.setItem("LogInStatus", "0");
            window.location.reload();
        }
    });
    return _axios;
}

export const axiosClientWithToken = () => {
    const data = JSON.parse(localStorage.getItem("login_data"));
    return axiosClient(data.token);
}

export const GetHeaders = (token) => {
    return {
        "Authorization": `Bearer ${token}`
    }
}

export const GetContentType = () => {
    return {
        "Content-Type": "application/json"
    }
}
