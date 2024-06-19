myApp.controller("homeController", [
  "$rootScope",
  "$scope",
  "PostService",
  "$window",
  function ($rootScope, $scope, PostService, $window) {
    $scope.isUserLoggedIn = $rootScope.userLogged;
    $scope.loading = false;
    $scope.page = 1;
    $scope.posts = [];

    const list = (page) => {
      if ($scope.loading) {
        return;
      }

      $scope.loading = true;

      PostService.getPosts(page)
        .then((resp) => {
          $scope.posts = $scope.posts.concat(resp.data.data.posts);
          $scope.numPages = resp.data.data.totalPages;
        })
        .catch((e) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "An error occurred",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .finally(() => {
          $scope.loading = false;
          $scope.$applyAsync(); // Apply changes to the scope
        });
    };

    const truncate = (text, length) => {
      return text.length > length ? text.substring(0, length) + "..." : text;
    };

    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const clientHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const isOnPageScrollEnd = scrollTop + clientHeight >= scrollHeight - 100;

      if (
        isOnPageScrollEnd &&
        !$scope.loading &&
        $scope.page <= $scope.numPages
      ) {
        // Load more posts when user scrolls near the bottom
        $scope.page++;
        list($scope.page);
      }
    };

    // Initial load
    list($scope.page);

    // Attach scroll event listener
    angular.element($window).on("scroll", onScroll);

    // Cleanup event listener when scope is destroyed
    $scope.$on("$destroy", () => {
      angular.element($window).off("scroll", onScroll);
    });

    $scope.busca = list;
    $scope.truncate = truncate;
  },
]);
