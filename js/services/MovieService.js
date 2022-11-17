myApp.service("MovieService", function ($http) {
    this.showCover = (id) => {
        return $http.get(`${baseUrl}covers/show/${id}`)
    }
    this.getCovers = filter => {
        if (filter) {
            return $http.get(`${baseUrl}covers/all?name=${filter}`)
        }
        return $http.get(`${baseUrl}covers/all`)
    }
    this.addWatched = (data) => {
        return $http.post(`${baseUrl}watched/`,data)
    }
    this.removeWatched = (id) => {
        return $http.delete(`${baseUrl}watched/${id}`,)
    }

});