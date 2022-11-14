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
    this.updateUser = (data) => {
        return $http.put(`${baseUrl}users/`, data)
    }
    this.deleteUser = () => {
        return $http.delete(`${baseUrl}users/`)
    }
    this.allUsers = filter => {
        if(filter){
            console.log(filter, 'filter user');
            return $http.get(`${baseUrl}users?username=${filter}`)
        }

        return $http.get(`${baseUrl}users/`)
    }
    
});