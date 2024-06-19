myApp.service("PostService", function ($http) {
  this.getPosts = (page) => {
    return $http.get(`${baseUrl}posts/?page=${page}`);
  };

  this.getPost = (id) => {
    return $http.get(`${baseUrl}posts/${id}`);
  };

  this.createPost = (post) => {
    return $http.post(`${baseUrl}posts/`, post);
  };

  this.likePost = (id) => {
    return $http.post(`${baseUrl}posts/${id}/like`);
  };

  this.dislikePost = (id) => {
    return $http.post(`${baseUrl}posts/${id}/dislike`);
  };

  this.deletePost = (id) => {
    return $http.delete(`${baseUrl}posts/${id}`);
  };
});
