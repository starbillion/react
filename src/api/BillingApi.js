class billiingApi {

  static getBillingData() {
    const request = new Request('http://www.tourize.com/api/v1/companies/'+localStorage.companyId+ '/invoices?user_token=' + localStorage.tourizeToken, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getBillingDetails(invoiceId) {
    const request = new Request('http://www.tourize.com/api/v1/companies/'+localStorage.companyId+ '/invoices/'+invoiceId+'?user_token=' + localStorage.tourizeToken, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

}

export default billiingApi;