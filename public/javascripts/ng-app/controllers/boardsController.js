'use strict';

myTrello.controller("BoardsController", function($scope, $rootScope, BoardsService, SERVICE_EVENTS) {

  $scope.setBoards = function(event, boards) {
    $scope.boards = boards;
    console.log(boards);
  }

  BoardsService.reload();

  $rootScope.$on(SERVICE_EVENTS.boardsUpdated, $scope.setBoards);
});
