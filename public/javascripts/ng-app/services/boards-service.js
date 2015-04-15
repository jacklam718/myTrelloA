"use strict";

function BoardsService($rootScope, SERVICE_EVENTS) {
  var self = this;

  this.setBoards = function(boards) {
    self.boards = boards;
    $rootScope.$broadcast(SERVICE_EVENTS.boardsUpdated, boards);
  };

  this.getBoards = function() {
    return self.boards;
  };

  this.reload = function() {
    MyTrello.boards("me", function(boards) {
      self.setBoards(boards)
    })
  };
}

myTrello.service("BoardsService", BoardsService);
