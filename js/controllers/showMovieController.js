myApp.controller('showMovieController', ['$rootScope','$scope', 'MovieService', '$state', function ( $rootScope ,$scope, MovieService, $state) {
  const id = $state.params.id;
  $scope.watched = false

  $scope.isAdminUser = !!$rootScope.isAdmin;

  const init = () => {
    checkWatched()
    show()
  }

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
    Swal.fire({
      title: 'rating',
      icon: 'question',
      input: 'range',
      inputAttributes: {
        min: 0,
        max: 5,
        step: 1
      },
      inputValue: 5
    }).then(resp => {
      if (!resp.isConfirmed) {
        return;
      }
      MovieService.addWatched({
        movie_id: id,
        rating: ~~resp.value
      }).then((resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'your movie has been added',
          showConfirmButton: false,
          timer: 500
        })
        $state.go('all-movies')
        console.log(id);

      }).catch((err) => {
        console.log(err);
      })
    })
  }

  const removeWatched = () => {
    Swal.fire({
      title: 'delete watched?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'yes'
    }).then((result) => {
      if (result.isConfirmed) {
        MovieService.removeWatched(id)
          .then(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'your movie has been deleted',
              showConfirmButton: false,
              timer: 1000
            })
            $state.go('profile')
            console.log(id);
          }).catch((err) => {
            console.log(err);
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

  const checkWatched = () => {
    MovieService.checkWatched(id)
      .then((resp) => {
        if (resp.data) {
          $scope.watched = true
          return
        }

      })
      .catch((err) => {
        console.log(err);
      })
  }

  const updateWatched = () => {
    Swal.fire({
      title: 'rating',
      icon: 'question',
      input: 'range',
      inputAttributes: {
        min: 0,
        max: 5,
        step: 1
      },
      inputValue: 5
    }).then(resp => {
      if (!resp.isConfirmed) {
        return;
      }
      const data = {
        rating:  ~~resp.value
      }
      MovieService.updateWatched(
        ~~id,
        data
      )
      .then((resp) => {
        console.log('oi aqui');
      })
      .catch((err) => {
          console.log(id);
          console.log(err);
        })
    })
  }

  $scope.updateWatched = updateWatched
  $scope.removeWatched = removeWatched
  $scope.addWatched = addWatched
  $scope.logOut = logOut
  init()
}])