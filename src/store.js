import { configureStore } from '@reduxjs/toolkit'
import BillingReducers from './reducers/BillingReducers';



export default configureStore({
  reducer: {
    billings: BillingReducers
  }
});