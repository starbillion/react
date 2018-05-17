import axios from 'axios';
import * as types from './types';
import billingApi from '../api/BillingApi';
import {browserHistory} from 'react-router';

export function loadBillingSuccess(billing) {
  return {type: types.LOAD_BILLING_SUCCESS, billing};
}
export function loadBillingDetailSuccess(detail) {
  return {type: types.LOAD_BILLING_DETAIL_SUCCESS, detail};
}

export function loadBilling() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return billingApi.getBillingData().then(data => {
      
      dispatch(loadBillingSuccess(data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function getBllingDetails(invoiceId) {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return billingApi.getBillingDetails(invoiceId).then(data => {
      
      dispatch(loadBillingDetailSuccess(data));
    }).catch(error => {
      throw(error);
    });
  };
}
