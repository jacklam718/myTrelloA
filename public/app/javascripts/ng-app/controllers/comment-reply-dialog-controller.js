"use strict";

function CommentReplyDialogController($scope, $mdDialog, $cookieStore) {
  $scope.cancel = function() {
    $mdDialog.cancel();
  }

  $scope.reply = function() {

  }
}

myTrello.controller("CommentReplyDialogController", CommentReplyDialogController);
