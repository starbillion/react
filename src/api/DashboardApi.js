class dashboardApi {

  static getAllDashoardData() {
    const request = new Request('http://www.tourize.com/api/v1/companies/'+localStorage.companyId+'/dashboard?user_token=' + localStorage.tourizeToken, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default dashboardApi;