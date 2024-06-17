const myApp = angular.module("movies", ["ui.router", "ui.bootstrap"]);
const baseUrl = "http://localhost:3000/";

myApp.config(function ($stateProvider, $httpProvider) {
  $httpProvider.interceptors.push("BearerAuthInterceptor");

  $stateProvider
    .state({
      name: "login",
      url: "",
      templateUrl: "view/login.html",
      controller: "loginController",
    })
    .state({
      name: "cadastro",
      url: "/cadastro",
      templateUrl: "view/new-user.html",
      controller: "newUserController",
    })
    .state({
      name: "home",
      url: "/home",
      templateUrl: "view/home.html",
      controller: "homeController",
    })
    .state({
      name: "show-movie",
      url: "/movies/:id",
      templateUrl: "view/show-movie.html",
      controller: "showMovieController",
      onEnter: isAuthorized,
    })
    .state({
      name: "profile",
      url: "/profile",
      templateUrl: "view/profile.html",
      controller: "profileController",
      onEnter: isAuthorized,
    })
    .state({
      name: "search-user-profile",
      url: "/profile/:id",
      templateUrl: "view/profile.html",
      controller: "profileController",
      onEnter: isAuthorized,
    })
    .state({
      name: "update-user",
      url: "/profile/update",
      templateUrl: "view/update-user.html",
      controller: "updateUserController",
      onEnter: isAuthorized,
    })
    .state({
      name: "create-movie",
      url: "/movies/manage",
      templateUrl: "view/manage-movie.html",
      controller: "manageMovieController",
      onEnter: isAuthorized,
    })
    .state({
      name: "update-movie",
      url: "/movies/manage/:id",
      templateUrl: "view/manage-movie.html",
      controller: "manageMovieController",
      onEnter: isAuthorized,
    })
    .state({
      name: "every-user",
      url: "/profile/all",
      templateUrl: "view/every-user.html",
      controller: "everyUserController",
      onEnter: isAuthorized,
    })
    .state({
      name: "recover",
      url: "/password/recover",
      templateUrl: "view/password-recover.html",
      controller: "passwordRecoverController",
    })
    .state({
      name: "change-password",
      url: "/change-password",
      templateUrl: "view/change-password.html",
      controller: "changePasswordController",
    })
    .state({
      name: "all-user-movies",
      url: "/profile/movies",
      templateUrl: "view/all-user-movies.html",
      controller: "profileController",
    });
});

const isAuthorized = ($state, $rootScope) => {
  const isLogged = localStorage.getItem("token");

  if (!isLogged) {
    $state.go("home");
    return;
  }

  $rootScope.isLogged = true;
};
