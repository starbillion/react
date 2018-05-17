import axios from 'axios';

import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('tourizeToken');
    localStorage.removeItem('companyId');
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('http://www.tourize.com/api/v1/tokens.json', data).then(res => {
      const token = res.data.json.authentication_token;
      const company_id = res.data.json.company_id;
      localStorage.setItem('tourizeToken', token);
      localStorage.setItem('companyId', company_id);
      dispatch(setCurrentUser(token,company_id));
    });
  }
}