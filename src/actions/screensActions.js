import axios from 'axios';
import * as types from './types';
import screenApi from '../api/ScreensApi';
import {browserHistory} from 'react-router';

export function loadScreensSuccess(screens) {
  return {type: types.LOAD_SCREENS_SUCCESS, screens};
}

export function loadAppScreensSuccess(appScreens) {
  return {type: types.LOAD_APPSCREENS_SUCCESS, appScreens};
}

export function loadScreens() {
  return function(dispatch) {
    return screenApi.getScreens().then(screens => {
    	// alert(JSON.stringify(screens));
      dispatch(loadScreensSuccess(screens));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadAppScreens(appID){
  return function(dispatch) {
    return screenApi.getAppScreens(appID).then(appScreens => {
    	// alert(JSON.stringify(appScreens));
      dispatch(loadAppScreensSuccess(appScreens));
    }).catch(error => {
      throw(error);
    });
  };
}