import { axiosClient,axiosClientWithToken } from "../Service/ServiceClient";

const API = "https://mentorzapi.azurewebsites.net/api";

const BillingService = {
  GetUserById: async (payload) => {
    if (payload.token) {
      let url = API + `/User/GetProfileById?userId=${payload.userId}`;
      return await axiosClient(payload.token)
        .get(`${url}`, {})
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error;
        });
    }
  },
  AddStripeCustomerId: async (token, payload) => {
    if (token) {
      let url = API + `/Stripe/Customer/Add`;
      return await axiosClient(token)
        .post(`${url}`, payload)
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error;
        });
    }
  },
  updateUserDetails: async (payload) => {
    if (payload) {
      let url = API + `/User/Update`;
      return await axiosClientWithToken(payload)
        .post(`${url}`, payload)
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error;
        });
    }
  },
  getPaymentMethodList: async (stripeCustomerId) => {
      let url = `${API}/Stripe/Customer/PaymentMethod/List?stripeCustomerId=${stripeCustomerId}`;
      return await axiosClientWithToken()
        .get(`${url}`)
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error;
        });
  },
  addPaymentMethod: async (payload) => {
    let url = `${API}/Stripe/Customer/PaymentMethod/Add`;
    return await axiosClientWithToken()
      .post(`${url}`, payload)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  deletePaymentMethod: async (cardid) => {
    let url = `${API}/Stripe/Customer/PaymentMethod/Detach?paymentMethodId=${cardid}`;
    return await axiosClientWithToken()
      .get(`${url}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  getPaymentMethod: async (paymentMethodId) => {
    let url = `${API}/Stripe/Customer/PaymentMethod/Get?paymentMethodId=${paymentMethodId}`;
    return await axiosClientWithToken()
      .get(`${url}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  updatePaymentMethod: async (payload) => {
    let url = `${API}/Stripe/Customer/PaymentMethod/Update`;
    return await axiosClientWithToken()
      .post(`${url}`, payload)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};


export default BillingService;
