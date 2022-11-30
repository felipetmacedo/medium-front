myApp.controller('movieController', ['$rootScope','$scope', 'MovieService', '$state', function ($rootScope,$scope, MovieService, $state) {

  $scope.isAdminUser = !!$rootScope.isAdmin;

  const init = () => {
    $scope.loading = true
  }

  const everyUser = () => {
    UserService.allUsers($scope.buscarUsers)
        .then(resp => {
          $scope.loading = false
            $scope.users = resp.data
        }).catch((e) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'an error ocurred',
            showConfirmButton: false,
            timer: 1500
          })
          $scope.loading = false
        })
}

  const index = () => {
    MovieService.getCovers($scope.buscarFilmes)
      .then(resp => {
        $scope.loading = false
        $scope.covers = resp.data
      })
      .catch((e) => {
        $scope.loading = false
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
  
  $scope.buscaUsers = everyUser
  $scope.logOut = logOut
  $scope.busca = index
  index()
  init()
}])