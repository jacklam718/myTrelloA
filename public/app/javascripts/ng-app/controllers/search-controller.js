function SearchController($scope) {
  $scope.searchQuery = "";

  // fake data
  $scope.results = [
    {listName: "list1", name: "name1"},
    {listName: "list2", name: "name2"},
    {listName: "list3", name: "name3"},
    {listName: "list4", name: "name4"},
    {listName: "list5", name: "name5"},
    {listName: "list6", name: "name6"},
    {listName: "list7", name: "name7"},
    {listName: "list8", name: "name8"},
    {listName: "list9", name: "name9"},
    {listName: "list10",name: "name10"},
  ]


  $scope.searchCards = function() {
    if ($scope.searchQuery === "") {
      return;
    }

    var query = {query: {card_fields: {name: $scope.searchQuery}}};
    MyTrello.search(query, function(results) {
      console.log(results);
      $scope.$apply(function() {
        $scope.results = results;
      })
    })
  }
}

myTrello.controller("SearchController", SearchController)
