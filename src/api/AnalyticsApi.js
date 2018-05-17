class AnalyticsApi {

  static getAllSales(pageIndex, perPage) {
    const request = new Request('http://www.tourize.com/api/v1/companies/' + localStorage.companyId + '/sales.json?user_token=' + localStorage.tourizeToken, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getHeatMapData(appId, tourId){
    const request = new Request('http://www.tourize.com/api/v1/companies/' + localStorage.companyId + '/apps/' + appId + '/tours/' + tourId + '/pings?user_token=' + localStorage.tourizeToken,{
      method: 'GET'
    });
    return fetch(request)
    .then(response=>{
      return response.json();
    })
    .catch(error => {
      return error;
    });
  }

  static getAllEngagements() {
    const request = new Request('http://www.tourize.com/api/v1/companies/' + localStorage.companyId + '/engagement.json?user_token=' + localStorage.tourizeToken, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getAllDownloads() {
    const request = new Request('http://www.tourize.com/api/v1/companies/' + localStorage.companyId + '/downloads?user_token=' + localStorage.tourizeToken, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

}

export default AnalyticsApi;