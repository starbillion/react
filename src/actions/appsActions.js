import axios from 'axios';
import * as types from './types';
import appApi from '../api/AppsApi';
import {browserHistory} from 'react-router';

export function loadAppsSuccess(apps) {
  return {type: types.LOAD_APPS_SUCCESS, apps};
}

export function loadAppSuccess(app) {
  return {type: types.LOAD_APP_SUCCESS, app};
}

export function updateAppSuccess(app) {
  return {type: types.UPDATE_APP_SUCCESS, app}
}

export function createAppSuccess(app) {
  return {type: types.CREATE_APP_SUCCESS, app}
}

export function deleteAppSuccess(app) {
  return {type: types.DELETE_APP_SUCCESS, app}
}

export function loadUsers(users) {
  return {type: types.LOAD_APPS_USERS, users};
}

export function loadAllCategoriesSuccess(categories) {
  return {type: types.LOAD_CATEGORIES_SUCCESS, categories};
}

export function loadAllLanguagesSuccess(languages) {
  return {type: types.LOAD_LANGUAGES_SUCCESS, languages};
}

export function loadAllAppTypesSuccess(appTypes) {
  return {type: types.LOAD_APPS_TYPES_SUCCESS, appTypes};
}

export function appMoreSuccess(moreData) {
  return {type: types.APP_MORE_SUCCESS, moreData};
}


export function loadAppMore(appId) {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return appApi.getAppsMore(appId).then(moreData => {
      dispatch(appMoreSuccess(moreData.more));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadAppInfo(appId) {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return appApi.getApp(appId).then(generalInfo => {
      dispatch(loadAppSuccess(generalInfo));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadApp(appID) {
  return dispatch => {
    return axios.get('http://www.tourize.com/api/v1/companies/'+ localStorage.companyId+ '/apps/' + appID + '.json?user_token=' + localStorage.tourizeToken);
  }
}

export function loadCategories() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return appApi.getAllCategories().then(categories => {
      
      dispatch(loadAllCategoriesSuccess(categories));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadLanguages() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return appApi.getAllLanguages().then(languages => {
      
      dispatch(loadAllLanguagesSuccess(languages));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadApps() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return appApi.getAllApps().then(apps => {
      
      dispatch(loadAppsSuccess(apps));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateApp(appId, data) {
  return function (dispatch) {
    return appApi.updateApp(appId, data).then(responseApp => {
      dispatch(updateAppSuccess(responseApp));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveApp(app,callback) {
  return function (dispatch) {
        return appApi.createApp(app).then(responseApp => {
          if(callback){
            callback(responseApp);
          }
          
        }).catch(error => {
          throw(error);
        });
    }
  };

export function createApp(app) {
  return function (dispatch) {
         dispatch(createAppSuccess(app));
    }
};

export function deleteApp(app) {
  return function(dispatch) {
     return appApi.deleteApp(app).then(() => {
      dispatch(deleteAppSuccess(app));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}

/**
 * This function will dispatch user list respeective to capmany id
 */
export function loadAppUsers() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return appApi.getAllAppUsers().then(users => {
      
      dispatch(loadUsers(users));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadAllAppTypes() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return appApi.getAllAppTypes().then(types => {
      
      dispatch(loadAllAppTypesSuccess(types));
    }).catch(error => {
      throw(error);
    });
  };
}