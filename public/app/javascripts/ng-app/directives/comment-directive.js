// "use strict";

function commentDirective() {
  return {
    restrict: "A",
    // replace: true,
    scope: {
      commentDirective: "="
    },
    link: function (scope, element, attrs) {
      MyTrello.get("/cards/" + scope.commentDirective.id + "/actions", function(result) {
        var html = "";
        result.forEach(function(item) {
          console.log("item>", item);
          html += "<p class='layout-padding'>" + item.data.text + "</p>"
        })
        element.html(html)
      })
    }
  }

}

myTrello.directive("commentDirective", commentDirective);
