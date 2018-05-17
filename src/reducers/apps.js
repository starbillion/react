import * as types from '../actions/types';
import {browserHistory} from 'react-router';


const initialState = {
  apps: [],
  users: [],
  categories : [],
  languages : [],
  appTypes : [],
  moreData: [],
  generalInfo: {}
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case types.LOAD_APPS_SUCCESS:
     return Object.assign({}, state, {
             apps: action.apps,
             activeTour: null
      })
    case types.LOAD_APP_SUCCESS:
     return Object.assign({}, state, {
             generalInfo: action.app,
             activeTour: null
      })
    case types.CREATE_APP_SUCCESS:
      return Object.assign({}, state, {
             newApp: action.app
      }) 
    case types.UPDATE_TOUR_SUCCESS:
      return [
        state.apps.filter(app => app.id !== action.app.id),
        Object.assign({}, action.app)
      ]
    case types.DELETE_APP_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfAppToDelete = state.apps.findIndex(app => {return app.id == action.app.id})
      newState.apps.splice(indexOfAppToDelete, 1);
      browserHistory.push('/apps');
      return newState;
    }
    case types.LOAD_CATEGORIES_SUCCESS: {
     return Object.assign({}, state, {
             categories: action.categories,
      }) 
    }
    case types.LOAD_LANGUAGES_SUCCESS: {
       return Object.assign({}, state, {
             languages: action.languages,
      }) 
    }
    case types.LOAD_APPS_USERS:{
      return Object.assign({}, state, {
              users: action.users
      })  
    }
    case types.LOAD_APPS_TYPES_SUCCESS: {
      return Object.assign({}, state, {
             appTypes: action.appTypes,
      }) 
    }    
    case types.APP_MORE_SUCCESS: {
      return Object.assign({}, state, {
             moreData: action.moreData,
      }) 
    }
    default: 
      return state;
  }
}

