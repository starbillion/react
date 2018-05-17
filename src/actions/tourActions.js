import axios from 'axios';
import * as types from './types';
import tourApi from '../api/ToursApi';
import {browserHistory} from 'react-router';

export function loadToursSuccess(tours) {
  return {type: types.LOAD_TOURS_SUCCESS, tours};
}

export function updateTourSuccess(tour) {
  return {type: types.UPDATE_TOUR_SUCCESS, tour}
}

export function createTourSuccess(tour) {
  return {type: types.CREATE_TOUR_SUCCESS, tour}
}

export function deleteTourSuccess(tour) {
  return {type: types.DELETE_TOUR_SUCCESS, tour}
}

export function loadAllCategoriesSuccess(categories) {
  return {type: types.LOAD_CATEGORIES_SUCCESS, categories};
}

export function loadAllSocialTypesSuccess(socialTypes) {
  return {type: types.LOAD_SOCIAL_TYPES_SUCCESS, socialTypes};
}

export function getTourSuccess(tour) {
  return {type: types.GET_TOUR_SUCCESS, tour};
}

export function loadAllLanguagesSuccess(languages) {
  return {type: types.LOAD_LANGUAGES_SUCCESS, languages};
}

export function tourMapsSuccess(mapsData) {
  return {type: types.TOUR_MAP_SUCCESS, mapsData};
}

export function tourStopsSuccess(stopsData) {
  return {type: types.TOUR_STOPS_SUCCESS, stopsData};
}




export function loadTour(tourId) {
  return dispatch => {
    return axios.get('http://www.tourize.com/api/v1/companies/'+ localStorage.companyId+ '/apps/' + tourId + '.json?user_token=' + localStorage.tourizeToken);
  }
}

export function getTour(appId, tourId) {
  return function(dispatch) {
    return tourApi.getTour(appId, tourId).then(tour => {
      
      dispatch(getTourSuccess(tour));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadCategories() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return tourApi.getAllCategories().then(categories => {
      
      dispatch(loadAllCategoriesSuccess(categories));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadSocialMediaTypes() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return tourApi.getAllSocialTypes().then(socialTypes => {
      dispatch(loadAllSocialTypesSuccess(socialTypes));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadLanguages() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return tourApi.getAllLanguages().then(languages => {
      
      dispatch(loadAllLanguagesSuccess(languages));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadTours(appId) {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return tourApi.getAllTours(appId).then(tours => {
      
      dispatch(loadToursSuccess(tours));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateTour(appId, tour) {
  return function (dispatch) {
    return tourApi.updateTour(appId, tour).then(responseTour => {
      dispatch(updateTourSuccess(responseTour));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveTour(tour, appId) {
  return function (dispatch) {
        return tourApi.createTour(tour, appId).then(responseTour => {

          // browserHistory.push(`/tours/${responseTour.id}/build`);

          return responseTour;
        }).catch(error => {
          throw(error);
        });
    }
  };

export function createTour(tour) {
  return function (dispatch) {
         dispatch(createTourSuccess(tour));
    }
};

export function deleteTour(tour) {
  return function(dispatch) {
    return tourApi.deleteTour(tour).then(() => {
      console.log(`Deleted ${tour.id}`)
      dispatch(deleteTourSuccess(tour));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}


export function loadToursMap(appId) {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return tourApi.getToursMap(appId).then(mapsData => {
      
      dispatch(tourMapsSuccess(mapsData));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadToursStops(appId, tourId) {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return tourApi.getAllToursStops(appId, tourId).then(stops => {
        dispatch(tourStopsSuccess(stops));
       return stops;
    }).catch(error => {
      throw(error);
    });
  };
}