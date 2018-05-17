import * as types from '../actions/types';
import {browserHistory} from 'react-router';

const initialState = {
  data: []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case types.LOAD_DASHBOARD_SUCCESS:
     return Object.assign({}, state, {
             data: action.data
      })  
    default: 
      return state;
  }
}

