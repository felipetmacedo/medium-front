myApp.service("LoginService", function($http) {
    this.getToken = (data) =>  {
        // console.log(data)
        return $http.post(`${baseUrl}login/`, data)
    };
});