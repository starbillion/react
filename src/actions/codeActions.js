import axios from 'axios';

export function getCodes() {
  return dispatch => {
    return axios.get('/api/v1/codes');
  };
}