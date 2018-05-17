import axios from 'axios';
import * as types from './types';
import dashboardApi from '../api/DashboardApi';
import {browserHistory} from 'react-router';

export function loadAllDashboardDataSuccess(data) {
  return {type: types.LOAD_DASHBOARD_SUCCESS, data};
}

export function loadAllDashboardData() {
  return function(dispatch) {
    return dashboardApi.getAllDashoardData().then(data => {
      
      dispatch(loadAllDashboardDataSuccess(data));
    }).catch(error => {
      throw(error);
    });
  };
}

