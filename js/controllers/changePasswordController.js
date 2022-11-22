myApp.controller("changePasswordController", ['$scope', "RecoveryService", "AlertMessage", "$state", "$location",  function($scope, RecoveryService, AlertMessage, $state, $location) {
    $scope.form = {
      password: '',
      confirm_password: '',
    };

    const token = $location.search().token
  
    $scope.isTokenValid = false;
  
    const init = () => {
      RecoveryService.validateToken(token)
        .then(() => {
          $scope.isTokenValid = true;
        }).catch((e) => {
          AlertMessage.error("TOKEN EXPIRADO!")
          $state.go('login');
        });
    };
  
    const isValid = () => {
      if (!$scope.form.password) {
        AlertMessage.error("Insira a senha!")
        return false;
      }
  
      if (!$scope.form.confirm_password) {
        AlertMessage.error("Insira a confirmação da senha!")
        return false;
      }
  
      if ($scope.form.password !== $scope.form.confirm_password) {
        AlertMessage.error("As senhas não conferem!")
        return false;
      }
  
      return true;
    };
  
    $scope.submitNewPassword = () => {
      if (!isValid()) {
          return;
      }
  
      RecoveryService.changePassword(token, $scope.form)
        .then(() => {
          AlertMessage.success("Acesso redefinido com sucesso!")
          $state.go("login");
        }).catch(() => {
          AlertMessage.error("Erro ao redefinir acesso!")
        });
  
    };
  
    init();
    
  }]);