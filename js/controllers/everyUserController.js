myApp.controller("everyUserController", [
  "$rootScope",
  "$scope",
  "UserService",
  "$state",
  "$location",
  "$timeout",
  function ($rootScope, $scope, UserService, $state, $location, $timeout) {
    $scope.isAdminUser = !!$rootScope.isAdmin;
    $scope.showButtons = !$state.params.id;

    const init = () => {
      $scope.loading = true;
      if (!$scope.isAdminUser) {
        Swal.fire({
          position: "center",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
        $state.go("home");
        return;
      }
      everyUser();
    };

    const everyUser = () => {
      UserService.allUsers($scope.buscarUsers)
        .then((resp) => {
          $scope.users = resp.data;
          $timeout(() => {
            $scope.loading = false;
          }, 500);
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
        title: "log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "yes",
      }).then((result) => {
        $scope.loading = false;
        if (result.isConfirmed) {
          $state.go("login");
          localStorage.clear();
        }
      });
    };

    const refresh = (user) => {
      $location.path(`/profile/${user.id}`);
    };

    $scope.refresh = refresh;
    $scope.logOut = logOut;
    $scope.users = everyUser;

    init();
  },
]);
