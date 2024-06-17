myApp.controller("newUserController", [
  "$scope",
  "UserService",
  "$state",
  function ($scope, UserService, $state) {
    $scope.userData = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    $scope.err = false;

    const create = () => {
      return UserService.create($scope.userData)
        .then(() => {
          $scope.err = false;
        })
        .catch((e) => {
          const confirmation = Swal.fire({
            title: "dados inválidos",
            text: "Verifique as suas informações!",
            icon: "error",
            confirmButtonColor: "#04052e",
          });
          if (!confirmation.isConfirmed) {
            return;
          }

          $scope.err = true;
          localStorage.clear();
          $scope.userData.username = "";
          $scope.userData.email = "";
          $scope.userData.password = "";
          $scope.userData.confirmPassword = "";
        });
    };

    $scope.create = create;
  },
]);
