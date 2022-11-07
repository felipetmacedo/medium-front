myApp.service("MovieService", function($http) {
    this.getMovies = () => {
        return $http.get(`${baseUrl}movies/`) 
    }
});