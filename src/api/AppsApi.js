class appApi {

  static getAllApps() {
    const request = new Request('http://www.tourize.com/api/v1/companies/'+localStorage.companyId+ '/apps', {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getApp(appId) {
    const request = new Request('http://www.tourize.com/api/v1/companies/'+localStorage.companyId+ '/apps/'+appId, {
      method: 'GET'
    });
    
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

 static createApp(app) {
    const headers = Object.assign({'Content-Type': 'application/json'});
    const request = new Request('http://www.tourize.com/api/v1/companies/'+localStorage.companyId+ '/apps?user_token=' + localStorage.tourizeToken, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({"app": app})
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteApp(app) {
    const headers = Object.assign({'Content-Type': 'application/json'},{ 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'});
    const request = new Request('http://www.tourize.com/api/v1/companies/' + localStorage.companyId + `/apps/${app.id}` +'?user_token=' + localStorage.tourizeToken, {
      method: 'DELETE', 
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
 * Fetch All Users from server.
 */
   static getAllAppUsers() {
    const request = new Request('http://www.tourize.com/api/v1/companies/'+localStorage.companyId+ '/users.json?user_token=' + localStorage.tourizeToken, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

 static getAppsMore(appId) {
    const request = new Request('http://www.tourize.com/api/v1/companies/'+localStorage.companyId+'/apps/'+appId+ '/more', {
      method: 'GET'
    });
    
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

    /**
 * Fetch All App types from server.
 * @param {*} types 
 */
  static getAllAppTypes() {
    const request = new Request(`http://www.tourize.com/api/v1/types.json?user_token=` + localStorage.tourizeToken, {
      method: 'GET',
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
  

  static updateApp(appId, data) {
    const headers = Object.assign({'Content-Type': 'application/json'});
    const request = new Request('http://www.tourize.com/api/v1/companies/'+localStorage.companyId+ '/apps/'+appId + '?user_token=' + localStorage.tourizeToken, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({"app": data})
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }


}

export default appApi;