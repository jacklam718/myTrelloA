'use strict';

function BoardsController($scope, $rootScope, SERVICE_EVENTS) {

  $scope.getBoardUrl = function(board) {
    return "/boards/" + board.id
  }

  $scope.reload = function() {
    function _setBoards() {
      MyTrello.boards("me", function(boards ) {
        $scope.$apply(function() {
          $scope.boards = boards;
        })
      })
    }

    _setBoards();
  }

  $scope.reload();
}

myTrello.controller("BoardsController", BoardsController);
