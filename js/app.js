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
      name: "show-post",
      url: "/post/:id",
      templateUrl: "view/show-post.html",
      controller: "showPostController",
      onEnter: isAuthorized,
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
