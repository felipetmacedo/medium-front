myApp.controller("passwordRecoverController", ['$scope', "RecoveryService", "AlertMessage", "$state", function($scope, RecoveryService, AlertMessage, $state) {
    $scope.form = {
      email: '',
    };
  
    const isValid = () => {
      if (!$scope.form.email) {
          
          return false;
      }
  
      if ($scope.form.email.length < 3) {
          AlertMessage.error("O email deve conter no mínimo 3 caracteres!");
          return false;
      }
  
      return true;
    };
  
    $scope.submitForm = () => {
      if (!isValid()) {
          return;
      }
  
      RecoveryService.recovery($scope.form)
        .then(() => {
          $state.go('login');
          AlertMessage.success("Solicitação enviada com sucesso!")
        }).catch((e) => {
          console.log(e);
          AlertMessage.error("Erro ao enviar sua solicitação!")
        });
      
  };
  
  }]);