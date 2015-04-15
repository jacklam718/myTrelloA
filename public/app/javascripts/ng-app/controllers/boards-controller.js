'use strict';

function BoardsController($scope, $rootScope, BoardsService, SERVICE_EVENTS) {
  $scope.getBoardUrl = function(board) {
    return "/boards/" + board.id;
  }

  $scope.setBoards = function(event, boards) {
    $scope.boards = boards;

    // update the template immediately;
    $scope.$apply();
  }

  $rootScope.$on(SERVICE_EVENTS.boardsUpdated, $scope.setBoards);
  BoardsService.reload();
}

myTrello.controller("BoardsController", BoardsController);
