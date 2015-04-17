'use strict';

function BoardsController($scope, $rootScope, BoardsService, SERVICE_EVENTS) {

  $scope.getBoardUrl = function(board) {
    return "/boards/" + board.id;
  }

  $scope.setBoards = function(event, boards) {
    // imform angular the model data changed
    $scope.$apply(function() {
      $scope.boards = boards;
    });
  }

  $rootScope.$on(SERVICE_EVENTS.boardsUpdated, $scope.setBoards);
  BoardsService.reload();
}

myTrello.controller("BoardsController", BoardsController);
