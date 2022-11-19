myApp.controller("profileController", ['$rootScope','$scope', "UserService", "$state", "$location", function ($rootScope,$scope, UserService, $state, $location) {
    const id = $state.params.id;

    $scope.isAdminUser = !!$rootScope.isAdmin;
    $scope.showButtons = !$state.params.id;

    const init = () => {
        watched()
        profile()
    }

    const everyUser = () => {
        UserService.allUsers($scope.buscarUsers)
            .then(resp => {
                $scope.users = resp.data
                console.log($scope.users);
            }).catch((e) => {
                console.log(e);
            })
    }

    const profile = () => {
        UserService.profile(id)
            .then(resp => {
                $scope.user = resp.data
                console.log(resp);

            })
            .catch((err) => {
                console.log(err);
            })
    }

    const watched = () => {
        UserService.watchedMovies(id)
            .then(resp => {
                $scope.watcheds = resp.data
            })
            .catch((err) => {
                console.log(err);
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

    const refresh = user => {
        $location.path(`/profile/${user.id}`)
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

    const deleteOtherUser = () => {
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
                return UserService.deleteOtherUser(id)
                    .then(() => {
                        $state.go('profile')
                        Swal.fire(
                            'Deleted!',
                            'Your user has been deleted.',
                            'success'
                        )
                    }).catch((e) => {
                        console.log(e);
                    })
            }
        })

    }

    // $scope.everyUser = everyUser
    $scope.deleteOtherUser = deleteOtherUser
    $scope.logOut = logOut
    $scope.buscaUsers = everyUser
    $scope.deleteUser = deleteUser
    $scope.refresh = refresh;

    init()
}]);