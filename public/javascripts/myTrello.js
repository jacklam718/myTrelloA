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

MyTrello.boards = function(userId, func) {
  var path = "/members/" + userId + "/boards";

  this.get(path, function(boards) {
    func(boards);
  })
};

MyTrello.boardLists = function(boardId, func) {
  path = "/boards/" + boardId + "/lists";

  this.get(path, function(lists) {
    func(list);
  })
};

MyTrello.ListCards = function(listId, func) {
  path = "/lists/" + listId + "/cards";

  this.get(path, function(cards) {
    func(cards)
  })
};

MyTrello.search = function(query, func) {
  var path = "/search";
}

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


MyTrello.login();
