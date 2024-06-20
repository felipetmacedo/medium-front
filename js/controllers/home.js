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
      if ($scope.loading || !page) {
        return;
      }

      $scope.loading = true;

      PostService.getPosts(page)
        .then((resp) => {
          if (page === 1) {
            $scope.posts = resp.data.data.posts; // Replace posts on page 1
          } else {
            $scope.posts = $scope.posts.concat(resp.data.data.posts); // Append posts on subsequent pages
          }
          $scope.numPages = resp.data.data.totalPages;
        })
        .catch((e) => {
          console.error(e);
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
        $scope.page < $scope.numPages + 1
      ) {
        // Load more posts when user scrolls near the bottom
        $scope.page++;
        list($scope.page);
      }
    };

    list($scope.page);

    angular.element($window).on("scroll", onScroll);

    $scope.$on("$destroy", () => {
      angular.element($window).off("scroll", onScroll);
    });

    $rootScope.$on("postCreated", () => {
      $scope.page = 1; // Reset to the first page
      list($scope.page); // Reload posts
    });

    $scope.busca = list;
    $scope.truncate = truncate;
  },
]);
