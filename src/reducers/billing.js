import * as types from '../actions/types';
import {browserHistory} from 'react-router';

const initialState = {
  data: []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case types.LOAD_BILLING_SUCCESS:
     return Object.assign({}, state, {
             data: action.billing
      })  
    default: 
      return state;
  }
}

