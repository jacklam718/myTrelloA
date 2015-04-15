'use strict';

var myTrello = angular.module("myTrello", [
  "ngRoute",
  "ngMaterial"
]);

function config($routeProvider, $mdThemingProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/templates/partials/boards.html",
      controller: "BoardsController"
    })
    .when("/boards/:id", {
      templateUrl: "partials/boards-show-page.html",
      controller: "BoardController"
    })

  // $mdThemingProvider.theme('default').default();
}

// define constants
myTrello.constant("SERVICE_EVENTS", {
  boardsUpdated: "boards-updated",
  boardUpdated: "board-updated"
})


myTrello.config(config)
