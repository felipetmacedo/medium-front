myApp.controller('showMovieController', ['$scope', 'MovieService', '$state', function ($scope, MovieService, $state) {
  $scope.email = localStorage.getItem('email')
  const id = $state.params.id;

  const show = () => {
    MovieService.showCover(id)
      .then(resp => {
        $scope.cover = resp.data
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const addWatched = () => {
    MovieService.addWatched()
      .then((resp) => {
        $scope.user = resp.data
        console.log(id);
        console.log($scope.email);

      }).catch((err) => {
        console.log(err);
      })
  }

  const logOut = () => {
    Swal.fire({
      title: 'log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'yes'
    }).then((result) => {
      if (result.isConfirmed) {
        $state.go('login')
        localStorage.clear()
      }
    })
  }

  $scope.addWatched = addWatched
  $scope.logOut = logOut
  show()
}])