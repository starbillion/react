class tourApi {

  static getAllTours(appId) {
    const request = new Request('http://www.tourize.com/api/v1/companies/'+localStorage.companyId+'/apps/'+appId+ '/tours?page=1&per_page=100', {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getTour(appId, tourId) {
//    const headers = this.requestHeaders();
    const request = new Request('http://www.tourize.com/api/v1/companies/'+ localStorage.companyId+ '/apps/' + appId +"/tours/"+ tourId, {
      method: 'GET',
      /*headers: headers*/
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

/**
 * 
 * @param {*tourid} tour 
 */
  static updateTour(appId, tour) {

    const headers = Object.assign({'Content-Type': 'application/json'});
    const request = new Request('http://www.tourize.com/api/v1/companies/'+localStorage.companyId+ '/apps/'+ appId +'/tours/' + `${tour.id}`+'?user_token=' + localStorage.tourizeToken,  {
      method: 'PUT',
      headers: headers, 
      body: JSON.stringify({"tour": tour})
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

 static createTour(tour, appId) {
    const headers = Object.assign({'Content-Type': 'application/json'});
    const request = new Request('http://www.tourize.com/api/v1/companies/'+localStorage.companyId+ '/apps/' + appId +'/tours.json?user_token=' + localStorage.tourizeToken, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({"tour": tour})
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteTour(tour) {
    const headers = Object.assign({'Content-Type': 'application/json'},{ 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'});
    const request = new Request(`http://www.tourize.com/api/v1/tours/${tour.id}`+'?user_token=' + localStorage.tourizeToken, {
      method: 'DELETE', 
       mode: 'no-cors',
      headers: headers
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

/**
 * Fetch All Categories from server.
 * @param {*} category 
 */
  static getAllCategories(category) {
    const request = new Request(`http://www.tourize.com/api/v1/categories.json?user_token=` + localStorage.tourizeToken, {
      method: 'GET',
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  /**
 * Fetch All Langauges from server.
 * @param {*} languages 
 */
  static getAllLanguages(languages) {
    const request = new Request(`http://www.tourize.com/api/v1/languages.json?user_token=` + localStorage.tourizeToken, {
      method: 'GET',
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  /**
 * Fetch All Categories from server.
 * @param {*} category 
 */
  static getAllSocialTypes(socialTypes) {
    const request = new Request(`http://www.tourize.com/api/v1/social_media_types.json?user_token=` + localStorage.tourizeToken, {
      method: 'GET',
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

 static getToursMap(appId) {
    const request = new Request('http://www.tourize.com/api/v1/companies/'+localStorage.companyId+'/apps/'+appId+ '/maps?user_token='+ localStorage.tourizeToken, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

   static getAllToursStops(appId, tourId) {
    const request = new Request('http://www.tourize.com/api/v1/companies/'+localStorage.companyId+'/apps/'+appId+ '/tours/'+tourId + '/stops?user_token=' + localStorage.tourizeToken, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }


}

export default tourApi;