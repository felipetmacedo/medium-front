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
        return $http.delete(`${baseUrl}watched/${id}`)
    }
    this.checkWatched = (movie_id) => {
        return $http.get(`${baseUrl}watched/${movie_id}`)
    }
    this.updateWatched = (movie_id, data) => {
        console.log(movie_id, data)
        return $http.put(`${baseUrl}watched/${movie_id}`, data)
    }
    this.deleteMovie = (id) => {
        return  $http.delete(`${baseUrl}movies/${id}`)
    }
    this.manageMovie = (data,id) => {
        if(id){
            return  $http.put(`${baseUrl}movies/${id}`, data)
        }
        return  $http.post(`${baseUrl}movies/`, data)
    }
    this.addCover = (data, id) => {
        console.log(data)
        console.log(id, 'id')
        return  $http.post(`${baseUrl}covers/${id}`,{file: data})
    }
    this.showMovie = (id) => {
        return  $http.get(`${baseUrl}movies/${id}`)
    }


});