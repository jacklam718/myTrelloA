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
    .when("boards/:id", {
      templateUrl: "/templates/partials/boards-show.html",
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
