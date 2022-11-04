myApp.controller('loginController',['$scope', 'LoginService', '$state', function($scope,LoginService, $state){
    $scope.user = {
        email: '',
        password:''
    }
    const login = () => {
        console.log($scope.user)
        LoginService.getToken($scope.user)
            .then(resp => {
                localStorage.setItem("token", resp.data.token);
                localStorage.setItem("email", $scope.user.email);
                $scope.user.email='';
                $scope.user.password='';
                console.log(resp.data.token);

                // $state.go('homePage') //só depois
            })
            .catch(() => {
                localStorage.clear()
                $scope.user.password = ''
                console.log('oi');

            })
    }
    $scope.login = login
}])