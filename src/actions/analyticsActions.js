import axios from 'axios';
import * as types from './types';
import analyticApi from '../api/AnalyticsApi';
import {browserHistory} from 'react-router';

export function loadSalesSuccess(sales) {
  return {type: types.LOAD_SALES_SUCCESS, sales};
}

export function loadEngagementSuccess(engagements) {
  return {type: types.LOAD_ENGAGEMENTS_SUCCESS, engagements};
}

export function loadDownloadSuccess(downloads) {
  return {type: types.LOAD_DOWNLOAD_SUCCESS, downloads};
}
export function getHeatMapDataSuccess(heatMapData) {
  return {type: types.GET_HEAT_MAP_DATA, heatMapData};
}

/*
export function getHeatMapData(appId, tourId) {
  return function(dispatch) {
    return analyticApi.getHeatMapData(appId, tourId).then(heatMapData => {
      dispatch(getHeatMapDataSuccess(heatMapData));
    }).catch(error => {
      throw(error);
    });
  };
}*/

export function getHeatMapData(appId, tourId) {
  return dispatch => {
    return axios.get('http://www.tourize.com/api/v1/companies/'+ localStorage.companyId+ '/apps/' + appId + '/tours/' + tourId + '/pings.json?user_token=' + localStorage.tourizeToken);
  }
}


export function loadSales() {
  return function(dispatch) {
    return analyticApi.getAllSales().then(sales => {
      dispatch(loadSalesSuccess(sales));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadEngagements() {
  return function(dispatch) {
    return analyticApi.getAllEngagements().then(engagements => {
      dispatch(loadEngagementSuccess(engagements));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadDownloads() {
  return function(dispatch) {
    return analyticApi.getAllDownloads().then(downloads => {
      dispatch(loadDownloadSuccess(downloads));
    }).catch(error => {
      throw(error);
    });
  };
}