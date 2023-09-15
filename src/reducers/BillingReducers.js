import {
  GET_USER_BY_ID,
  ADD_STRIPECUSTOMER_ID,
  GET_PAYMENTMETHOD_LIST,
  GET_PAYMENTMETHOD,
  SET_PAYMENTMETHOD_ID
} from "../constants/billingConstants";

const initialState = {
  paymentMethods: [],
  paymentMethod: {},
  userDetails: {},
  paymentOptions: [],
  stripeCustomerId: "cus_OQJk8HadB6d0Vq",
  selectedPaymentMethodId: null
};

const BillingReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BY_ID: {
      return {
        ...state,
        userDetails: action.data,
      };
    }
    case ADD_STRIPECUSTOMER_ID: {
      return {
        ...state,
        userDetails: { ...state.userDetails, stripeCustomerId: action.data },
        stripeCustomerId: action.data,
      };
    }
    case GET_PAYMENTMETHOD_LIST: {
      return {
        ...state,
        paymentMethods: action.data,
      };
    }
    case GET_PAYMENTMETHOD: {
      return {
        ...state,
        paymentMethod: action.data,
      };
    }
    case SET_PAYMENTMETHOD_ID: {
      return {
        ...state,
        selectedPaymentMethodId: action.data,
      };
    }
    default:
      return state;
  }
};

export default BillingReducers;
