Accounts.config({
  restrictCreationByEmailDomain: function(email) {
    var domain = email.slice(email.lastIndexOf("@")+1); // or regex
    var allowed = ["orange.com", "mobinil.com"];
    return _.contains(allowed, domain);
  },
});