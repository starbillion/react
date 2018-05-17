import axios from 'axios';
import {browserHistory} from 'react-router';
import {setCurrentUser} from './authActions';

export function userSignupRequest(userData) {

    const headers = Object.assign({'Content-Type': 'application/json'});
    const request = new Request('http://www.tourize.com/api/v1/registrations', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({"user": userData})
    });
    return dispatch => {
        return fetch(request).then(response => response.json()).then(data => {
          if(data.errors){
            return data;
          }else{
            const token = data.authentication_token;
            const company_id = data.company_id;
            localStorage.setItem('tourizeToken', token);
            localStorage.setItem('companyId', company_id);
            dispatch(setCurrentUser(token));
            browserHistory.push('/company');
          }
        }).catch(error => {
           return error;
        });
    }
}

export function createCompanyRequest(companyData) {

    const headers = Object.assign({'Content-Type': 'application/json'});
    const request = new Request('http://www.tourize.com/api/v1/companies?user_token=' + localStorage.tourizeToken, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({"company": companyData})
    });
    return fetch(request).then(response => response.json()).then(data => {
        localStorage.setItem('companyId', data.id);
        browserHistory.push('/company/billing');
       return data;
    }).catch(error => {
      return error;
    });
}

export function addBillingRequest(billingData) {

    const headers = Object.assign({'Content-Type': 'application/json'});
    const request = new Request('http://www.tourize.com/api/v1/companies?user_token=' + localStorage.tourizeToken, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({"billing": billingData})
    });
    return fetch(request).then(response => {
        browserHistory.push('/');
       return response;
    }).catch(error => {
      return error;
    });
}

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);
  }
}	