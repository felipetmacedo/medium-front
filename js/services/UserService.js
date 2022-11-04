myApp.service("UserService", function($http) {
    this.create = (data) =>  {
        return $http.post(`${baseUrl}users/`, data)
    };
});