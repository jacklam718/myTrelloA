'use strict';

var myTrello = angular.module("myTrello", [
  "ngRoute",
  "ngMaterial",
]);

function config($routeProvider, $locationProvider, $mdThemingProvider) {
  $routeProvider
    .when("/", {
      controller: "BoardsController",
      templateUrl: "templates/partials/boards.html"
    })
    .when("/boards", {
      controller: "BoardController",
      templateUrl: "templates/partials/boards-show.html"
      // templateUrl: "templates/partials/boards.html"
    })
    .when("/boards/:id", {
      controller: "BoardController",
      templateUrl: "templates/partials/boards-show.html"
    })

  $locationProvider.html5Mode(true).hashPrefix('!');

  $mdThemingProvider.theme('default')
    .accentPalette('orange');
}

// define constants
myTrello.constant("SERVICE_EVENTS", {
  boardsUpdated: "boards-updated",
  boardUpdated: "board-updated",
  boardListsUpdated: "board-lists-updated",
  listCardsUpdated: "list-cards-updated"
})

myTrello.config(config)
