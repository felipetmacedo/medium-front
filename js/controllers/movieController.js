myApp.controller('movieController',['$scope', 'MovieService', '$state', function($scope,MovieService, $state){

    const index = () => {
        MovieService.getCovers($scope.buscarFilmes)
            .then(resp => {
                // console.log(resp.data, 'funcinou!(supostamente)');
                $scope.covers = resp.data
            })
            .catch(() => {
                // console.log(resp.data, 'epaa');
            })
    }
    $scope.busca = index
    index()
}])