"use strict";

function listNameDirective() {
  return {
    restrict: "A",
    replace: true,
    scope: {
      listNameDirective: "="
    },
    link: function (scope, element, attrs) {
      MyTrello.get("/lists/" + Object.keys(scope.listNameDirective)[0], function(list) {
        var html = "<h2 layout-padding class='md-title'>" + list.name + "</h2>"
        element.html(html);
      })
    }
  }

}

myTrello.directive("listNameDirective", listNameDirective);
