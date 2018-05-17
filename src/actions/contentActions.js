import axios from 'axios';
import * as types from './types';
import contentApi from '../api/ContentsApi';
import {browserHistory} from 'react-router';

export function loadContentSuccess(contents) {
  return {type: types.LOAD_CONTENTS_SUCCESS, contents};
}

export function loadContents(pageIndex, perPage) {
  return function(dispatch) {
    return contentApi.getAllContents(pageIndex, perPage).then(contents => {
      dispatch(loadContentSuccess(contents));
    }).catch(error => {
      throw(error);
    });
  };
}