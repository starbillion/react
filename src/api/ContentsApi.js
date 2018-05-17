class contentApi {

  static getAllContents(pageIndex, perPage ) {
    const request = new Request('http://www.tourize.com/api/v1/companies/'+localStorage.companyId+'/contents?page='+pageIndex+'&per_page='+perPage, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

}

export default contentApi;