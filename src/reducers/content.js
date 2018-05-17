import * as types from '../actions/types';
import {browserHistory} from 'react-router';

const initialState = {
  contents: []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case types.LOAD_CONTENTS_SUCCESS:
     return Object.assign({}, state, {
             contents: action.contents
      })  
    default: 
      return state;
  }
}