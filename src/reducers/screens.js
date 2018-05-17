import * as types from '../actions/types';
import {browserHistory} from 'react-router';


const initialState = {
  screens: [],
  appScreens: []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case types.LOAD_SCREENS_SUCCESS: {
      return Object.assign({}, state, {
             screens: action.screens,
      }) 
    }
    case types.LOAD_APPSCREENS_SUCCESS: {
      return Object.assign({}, state, {
             appScreens: action.appScreens,
      }) 
    }
    default: 
      return state;
  }
}

