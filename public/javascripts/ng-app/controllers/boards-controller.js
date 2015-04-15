'use strict';

function BoardsController($scope, $rootScope, BoardsService, SERVICE_EVENTS) {
  $scope.setBoards = function(event, boards) {
    $scope.boards = boards;
    console.log($scope.boards);
  }

  $rootScope.$on(SERVICE_EVENTS.boardsUpdated, $scope.setBoards);
  BoardsService.reload();
}

myTrello.controller("BoardsController", BoardsController);
