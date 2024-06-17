myApp.directive("uiNavbar", function () {
  return {
    templateUrl: "view/navbar.html",
    replace: true,
    restrict: "AE",
    controller: "navbarController",
    scope: {
      title: "@",
    },
  };
});
