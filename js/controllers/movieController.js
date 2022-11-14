myApp.controller('movieController', ['$scope', 'MovieService', '$state', function ($scope, MovieService, $state) {

    const index = () => {
        MovieService.getCovers($scope.buscarFilmes)
            .then(resp => {
                $scope.covers = resp.data
            })
            .catch((e) => {
                console.log(e);
            })

    }

    const logOut = () => {
        $state.go('login')
        localStorage.clear()
    }

    $scope.logOut = logOut
    $scope.busca = index
    index()
}])