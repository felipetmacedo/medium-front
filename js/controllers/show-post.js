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
            title: "an error ocurred",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .finally(() => {
          $scope.loading = false;
        });
    };

    const like = () => {
      if ($scope.post.is_liked) {
        PostService.dislikePost(id)
          .then((resp) => {
            window.location.reload();
          })
          .catch((err) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "an error ocurred",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      } else {
        PostService.likePost(id)
          .then((resp) => {
            window.location.reload();
          })
          .catch((err) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "an error ocurred",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    };

    const deletePost = () => {
      PostService.deletePost(id)
        .then((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Post deleted",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.href = "#!/home";
          }, 1500);
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "an error ocurred",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    };

    init();
    $scope.deletePost = deletePost;
    $scope.like = like;
  },
]);
