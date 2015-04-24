"use strict";

function CommentBottonSheetsListController($scope, $cookieStore, $mdDialog) {
  $scope.items = [
    {name: "Reply", icon: "reply", action: MyTrello.replyComment},
    // {name: "Edit", icon: "edit", action: MyTrello.editComment},
    {name: "Mark Read", icon: "check_circle", action: MyTrello.markCommentAsRead}
  ]

  $scope.showReplyCommentDialog = function($event) {
    $mdDialog.show({
      controller: "CommentReplyDialogController",
      templateUrl: "templates/partials/comment-reply-dialog.html",
      targetEvent: $event
    })
  }

  $scope.listItemClick = function($index, $event) {
    console.warn($event);
    var clickedItem = $scope.items[$index];
    var itemData = $cookieStore.get("selectedItemData")
    switch ($index) {
      case 0:
        $scope.showReplyCommentDialog($event)
        break
      case 1:
        clickedItem.action.call(MyTrello, itemData.data.card.id, itemData.data.text, itemData.memberCreator.username);
        break
    }
  }
}

myTrello.controller("CommentBottonSheetsListController", CommentBottonSheetsListController)
