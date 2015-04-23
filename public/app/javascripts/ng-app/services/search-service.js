"use strict";

function SearchService($rootScope, SERVICE_EVENTS) {
  var self = this;

  this.setResults = function(results) {
    $rootScope.$broadcast(SERVICE_EVENTS.searchResultsUpdated, results);
  }

  this.search = function(query) {
    MyTrello.search(query, function(results) {
      self.setResults(results)
    })
  }
}

myTrello.service("SearchService", SearchService);
