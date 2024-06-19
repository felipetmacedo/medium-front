myApp.controller("ModalPostCtrl", [
  "$scope",
  "PostService",
  "$modalInstance",
  function ($scope, PostService, $modalInstance) {
    $scope.formData = {
      title: "",
      content: "",
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    $scope.submit = function () {
      PostService.createPost($scope.formData)
        .then(() => {
          $modalInstance.close();

          Swal.fire({
            title: "Post criado com sucesso!",
            icon: "success",
            timer: 2000,
          });
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
