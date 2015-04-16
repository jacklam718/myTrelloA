"use strict";

function BoardService($rootScope, $routeParams, SERVICE_EVENTS) {
  var self = this;

  this.setBoard = function(board) {
    self.baord = board;

    $rootScope.$broadcast(SERVICE_EVENTS.boardUpdated, board);
  };

  this.getBoard = function() {
    return self.baord;
  };

  this.setBoardLists = function(boardLists) {
    self.boardLists = boardLists;

    $rootScope.$broadcast(SERVICE_EVENTS.boardListsUpdated, boardLists);
  };

  this.getBoardLists = function() {
    return self.boardLists;
  };

  this.reload = function() {
    MyTrello.board($routeParams.id, function(board) {
      self.setBoard(board);
    })

    MyTrello.boardLists($routeParams.id, function(boardLists) {
      self.setBoardLists(boardLists);
    });
  }
}

myTrello.service("BoardService", BoardService);
