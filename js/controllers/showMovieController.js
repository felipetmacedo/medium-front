myApp.controller('showMovieController',['$scope', 'MovieService', '$state', function($scope,MovieService, $state){
    const id = $state.params.id;

    const show = () => {
        MovieService.showCover(id)
            .then(resp => {
                console.log(id);
                $scope.cover = resp.data
                console.log($scope.cover,'cover!');
            })
            .catch((err) => {
                console.log(err, 'epaa');
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


    $scope.logOut = logOut
    show()
}])