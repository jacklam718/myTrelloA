$(document).ready(function() {
  MyTrello.login();

  var trelloAccounts = localStorage.getItem("trelloAccounts");
  var currentAccount = {};

  MyTrello.get("/members/me/", function(me) {
    if (trelloAccounts) {
      trelloAccounts = JSON.parse(trelloAccounts);
      currentAccount = trelloAccounts[me.id];
    } else {
      currentAccount[me.id] = {
        userId: me.id,
        token: MyTrello.token(),
        hasWebhookes: true
      }

      console.log(currentAccount);

      localStorage.setItem("trelloAccounts", JSON.stringify(currentAccount));
    }

    if (currentAccount.hasWebhookes !== true) {
      $.post("https://trello.com/1/tokens/" + MyTrello.token() + "/webhooks/?key=" + MyTrello.key(), {
        description: "Webhook for myTrello",
        callbackURL: "http://my-trello.herokuapp.com/trelloCallback",
        idModel: me.id
      })
    }

  })
})
