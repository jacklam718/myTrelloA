// "use strict";

function BoardController($scope, $routeParams, $mdBottomSheet, $routeParams, $cookieStore, $mdDialog) {
  $scope.displayCardsOrComments = true
  $scope.cardsComments = []

  $scope.showCommentDialog = function($event, card) {
    $cookieStore.put("selectedCard", card);
    $mdDialog.show({
      controller: "CommentNewDialogController",
      templateUrl: "templates/partials/comment-new-dialog.html",
      targetEvent: $event
    })
  }

  $scope.showListBottomSheet = function($event, itemData) {
    $cookieStore.put("selectedItemData", itemData)
    $mdBottomSheet.show({
      controller: "CommentBottonSheetsListController",
      templateUrl: "templates/partials/bottom-sheet-list.html",
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
