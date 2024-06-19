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
      PostService.createPost($scope.formData)
        .then(async () => {
          await Swal.fire({
            title: "Post criado com sucesso!",
            icon: "success",
            timer: 1000,
          });
          $scope.postData.title = "";
          $scope.postData.content = "";
        })
        .catch(() => {
          Swal.fire({
            title: "Erro ao criar post!",
            icon: "error",
          });
          $scope.postData.title = "";
          $scope.postData.content = "";
        });
    };
  },
]);
