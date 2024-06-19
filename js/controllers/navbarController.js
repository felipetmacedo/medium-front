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
          console.log(resp);
          localStorage.setItem("token", resp.data.data.token);
          localStorage.setItem("email", $scope.user.email);

          $scope.user.email = "";
          $scope.user.password = "";

          window.location.reload();
        })
        .catch((err) => {
          Swal.fire({
            title: "Algo deu errado",
            text:
              err.data && err.data.error === "Usuario bloqueado"
                ? err.data.error
                : "Verifique as suas informações!",
            icon: "error",
            confirmButtonColor: "#04052e",
          });
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
        .catch(() => {
          Swal.fire({
            title: "dados inválidos",
            text: "Verifique as suas informações!",
            icon: "error",
            confirmButtonColor: "#04052e",
          });
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
        reverseButtons: true,
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          $rootScope.userLogged = false;
          localStorage.clear();
          window.location.reload();
        }
      });
    };

    $scope.triggerLogin = async function () {
      const { value: formValues } = await Swal.fire({
        title: "Login",
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Email">
          <input id="swal-input2" class="swal2-input" placeholder="Password">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        reverseButtons: true,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value,
          ];
        },
      });
      if (formValues) {
        $scope.user.email = formValues[0];
        $scope.user.password = formValues[1];
        login();
      }
    };
    $scope.create = create;
    $scope.login = login;
    $scope.logOut = logOut;
  },
]);
