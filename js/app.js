const myApp = angular.module("movies", ['ui.router']);
const baseUrl = 'http://localhost:3001/'

myApp.config(function($stateProvider){
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
            controller: 'movieController.js'
        })
})