myApp.controller("showPostController", [
  "$scope",
  "PostService",
  "$stateParams",
  function ($scope, PostService, $stateParams) {
    const id = $stateParams.id;
    $scope.loading = true;

    const init = () => {
      show();
    };

    const show = () => {
      PostService.getPost(id)
        .then((resp) => {
          $scope.post = resp.data.data;
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "an error ocurred",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .finally(() => {
          $scope.loading = false;
        });
    };

    init();
  },
]);
