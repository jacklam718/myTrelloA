'use strict';

var myTrello = angular.module("myTrello", [
  "ngRoute",
  "ngMaterial",
  "ngCookies"
]);

function config($routeProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {
  $routeProvider
    .when("/", {
      controller: "BoardsController",
      templateUrl: "templates/partials/boards.html"
    })
    .when("/boards/:id", {
      controller: "BoardController",
      templateUrl: "templates/partials/boards-show.html"
    })

  $locationProvider.html5Mode(true).hashPrefix('!');

  $mdThemingProvider.theme('default')
    .accentPalette('orange');

  $mdIconProvider
    .icon("more_vert", "/vendor/bower_components/material-design-icons/navigation/svg/production/ic_more_vert_24px.svg")
    .icon("assignment_turned_in", "/vendor/bower_components/material-design-icons/action/svg/production/ic_assignment_turned_in_24px.svg")
    .icon("done", "/vendor/bower_components/material-design-icons/action/svg/production/ic_done_24px.svg")
    // .defaultIconSet('/vendor/bower_components/material-design-icons/action/svg/design/ic_accessibility_24px.svg', 24);
    // .iconSet('action', '/vendor/bower_components/material-design-icons/navigation/svg/design/ic_more_vert_24px.svg')

}

// define constants
myTrello.constant("SERVICE_EVENTS", {
  boardsUpdated: "boards-updated",
  boardUpdated: "board-updated",
  boardListsUpdated: "board-lists-updated",
  listCardsUpdated: "list-cards-updated"
})

myTrello.config(config)
