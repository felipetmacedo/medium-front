myApp.controller("newUserController", ['$scope', "UserService", "$state", function ($scope, UserService, $state) {
    console.log($scope.userData)

    $scope.userData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    $scope.err = false;

    const create = () => {
        console.log($scope.userData, 'fora');
        return UserService.create($scope.userData)
        .then(() => {
                console.log($scope.userData, 'then');
                $scope.err = false;
                $state.go('login');
            })
            .catch((e) => {
                console.log(e)
                console.log($scope.userData, 'catch');
                $scope.err = true;
                $scope.userData.username = '';
                $scope.userData.email = '';
                $scope.userData.password = '';
                $scope.userData.confirmPassword = '';
            })
    }

    $scope.create = create;
}]);