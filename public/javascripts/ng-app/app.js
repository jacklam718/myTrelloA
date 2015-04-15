'use strict';

var myTrello = angular.module("myTrello", [
  "ngRoute",
  "ngMaterial",
]);

myTrello.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default').dark();
});

myTrello.config(["$routeProvider",
  function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/templates/partials/boards.html",
        controller: "BoardsController"
      })
      .when("/boards/:id", {
        templateUrl: "partials/board.html",
        controller: "BoardController"
      })
  }
]);
