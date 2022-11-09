myApp.service("MovieService", function($http) {
    this.getMovies = () => {
        return $http.get(`${baseUrl}movies/`) 
    }
    this.showCover = (id) => {
        return $http.get(`${baseUrl}covers/show/${id}`) 
    }
    this.getCovers = () => {
        return $http.get(`${baseUrl}covers/all`) 
    }
});