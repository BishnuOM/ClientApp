import { call, put,select, takeEvery } from 'redux-saga/effects';
import type from '../types';

import Api from '../api_config';



let usrdetail=localStorage.getItem('login_data');
usrdetail=JSON.parse(usrdetail);
function* getUserById(){
    try{
       const home_mentdetail=yield call(Api.billing.getUserById,usrdetail.id);
       const {data}=home_mentdetail;
    }
    catch{
    }
    finally{
       
    }
}






function* getHomeDetail() {
    yield takeEvery(type.GET_USER_BYID, getUserById);
 }
 
 export default getHomeDetail;