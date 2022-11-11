myApp.service("UserService", function($http) {
    this.create = (data) =>  {
        return $http.post(`${baseUrl}users/`, data)
    };
    this.profile = () => {
        return $http.get(`${baseUrl}users/profile/`)
    };
    this.watchedMovies = () => {
        return $http.get(`${baseUrl}covers/watched/`)
    }
    
});