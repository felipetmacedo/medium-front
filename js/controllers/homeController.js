myApp.controller("homeController", [
  "$rootScope",
  "$scope",
  "PostService",
  function ($rootScope, $scope, PostService) {
    $scope.isUserLoggedIn = $rootScope.userLogged;
    $scope.loading = true;

    const list = () => {
      PostService.getPosts(1)
        .then((resp) => {
          $scope.posts = resp.data.data.posts;
        })
        .catch((e) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "An error occurred",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .finally(() => {
          $scope.loading = false;
        });
    };

    const truncate = (text, length) => {
      return text.length > length ? text.substring(0, length) + "..." : text;
    };

    list();

    $scope.busca = list; // Assign the list function to $scope.busca
    $scope.truncate = truncate; // Assign the truncate function to $scope.truncate
  },
]);
