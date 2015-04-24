"use strict";

function CommentReplyDialogController($scope, $mdDialog, $cookieStore) {
  $scope.comment = "";

  $scope.cancel = function() {
    $mdDialog.cancel();
  }

  $scope.send = function() {
    console.warn($scope.comment);
    if ($scope.comment !== "") {
      var itemData = $cookieStore.get("selectedItemData");
      MyTrello.replyComment(itemData.data.card.id, $scope.comment, itemData.memberCreator.username);
      $mdDialog.hide();
    }
  }
}

myTrello.controller("CommentReplyDialogController", CommentReplyDialogController);
