myApp.controller("movieController", [
  "$rootScope",
  "$scope",
  "MovieService",
  "$state",
  function ($rootScope, $scope, MovieService, $state) {
    $scope.isAdminUser = !!$rootScope.isAdmin;

    $scope.isUserLoggedIn = $rootScope.userLogged;

    const init = () => {
      $scope.loading = true;
    };

    const index = () => {
      MovieService.getCovers($scope.buscarFilmes)
        .then((resp) => {
          $scope.loading = false;
          $scope.covers = resp.data;
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

    const logOut = () => {
      Swal.fire({
        title: "Log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
        }
      });
    };

    $scope.logOut = logOut;
    $scope.busca = index;
    index();
    init();
  },
]);
