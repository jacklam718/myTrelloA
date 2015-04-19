"use strict";

function searchDirective($route) {
  var _originTemplateUrl = "";
  var _originController = "";

  var _searchTemplateUrl = "templates/partials/search.html";
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
    link: function (scope, element, attrs) {
      var isSerarchTemplate = false;

      scope.$watch(attrs.ngModel, function (val) {
        if (val === "" && isSerarchTemplate === true) {
          isSerarchTemplate = false;
          changeToOrginTempAndCtrl();
        } else if (val !== "" && val !== undefined && isSerarchTemplate === false) {
          isSerarchTemplate = true;
          updateOriginTempAndCtrl();
          changeToSearchTempAndCtrl();
        }
      });
    }
  }
}

myTrello.directive("searchDirective", searchDirective);
