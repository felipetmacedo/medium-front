const myApp = angular.module("movies", ['ui.router']);
const baseUrl = 'http://localhost:3001/'

myApp.config(function($stateProvider, $httpProvider){
    $httpProvider.interceptors.push('BearerAuthInterceptor');

    $stateProvider
        .state({
            name:'login',
            url: '',
            templateUrl:'view/login.html',
            controller: 'loginController'
        })
        .state({
            name:'cadastro',
            url:'/cadastro',
            templateUrl: 'view/new-user.html',
            controller: 'newUserController'
        })
        .state({
            name: 'all-movies',
            url:'/movies',
            templateUrl: 'view/all-movies.html',
            controller: 'movieController',
            onEnter: isAuthorized
        })
        .state({
            name: 'show-movie',
            url:'/movies/:id',
            templateUrl: 'view/show-movie.html',
            controller: 'showMovieController',
            onEnter: isAuthorized
        })
        .state({
            name: 'profile',
            url:'/profile',
            templateUrl: 'view/profile.html',
            controller: 'profileController',
            onEnter: isAuthorized
        })
        .state({
            name: 'watched',
            url:'/profile/watched',
            templateUrl: 'view/watched-movies.html',
            controller: 'watchedMoviesController',
            onEnter: isAuthorized
        })
})

const isAuthorized = ($state, $rootScope) => {
    const isLogged = localStorage.getItem("token");
    
    if (!isLogged) {
      $state.go('login');
      return;
    }

    $rootScope.isLogged = true;
};