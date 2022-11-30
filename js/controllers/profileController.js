myApp.controller("profileController", ['$rootScope', '$scope', "UserService", "$state", "$location", "$timeout", function ($rootScope, $scope, UserService, $state, $location, $timeout) {
    const id = $state.params.id;
    
    $scope.isAdminUser = !!$rootScope.isAdmin;
    $scope.showButtons = !$state.params.id;

    const init = () => {
        $scope.loading = true
        watched()
        profile()
    }

    
    const everyUser = () => {
        UserService.allUsers($scope.buscarUsers)
        .then(resp => {
            $scope.loading = false
            $scope.users = resp.data

        }).catch((e) => {
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

    const profile = () => {
        UserService.profile(id)
        .then(resp => {
            $timeout(() => {
                $scope.loading = false
            }, 500)
                $scope.user = resp.data
                
            })
            .catch((err) => {
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
        
        const watched = () => {
            UserService.watchedMovies(id)
            .then(resp => {
                $timeout(() => {
                    $scope.loading = false
                }, 500)
                $scope.watcheds = resp.data

            })
            .catch((err) => {
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
       
    const deleteUser = () => {
        $scope.loading = false
        Swal.fire({
            title: 'are you sure?',
            text: "you won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'grey',
            cancelButtonColor: 'black',
            confirmButtonText: 'delete',
        }).then((result) => {
            $scope.loading = false
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
        })
    }

    const refresh = user => {
        $scope.loading = false
        $location.path(`/profile/${user.id}`)
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

    const makeAdmin = () => {
        const newAdmin = { admin: true }
        UserService.makeAdmin(newAdmin, id)
            .then((resp) => {
                $scope.loading = false
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch(e => {
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
            $scope.loading = false
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
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'an error ocurred',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    })
            }
        })

    }

    $scope.makeAdmin = makeAdmin
    $scope.deleteOtherUser = deleteOtherUser
    $scope.logOut = logOut
    $scope.buscaUsers = everyUser
    $scope.deleteUser = deleteUser
    $scope.refresh = refresh;

    init()
}]);