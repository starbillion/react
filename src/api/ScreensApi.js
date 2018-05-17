class screenApi { 

	static getScreens() {
	    const request = new Request('http://www.tourize.com/api/v1/screens', {
		  method: 'GET'
		});		  
		return fetch(request).then(response => {
		  return response.json();
		}).catch(error => {
		  return error;
		});
	}

 	static getAppScreens(appID){
 		// alert('http://www.tourize.com/api/v1/companies/'+ localStorage.companyId+ '/apps/' + appID + '/app_screens');
 		const request = new Request('http://www.tourize.com/api/v1/companies/'+ localStorage.companyId+ '/apps/' + appID + '/app_screens', {
		  method: 'GET'
		});		  
		return fetch(request).then(response => {
		  return response.json();
		}).catch(error => {
		  return error;
		});
	}
}

export default screenApi;
