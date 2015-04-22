// "use strict";

function BoardController($scope, $routeParams, $mdBottomSheet, $routeParams, $cookieStore) {
  $scope.bottomSheet = {};
  $scope.displayCardsOrComments = false
  $scope.cardsComments = []

  $scope.bottomSheet.items = [
    {name: "Reply", icon: "reply", action: MyTrello.markDone},
    {name: "Edit", icon: "edit", action: MyTrello.markDone},
    {name: "Mark Read", icon: "check_circle", action: MyTrello.markCommentAsRead}

  ]

  $scope.bottomSheet.listItemClick = function($index, $event) {
    var clickedItem = $scope.bottomSheet.items[$index];
    itemData = $cookieStore.get("selectedItemData")
    console.log(itemData);

    switch ($index) {
      case 0:
        console.log();
        break
      case 1:
        console.log();
        break
      case 2:
        clickedItem.action.call(MyTrello, itemData.data.card.id, itemData.data.text, itemData.memberCreator.username);
        break
    }

  }

  $scope.showListBottomSheet = function($event, itemData) {
    console.log(itemData);
    $cookieStore.put("selectedItemData", itemData)

    $mdBottomSheet.show({
      templateUrl: "templates/partials/bottom-sheet-list.html",
      controller: "BoardController",
      targetEvent: $event
    })
  }

  $scope.switchToCardsOrComments = function() {
    if ($scope.displayCardsOrComments === true) {
      $scope.cardsComments = [];
      $scope.displayCardsOrComments = false
      $scope.requestCardsComments()
    } else {
      $scope.displayCardsOrComments = true
    }
  }

  $scope.requestCardsComments = function() {
    $scope.listCards.forEach(function(card) {
      MyTrello.cardComments(card.id, function(cardComments) {
        $scope.$apply(function() {
          cardComments.length > 0 && $scope.cardsComments.push(cardComments);
        })
      })
    })
  }

  $scope.requestListCardsByListId = function(listId) {
    MyTrello.listCards(listId, function(listCards) {
      $scope.$apply(function() {
        $scope.listCards = listCards;
        if ($scope.displayCardsOrComments !== true) {
          $scope.cardsComments = []
          listCards.forEach(function(card) {
            MyTrello.cardComments(card.id, function(cardComments) {
              cardComments.length > 0 && $scope.cardsComments.push(cardComments)
              console.log(cardComments);
              $scope.$digest()
            })
          })
        }
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
          console.log("boardLists > ", boardLists);
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
