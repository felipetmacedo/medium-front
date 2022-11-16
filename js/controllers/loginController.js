myApp.controller('loginController',['$scope', 'LoginService', '$state', function($scope,LoginService, $state){
    $scope.user = {
        email: '',
        password:''
    }
    const login = () => {
        LoginService.getToken($scope.user)
            .then(resp => {
                localStorage.setItem("token", resp.data.token);
                localStorage.setItem("email", $scope.user.email);
                $scope.user.email='';
                $scope.user.password='';

                $state.go('all-movies') //só depois
            })
            .catch((err) => {
                console.log(err)
                localStorage.clear()
                $scope.user.password = ''

            })
    }
    $scope.login = login
}])