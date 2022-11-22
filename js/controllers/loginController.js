myApp.controller('loginController', ['$scope', 'LoginService', '$state', function ($scope, LoginService, $state) {
    $scope.user = {
        email: '',
        password: ''
    }
    const login = () => {
        LoginService.getToken($scope.user)
            .then(resp => {
                localStorage.setItem("token", resp.data.token);
                localStorage.setItem("email", $scope.user.email);

                if (resp.data.admin) {
                    localStorage.setItem("is_admin", true);
                }

                $scope.user.email = '';
                $scope.user.password = '';

                $state.go('all-movies') //só depois
            })
            .catch((err) => {
                const confirmation = Swal.fire({
                    title: 'Algo deu errado',
                    text: err.data && err.data.error === 'Usuario bloqueado' ? err.data.error : "Verifique as suas informações!",
                    icon: 'error',
                    confirmButtonColor: '#04052e',
                });
                if (!confirmation.isConfirmed) {
                    return;
                }
                localStorage.clear()
                $scope.user.password = ''

            })
    }
    $scope.login = login
}])