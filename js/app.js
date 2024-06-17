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
      name: "all-movies",
      url: "/movies",
      templateUrl: "view/all-movies.html",
      controller: "movieController",
    })
    .state({
      name: "find-all-movies",
      url: "/movies/all",
      templateUrl: "view/find-all-movies.html",
      controller: "allCoversController",
    })
    .state({
      name: "show-movie",
      url: "/movies/:id",
      templateUrl: "view/show-movie.html",
      controller: "showMovieController",
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
    });
});

const isAuthorized = ($state, $rootScope) => {
  const isLogged = localStorage.getItem("token");

  if (!isLogged) {
    $state.go("all-movies");
    return;
  }

  $rootScope.isLogged = true;
};
