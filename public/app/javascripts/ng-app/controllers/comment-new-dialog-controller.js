"use strict";

function CommentNewDialogController($scope, $mdDialog, $cookieStore) {
  $scope.comment = "";

  $scope.cancel = function() {
    $mdDialog.cancel();
  }

  $scope.send = function() {
    if ($scope.comment != "") {
      var card = $cookieStore.get("selectedCard");
      MyTrello.postComment(card.id, $scope.comment);
      $mdDialog.hide();
    }
  }
}

myTrello.controller("CommentNewDialogController", CommentNewDialogController);
