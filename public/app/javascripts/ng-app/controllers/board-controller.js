"use strict";

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

  $scope.setListCards = function(event, listCards) {
    $scope.listCards = listCards
    $scope.$apply();
  }

  $scope.requestListCardsByListId = function(listId) {
    BoardService.requestListCardsByListId(listId);
  }

  $rootScope.$on(SERVICE_EVENTS.boardUpdated, $scope.setBoard);
  $rootScope.$on(SERVICE_EVENTS.boardListsUpdated, $scope.setBoardLists);
  $rootScope.$on(SERVICE_EVENTS.listCardsUpdated, $scope.setListCards);

  console.log("ssss");
  BoardService.reload();
}

myTrello.controller("BoardController", BoardController);
