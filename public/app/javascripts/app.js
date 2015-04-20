$(document).ready(function() {
  MyTrello.login();

  var trelloAccounts = localStorage.getItem("trelloAccounts");
  var currentAccount = {};

  MyTrello.get("/members/me/", function(me) {
    if (trelloAccounts) {
      trelloAccounts = JSON.parse(trelloAccounts);
      currentAccount = trelloAccounts[me.id];
    } else {

      MyTrello.webHook("webhooks for me", "http://my-trello.herokuapp.com/trelloCallback", me.id, function(response) {
        currentAccount[me.id] = {
          userId: me.id,
          token: MyTrello.token(),
          webHookId: response.id,
          hasWebhooke: true
        }

        localStorage.setItem("trelloAccounts", JSON.stringify(currentAccount));
      })
    }
  })
})
