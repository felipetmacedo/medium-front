myApp.service("PostService", function ($http) {
  this.getPosts = (page) => {
    return $http.get(`${baseUrl}posts/?page=${page}`);
  };

  this.getPost = (id) => {
    return $http.get(`${baseUrl}posts/${id}`);
  };
});
