myApp.controller('manageMovieController', ['$rootScope','$scope', 'MovieService', '$state', function ($rootScope,$scope, MovieService, $state) {

    const id = $state.params.id;
    $scope.isAdminUser = !!$rootScope.isAdmin;
    


}])