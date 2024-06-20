myApp.controller("navbarController", [
  "$rootScope",
  "$scope",
  "$modal",
  function ($rootScope, $scope, $modal) {
    $scope.isUserLoggedIn = $rootScope.userLogged;

    const logOut = () => {
      Swal.fire({
        title: "Deseja sair?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        reverseButtons: true,
        confirmButtonText: "Sim",
      }).then((result) => {
        if (result.isConfirmed) {
          $rootScope.userLogged = false;
          localStorage.clear();
          window.location.reload();
        }
      });
    };

    $scope.triggerLogin = function () {
      $modal.open({
        templateUrl: "view/modal-login.html",
        controller: "ModalLoginCtrl",
        windowClass: "doca-modal modal-dark fullscreen-modal",
        backdropClass: "doca-modal__backdrop",
      });
    };

    $scope.triggerRegister = function () {
      $modal.open({
        templateUrl: "view/modal-signup.html",
        controller: "ModalSignUpCtrl",
        windowClass: "doca-modal modal-dark fullscreen-modal",
        backdropClass: "doca-modal__backdrop",
      });
    };
    $scope.triggerWrite = function () {
      $modal.open({
        templateUrl: "view/modal-post.html",
        controller: "ModalPostCtrl",
        windowClass: "doca-modal modal-dark fullscreen-modal",
        backdropClass: "doca-modal__backdrop",
        resolve: {
          post: () => {
            return null;
          },
        },
      });
    };
    $scope.logOut = logOut;
  },
]);
