myApp.controller("updateUserController", ['$scope', "UserService", "$state", function ($scope, UserService, $state) {

    $scope.email = localStorage.getItem('email')
    $scope.updateUserInfo = {}

    const updateUser = (data) => {
        return UserService.updateUser(data)
        .then(() => {
            $state.go('profile')
        })
        .catch((e) => {
            console.log(e);
        })
    }
    const showUser = () => {
        return UserService.profile()
        .then(resp => {
            $scope.updateUserInfo = resp.data
            $scope.updateUserInfo.email = $scope.email
            console.log($scope.updateUserInfo);
        })
    }

    $scope.updateUser = updateUser
    showUser()
}]);