myApp.service("UserService", function ($http) {
    this.create = (data) => {
        return $http.post(`${baseUrl}users/`, data)
    };
    this.profile = id => {
        if (id) {
            return $http.get(`${baseUrl}users/profile/${id}`)
        }
        return $http.get(`${baseUrl}users/profile/`)
    };
    this.watchedMovies = (id) => {
        if (id) {
            return $http.get(`${baseUrl}covers/watched/${id}`)
        }
        return $http.get(`${baseUrl}covers/watched/`)
    }
    this.updateUser = (data) => {
        return $http.put(`${baseUrl}users/`, data)
    }
    this.deleteUser = () => {
        return $http.delete(`${baseUrl}users/`)
    }
    this.allUsers = filter => {
        if (filter) {
            return $http.get(`${baseUrl}users?username=${filter}`)
        }
        return $http.get(`${baseUrl}users/`)
    }
    this.deleteOtherUser = (id) => {
        return $http.delete(`${baseUrl}users/${id}`) 
    }
    this.makeAdmin = (data, id) => {
        return $http.put(`${baseUrl}users/${id}`, data) 
    }

});