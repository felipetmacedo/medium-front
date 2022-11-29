myApp.controller("profileController", ['$rootScope', '$scope', "UserService", "$state", "$location", function ($rootScope, $scope, UserService, $state, $location) {
    const id = $state.params.id;
    let button = true

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

    const profile = () => {
        UserService.profile(id)
            .then(resp => {
                $scope.user = resp.data
                
            })
            .catch((err) => {
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
                $scope.watcheds = resp.data

            })
            .catch((err) => {
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

    const makeAdmin = () => {
        const newAdmin = { admin: true }
        UserService.makeAdmin(newAdmin, id)
            .then((resp) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch(e => {
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