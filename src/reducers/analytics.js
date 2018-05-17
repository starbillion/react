import * as types from '../actions/types';
import { browserHistory } from 'react-router';

const initialState = {
  sales: [],
  engagements: [],
  downloads: [],
  heatMapData: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOAD_SALES_SUCCESS:
      return Object.assign({}, state, {
        sales: action.sales
      })
    case types.LOAD_ENGAGEMENTS_SUCCESS:
      return Object.assign({}, state, {
        engagements: action.engagements
      })
    case types.LOAD_DOWNLOAD_SUCCESS:
      return Object.assign({}, state, {
        downloads: action.downloads
      })
    case types.GET_HEAT_MAP_DATA:
      return Object.assign({}, state, {
        heatMapData: action.heatMapData
      })
    default:
      return state;
  }
}