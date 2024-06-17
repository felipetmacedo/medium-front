myApp.controller("homeController", [
  "$rootScope",
  "$scope",
  "PostService",
  function ($rootScope, $scope, PostService) {
    $scope.isUserLoggedIn = $rootScope.userLogged;

    const init = () => {
      $scope.loading = true;
    };

    const list = () => {
      PostService.getPosts(1)
        .then((resp) => {
          $scope.loading = false;
          $scope.covers = resp.data;
          console.log(resp.data);
        })
        .catch((e) => {
          $scope.loading = false;
          Swal.fire({
            position: "center",
            icon: "error",
            title: "an error ocurred",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    };

    init();
    list();
    $scope.busca = list;
  },
]);
