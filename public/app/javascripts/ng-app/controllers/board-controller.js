// "use strict";

function BoardController($scope, $rootScope, BoardService, SERVICE_EVENTS) {

  $scope.setBoard = function(event, board) {
    $scope.$apply(function() {
      $scope.board = board;
    });
  };

  $scope.getBoard = function() {
    return BoardService.getBoard();
  }

  $scope.setBoardLists = function(event, boardLists) {
    $scope.$apply(function() {
      $scope.boardLists = boardLists;
    });
  }

  $scope.getBoardLists = function() {
    return BoardService.getBoardLists();
  }

  $scope.setListCards = function(event, listCards) {
    card = listCards[0]
    $scope.$apply(function() {
      $scope.listCards = listCards
    });
  }

  $scope.getListCards = function() {
    return BoardService.getListCards();
  }

  $scope.requestListCardsByListId = function(listId) {
    BoardService.requestListCardsByListId(listId);
  }

  $rootScope.$on(SERVICE_EVENTS.boardUpdated, $scope.setBoard);
  $rootScope.$on(SERVICE_EVENTS.boardListsUpdated, $scope.setBoardLists);
  $rootScope.$on(SERVICE_EVENTS.listCardsUpdated, $scope.setListCards);

  BoardService.reload();
}

myTrello.controller("BoardController", BoardController);
