myApp.controller("showPostController", [
  "$scope",
  "PostService",
  "$stateParams",
  "$modal",
  function ($scope, PostService, $stateParams, $modal) {
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
            window.location.href = "";
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

    const editPost = () => {
      $modal.open({
        templateUrl: "view/modal-post.html",
        controller: "ModalPostCtrl",
        windowClass: "doca-modal modal-dark fullscreen-modal",
        backdropClass: "doca-modal__backdrop",
        resolve: {
          post: () => {
            return $scope.post;
          },
          id: () => {
            return id;
          },
        },
      });
    };

    init();
    $scope.editPost = editPost;
    $scope.deletePost = deletePost;
    $scope.like = like;
  },
]);
