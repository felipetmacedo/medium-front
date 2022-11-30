myApp.controller('allCoversController', ['$rootScope', '$scope', 'MovieService', '$state', '$location', function ($rootScope, $scope, MovieService, $state, $location) {

  $scope.isAdminUser = !!$rootScope.isAdmin;

  const allCovers = () => {
    MovieService.findAllCovers()
      .then(resp => {
        $scope.loading = false
        console.log(resp);
        $scope.covers = resp.data
      })
      .catch((e) => {
        $scope.loading =  false
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'an error ocurred',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

  const logOut = () => {
    $scope.loading = false
    Swal.fire({
      title: 'log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'yes'
    }).then((result) => {
      $scope.loading = false
      if (result.isConfirmed) {
        $state.go('login')
        localStorage.clear()
      }
    })
  }

  const refresh = cover => {
    $scope.loading = false
    $location.path(`/movies/${cover.movie.id}`)
  }

  const init = () => {
    $scope.loading = true
    if(!$scope.isAdminUser){
      Swal.fire({
          position: 'center',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
      })
      $state.go('all-movies')
      return
  }
  allCovers()
  }

  $scope.refresh = refresh
  $scope.logOut = logOut
  init()

}])