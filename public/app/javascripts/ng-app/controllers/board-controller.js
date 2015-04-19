// "use strict";

function BoardController($scope, $routeParams, $mdBottomSheet, $routeParams, $cookieStore) {
  $scope.bottomSheet = {};

  $scope.bottomSheet.items = [
    {name: "Mark Done", icon: "done", action: MyTrello.markDone},
    {name: "Mark Read", icon: "check_circle", action: MyTrello.markRead}
  ]

  $scope.bottomSheet.listItemClick = function($index, $event) {
    var clickedItem = $scope.bottomSheet.items[$index];
    clickedItem.action.call(MyTrello, $cookieStore.get("currentBoardId"), $cookieStore.get("currentCardId"));
  }

  $scope.showListBottomSheet = function($event, cardId) {
    $cookieStore.put("currentCardId", cardId)
    $cookieStore.put("currentBoardId", $routeParams.id)

    $mdBottomSheet.show({
      templateUrl: "templates/partials/bottom-sheet-list.html",
      controller: "BoardController",
      targetEvent: $event
    })
  }

  $scope.requestListCardsByListId = function(listId) {
    MyTrello.listCards(listId, function(listCards) {
      $scope.$apply(function() {
        $scope.listCards = listCards;
      })
    })
  }

  $scope.reload = function() {
    function _setBoard() {
      MyTrello.board($routeParams.id, function(board) {
        $scope.$apply(function() {
          $scope.board = board;
        })
      })
    };

    function _setBoardLists() {
      MyTrello.boardLists($routeParams.id, function(boardLists) {
        $scope.$apply(function() {
          $scope.boardLists = boardLists;
        })
      })
    };

    _setBoard();
    _setBoardLists();
  }

  $scope.reload();
}

myTrello.controller("BoardController", BoardController);
