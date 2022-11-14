myApp.controller("profileController", ['$scope', "UserService", "$state", function ($scope, UserService, $state) {
    const init = () => {
        watched()
        profile()
    }

    const everyUser = () => {
        UserService.allUsers($scope.buscarUsers)
        .then(resp => {
                $scope.users = resp.data
                console.log($scope.users, 'users');
            }).catch((e) => {
                console.log(e);
            })
    }

    const profile = () => {
        UserService.profile()
            .then(resp => {
                $scope.user = resp.data
                console.log($scope.user, 'user!');
            })
            .catch((err) => {
                console.log(err, 'epaa');
            })
    }

    const watched = () => {
        UserService.watchedMovies()
            .then(resp => {
                $scope.watcheds = resp.data
                console.log($scope.watcheds, 'watched!');
            })
            .catch((err) => {
                console.log(err, 'epaa');
            })
    }

    const deleteUser = () => {
        Swal.fire({
            title: 'are you sure?',
            text: "you won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'grey',
            cancelButtonColor: 'black',
            confirmButtonText: 'delete',
        }).then((result) => {
            if (result.isConfirmed) {
                return UserService.deleteUser()
                    .then(() => {
                        localStorage.clear()
                        $state.go('login')
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }).catch((e) => {
                        console.log(e);
                    })
            }
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
    $scope.buscaUsers = everyUser
    $scope.deleteUser = deleteUser
    init()
}]);