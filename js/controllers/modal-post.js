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
      $modalInstance.dismiss("cancel");
    };

    $scope.submit = function () {
      PostService.createPost($scope.formData)
        .then(() => {
          $modalInstance.dismiss("cancel");
          Swal.fire({
            title: "Post criado com sucesso!",
            icon: "success",
            timer: 2000,
          });
          $scope.formData.title = "";
          $scope.formData.content = "";
        })
        .catch(() => {
          Swal.fire({
            title: "Dados Inválidos!",
            text: "Verifique as suas informações!",
            icon: "error",
          });
          localStorage.clear();
          $scope.formData.title = "";
          $scope.formData.conten = "";
          window.location.reload();
        });
    };
  },
]);
