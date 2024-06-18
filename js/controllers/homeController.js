myApp.controller("homeController", [
  "$rootScope",
  "$scope",
  "PostService",
  function ($rootScope, $scope, PostService) {
    $scope.isUserLoggedIn = $rootScope.userLogged;

    const init = () => {
      $scope.loading = true;
      list();
    };

    const list = () => {
      PostService.getPosts(1)
        .then((resp) => {
          $scope.loading = false;
          console.log(resp.data.data.posts);
          $scope.posts = resp.data.data.posts;
        })
        .catch((e) => {
          $scope.loading = false;
          Swal.fire({
            position: "center",
            icon: "error",
            title: "An error occurred",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    };

    const truncate = (text, length) => {
      return text.length > length ? text.substring(0, length) + "..." : text;
    };

    init(); // Initialize when the controller is loaded
    $scope.busca = list; // Assign the list function to $scope.busca
    $scope.truncate = truncate; // Assign the truncate function to $scope.truncate
  },
]);
