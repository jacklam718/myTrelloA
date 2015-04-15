myTrello.service("BoardsService", function($rootScope, SERVICE_EVENTS) {

  var self = this;

  this.setBoards = function(boards) {
    self.boards = boards;
    $rootScope.$broadcast(SERVICE_EVENTS.boardsUpdated, boards);
  };

  this.getBoards = function() {
    return self.boards;
  }

  this.reload = function() {
    var boards = MyTrello.boards("me");
    self.setBoards(boards);
  }
});
