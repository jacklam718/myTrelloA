function SearchController($scope, $rootScope, SERVICE_EVENTS) {
  $scope.searchText = "";
  $scope.results = [];
  $scope.lists = []

  $scope.keys = function(obj) {
    return keys(obj)[0];
  }

  $scope.requestListByListId = function(listId) {
    console.warn(listId);
    MyTrello.get("/lists/" + listId, function(list) {
      $scope.$apply(function() {
        $scope.listLname
      })
    })
  }

  $scope.setSearchResults = function(event, results) {
    $scope.lists = [];

    var cards = results.cards;
    cards.forEach(function(card) {
      var idList = card.idList;
      var hasListFound = false
      $scope.lists.forEach(function(list) {
        if (list[idList] !== undefined) {
          hasListFound = true
          list[idList].push(card)
        }
      })

      if (hasListFound === false) {
        var list = {};
        list[idList] = [card]
        $scope.lists.push(list)
      }

      $scope.$digest();
    })
  }

  $rootScope.$on(SERVICE_EVENTS.searchResultsUpdated, $scope.setSearchResults);
}

myTrello.controller("SearchController", SearchController)
