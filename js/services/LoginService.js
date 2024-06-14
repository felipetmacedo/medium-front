myApp.service("LoginService", function ($http) {
  this.getToken = (data) => {
    return $http.post(`${baseUrl}users/login`, data);
  };
});
