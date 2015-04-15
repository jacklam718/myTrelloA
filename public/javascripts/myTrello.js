MyTrello = Trello;

MyTrello.login = function(opts) {
  if (opts === undefined) {
    var opts = {type: "direct", scope: {read: true, write: true}}
  }

  this.authorize(opts);
}

MyTrello.logout = function() {
  this.deauthorize();
};

MyTrello.boards = function(userId) {
  var path = "/members/" + userId + "/boards";

  return this.get(path, function(boards) {
    return boards;
  })
};

MyTrello.boardLists = function(boardId) {
  path = "/boards/" + boardId + "/lists";

  return this.get(path, function(lists) {
    return lists;
  })
};

MyTrello.ListCards = function(listId) {
  path = "/lists/" + listId + "/cards";

  return this.get(path, function(cards) {
    return cards;
  })
};

MyTrello.markRead = function(cardId, boardId) {
  var path = "/cards/" + cardId + "/labels";

  this.post(path, {color: "blue", name: "Read", idBoard: boardId});
};

MyTrello.markUnread = function(cardId) {
  var path = "/cards/" + cardId + "/labels";
  var self = this;

  this.get(path, function(labels) {
    labels.forEach(function(label) {
      if (label.name === "Read") {
        path = "/labels/" + label.id + "/";
        self.delete(path, {id: label.id});
      }
    })
  })
};

MyTrello.postComment = function(cardId, comment) {
  var path = "/cards/" + cardId + "/actions/comments";

  this.post(path, {text: comment});
};

MyTrello.search = function(query) {
  var path = "/search";
}

MyTrello.login();
