import * as types from '../actions/types';
import {browserHistory} from 'react-router';


const initialState = {
  tours: [],
  tour: {},
  categories :[],
  languages : [],
  socialMediaTypes : [],
  mapsData : [],
  stopsData : []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case types.LOAD_TOURS_SUCCESS:
     return Object.assign({}, state, {
             tours: action.tours,
              activeTour: null
      })  
    case types.LOAD_TOUR_SUCCESS:
     return [ 
       ...state,
      action.tour
     ]
    case types.CREATE_TOUR_SUCCESS:
      return Object.assign({}, state, {
             newTour: action.tour
      }) 
    case types.GET_TOUR_SUCCESS:
      return Object.assign({}, state, {
             tour: action.tour
      }) 
    case types.UPDATE_TOUR_SUCCESS:
      console.log(action.tour);
      
      return [
        state.tours.filter(tour => tour.id !== action.tour.id),
        Object.assign({}, action.tour)
      ]
    case types.DELETE_TOUR_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfTourToDelete = state.findIndex(tour => {return tour.id == action.tour.id})
      newState.splice(indexOfTourToDelete, 1);
      browserHistory.push('/tours');
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
    case types.LOAD_SOCIAL_TYPES_SUCCESS: {
       return Object.assign({}, state, {
             socialMediaTypes: action.socialTypes,
      }) 
    }
    case types.TOUR_MAP_SUCCESS: {
       return Object.assign({}, state, {
             mapsData: action.mapsData,
      }) 
    }
    case types.TOUR_MAP_SUCCESS: {
       return Object.assign({}, state, {
             stopsData: action.stopsData,
      }) 
    }
    default: 
      return state;
  }
}