myApp.service("PostService", function ($http) {
  this.getPosts = (page) => {
    return $http.get(`${baseUrl}posts/?page=${page}`);
  };
});
