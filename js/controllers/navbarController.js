myApp.controller("navbarController", [
  "$rootScope",
  "$scope",
  "UserService",
  "$state",
  function ($rootScope, $scope, UserService, $state) {
    $scope.isUserLoggedIn = $rootScope.userLogged;
    $scope.user = {
      email: "",
      password: "",
    };

    $scope.formData = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    const login = () => {
      UserService.login($scope.user)
        .then((resp) => {
          localStorage.setItem("token", resp.data.token);
          localStorage.setItem("email", $scope.user.email);

          $scope.user.email = "";
          $scope.user.password = "";

          $state.go("home");
        })
        .catch((err) => {
          const confirmation = Swal.fire({
            title: "Algo deu errado",
            text:
              err.data && err.data.error === "Usuario bloqueado"
                ? err.data.error
                : "Verifique as suas informações!",
            icon: "error",
            confirmButtonColor: "#04052e",
          });
          if (!confirmation.isConfirmed) {
            return;
          }
          localStorage.clear();
          $scope.user.password = "";
        });
    };

    const create = () => {
      return UserService.create($scope.formData)
        .then(() => {
          $scope.err = false;
          $state.go("home");
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
          $scope.formData.username = "";
          $scope.formData.email = "";
          $scope.formData.password = "";
          $scope.formData.confirmPassword = "";
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
          $rootScope.userLogged = false;
          localStorage.clear();
          window.location.reload();
        }
      });
    };

    $scope.create = create;
    $scope.login = login;
    $scope.logOut = logOut;
  },
]);
