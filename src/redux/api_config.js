import axios from "axios";
import {authHeader} from './auth-header';

const API = process.env.REACT_APP_API;

const Service = {
    billing:{
        getUserById: async function (payload){
            //  let url = API + `/User/GetProfileById?userId=${payload.userId}`;
              var settings = {
                  "url": API+'/User/GetProfileById?userId='+payload.userId,
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
    }
}

export default Service;