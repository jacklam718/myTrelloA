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

MyTrello.board = function(boardId, func) {
  var path = "/boards/" + boardId;

  this.get(path, function(boad) {
    func(boad);
  })
}

MyTrello.boardLists = function(boardId, func) {
  path = "/boards/" + boardId + "/lists";

  this.get(path, function(lists) {
    func(lists);
  })
};

MyTrello.listCards = function(listId, func) {
  path = "/lists/" + listId + "/cards";

  this.get(path, function(cards) {
    func(cards)
  })
};

MyTrello.search = function(query, func) {
  var path = "/search/"

  this.get(path, query, function(results) {
    func(results);
  })
}

MyTrello.markRead = function(boardId, cardId) {
  console.log(boardId, cardId);
  var path = "/cards/" + cardId + "/labels";

  this.post(path, {color: "blue", name: "Read", idBoard: boardId});
};

MyTrello.markDone = function(boardId, cardId) {
  var path = "/cards/" + cardId + "/labels";

  this.post(path, {color: "green", name: "Done", idBoard: boardId});
}

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

MyTrello.cardComments = function(cardId, func) {
  var path = "/cards/" + cardId + "/actions";

  this.get(path, function(cardComments) {
    func(cardComments);
  })
}

MyTrello.postComment = function(cardId, comment) {
  var path = "/cards/" + cardId + "/actions/comments";

  this.post(path, {text: comment});
};

MyTrello.webHook = function(desc, callbackURL, idModel, func) {
  var path = "/webhooks/";

  this.post(path, {description: desc, callbackURL: callbackURL, idModel: idModel}, func);
}
