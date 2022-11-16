myApp.controller("newUserController", ['$scope', "UserService", "$state", function ($scope, UserService, $state) {

    $scope.userData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    $scope.err = false;

    const create = () => {
        return UserService.create($scope.userData)
            .then(() => {
                $scope.err = false;
                $state.go('login');
            })
            .catch((e) => {
                console.log(e)
                $scope.err = true;
                $scope.userData.username = '';
                $scope.userData.email = '';
                $scope.userData.password = '';
                $scope.userData.confirmPassword = '';
            })
    }

    $scope.create = create;
}]);