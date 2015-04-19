// "use strict";

function searchDirective($route) {
  var _originTemplateUrl = "";
  var _originController = "";

  var _searchTemplateUrl = "templates/partials/search-search.html";
  var _searchController = "SearchController";

  var updateOriginTempAndCtrl = function() {
    _originTemplateUrl = $route.current.templateUrl;
    _originController = $route.current.controller;
  }

  var changeToOrginTempAndCtrl = function() {
    $route.current.$$route.templateUrl = _originTemplateUrl;
    $route.current.$$route.controller =  _originController;
    $route.reload();
  }

  var changeToSearchTempAndCtrl = function() {
    $route.current.$$route.templateUrl = _searchTemplateUrl;
    $route.current.$$route.controller = _searchController;
    $route.reload();
  }

  return {
    restrict: "A",
    scope: {
      searchDirective: "="
    },

    link: function(scope, element, attrs) {
      s = scope;

      // set the initial value of the textbox
      element.val(scope.searchDirective);
      element.data('old-value', scope.searchDirective);

      // detect outside changes and update our input
      scope.$watch("searchDirective", function(val) {
        element.val(scope.searchDirective);
      });

      // on blur, update the value in scope
      element.bind("propertychange keyup paste", function(blurEvent) {
        if (element.val() === "") {
          changeToOrginTempAndCtrl();
        } else if (element.val() !== "" && scope.searchDirective === ""){
          updateOriginTempAndCtrl();
          changeToSearchTempAndCtrl();
        }

        if (element.data("old-value") != element.val()) {
          scope.$apply(function() {
            scope.searchDirective = element.val();
            element.data("old-value", element.val());
          })
        }
      })
    }
  }
}

myTrello.directive("searchDirective", searchDirective);
