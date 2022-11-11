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
    show()
}])