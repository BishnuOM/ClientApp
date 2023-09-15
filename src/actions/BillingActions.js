import {
  GET_USER_BY_ID,
  ADD_STRIPECUSTOMER_ID,
  GET_PAYMENTMETHOD_LIST,
  ADD_PAYMENTMETHOD,
  DELETE_PAYMENTMETHOD,
  GET_PAYMENTMETHOD,
  UPDATE_PAYMENTMETHOD,
  SET_PAYMENTMETHOD_ID
} from "../constants/billingConstants";
import BillingService from "../Service/BillingService";

export const GetUserById = (payload) => async (dispatch) => {
  try {
    const res = await BillingService.GetUserById(payload);
    dispatch({
      type: GET_USER_BY_ID,
      data: res,
    });

    return Promise.resolve(res?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AddStripeCustomerId = (token, payload) => async (dispatch) => {
  try {
    const res = await BillingService.AddStripeCustomerId(token, payload);
    dispatch({
      type: ADD_STRIPECUSTOMER_ID,
      data: res.response,
    });

    return Promise.resolve(res?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUserDetails = (token, payload) => async (dispatch) => {
  try {
    const res = await BillingService.updateUserDetails(token, payload);

    return Promise.resolve(res?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPaymentMethodList = (payload) => async (dispatch) => {
  try {
    const res = await BillingService.getPaymentMethodList(payload);
    dispatch({
      type: GET_PAYMENTMETHOD_LIST,
      data: res,
    });

    return Promise.resolve(res?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addPaymentMethod = (payload) => async (dispatch) => {
  try {
    const res = await BillingService.addPaymentMethod(payload);
    dispatch({
      type: ADD_PAYMENTMETHOD,
      data: res,
    });

    return Promise.resolve(res?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletePaymentMethod = (payload) => async (dispatch) => {
  try {
    const res = await BillingService.deletePaymentMethod(payload);
    dispatch({
      type: DELETE_PAYMENTMETHOD,
      data: res,
    });

    return Promise.resolve(res?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPaymentMethod = (id) => async (dispatch) => {
  try {
    if(!!id){
      const res = await BillingService.getPaymentMethod(id);
      dispatch({
        type: GET_PAYMENTMETHOD,
        data: res,
      });
      return Promise.resolve(res);
    }

    dispatch({
      type: GET_PAYMENTMETHOD,
      data: null,
    });
    return Promise.resolve(null);
 
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePaymentMethod = (payload) => async (dispatch) => {
  try {
    const res = await BillingService.updatePaymentMethod(payload);
    dispatch({
      type: UPDATE_PAYMENTMETHOD,
      data: res,
    });

    return Promise.resolve(res?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const setPaymentMethodId = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_PAYMENTMETHOD_ID,
      data: id,
    });

    return Promise.resolve(id);
  } catch (error) {
    return Promise.reject(error);
  }
};
