const myApp = angular.module("movies", ['ui.router', 'ui.bootstrap']);
const baseUrl = 'http://localhost:3001/'

myApp.config(function ($stateProvider, $httpProvider) {
    $httpProvider.interceptors.push('BearerAuthInterceptor');

    $stateProvider
        .state({
            name: 'login',
            url: '',
            templateUrl: 'view/login.html',
            controller: 'loginController'
        })
        .state({
            name: 'cadastro',
            url: '/cadastro',
            templateUrl: 'view/new-user.html',
            controller: 'newUserController'
        })
        .state({
            name: 'all-movies',
            url: '/movies',
            templateUrl: 'view/all-movies.html',
            controller: 'movieController',
            onEnter: isAuthorized
        })
        .state({
            name: 'show-movie',
            url: '/movies/:id',
            templateUrl: 'view/show-movie.html',
            controller: 'showMovieController',
            onEnter: isAuthorized
        })
        .state({
            name: 'profile',
            url: '/profile',
            templateUrl: 'view/profile.html',
            controller: 'profileController',
            onEnter: isAuthorized
        })
        .state({
            name: 'search-user-profile',
            url: '/profile/:id',
            templateUrl: 'view/profile.html',
            controller: 'profileController',
            onEnter: isAuthorized
        })
        .state({
            name: 'update-user',
            url: '/profile/update',
            templateUrl: 'view/update-user.html',
            controller: 'updateUserController',
            onEnter: isAuthorized
        })
        .state({
            name: 'create-movie',
            url: '/movies/manage',
            templateUrl: 'view/manage-movie.html',
            controller: 'manageMovieController',
            onEnter: isAuthorized
        })
        .state({
            name: 'update-movie',
            url: '/movies/manage/:id',
            templateUrl: 'view/manage-movie.html',
            controller: 'manageMovieController',
            onEnter: isAuthorized
        })
})

const isAuthorized = ($state, $rootScope) => {
    const isLogged = localStorage.getItem("token");

    $rootScope.isAdmin = localStorage.getItem("is_admin");

    if (!isLogged) {
        $state.go('login');
        return;
    }

    $rootScope.isLogged = true;
};