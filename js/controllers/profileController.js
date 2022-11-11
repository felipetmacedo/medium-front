myApp.controller("profileController", ['$scope', "UserService", "$state", function ($scope, UserService, $state) {
    const init = () => {
        watched()
        profile()
    }

    const profile = () => {
        UserService.profile()
            .then(resp => {
                $scope.user = resp.data
                console.log($scope.user,'user!');
            })
            .catch((err) => {
                console.log(err, 'epaa');
            })
    }
    const watched = () => {
        UserService.watchedMovies()
            .then(resp => {
                $scope.watcheds = resp.data
                console.log($scope.watcheds,'watched!');
            })
            .catch((err) => {
                console.log(err, 'epaa');
            })
    }

    init()
}]);