import { all } from 'redux-saga/effects'
import BillingSaga from './billingSaga';
import RingSaga from './ringSaga'




export default function* rootSaga() {
  yield all([
    BillingSaga(),
    RingSaga(),
  ])
}