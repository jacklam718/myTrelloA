"use strict";
console.log("board");
function BoardController($scope, $rootScope, BoardService, SERVICE_EVENTS) {

  $scope.init = function() {
    console.log("init");
  }

  $scope.setBoard = function(event, board) {
    $scope.board = board;
    $scope.$apply();
  };

  $scope.getBoard = function() {
    return BoardService.getBoard();
  }

  $scope.setBoardLists = function(event, boardLists) {
    $scope.boardLists = boardLists;
    $scope.$apply();
  }

  $scope.getBoardLists = function() {
    return BoardService.getBoardLists();
  }

  $rootScope.$on(SERVICE_EVENTS.boardUpdated, $scope.setBoard);
  $rootScope.$on(SERVICE_EVENTS.boardListsUpdated, $scope.setBoardLists);
  console.log("ssss");
  BoardService.reload();
}

myTrello.controller("BoardController", BoardController);
