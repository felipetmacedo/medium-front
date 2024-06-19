myApp.controller("ModalSignUpCtrl", [
  "$scope",
  "UserService",
  "$modalInstance",
  function ($scope, UserService, $modalInstance) {
    $scope.formData = {
      name: "",
      email: "",
      password: "",
    };

    $scope.cancel = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.submit = function () {
      UserService.create($scope.formData)
        .then(() => {
          Swal.fire({
            title: "Conta criada com sucesso!",
            text: "Faça login para continuar!",
            icon: "success",
          });
          $modalInstance.close();
        })
        .catch(() => {
          Swal.fire({
            title: "Dados Inválidos!",
            text: "Verifique as suas informações!",
            icon: "error",
          });
        });
    };
  },
]);
