// account management : only email certified, and from the orange.com domain
Accounts.config({
  restrictCreationByEmailDomain: function(email) {
    var domain = email.slice(email.lastIndexOf("@")+1); // or regex
    var allowed = ["orange.com", "mobinil.com"];
    return _.contains(allowed, domain);
  },
  sendVerificationEmail: true, 
});

// called whenever a login is attempted
Accounts.validateLoginAttempt(function(attempt){
  if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
    console.log('email not verified');

    return false; // the login is aborted
  }
  return true;
}); 

// Actually send the verification email once the account is created
Accounts.onCreateUser(function(options, user) {
  user.profile = {};

  // we wait for Meteor to create the user before sending an email
  Meteor.setTimeout(function() {
    Accounts.sendVerificationEmail(user._id);
  }, 2 * 1000);

  return user;
});

// (server-side)
Meteor.startup(function() {

  // Setup the production environment variables
  process.env.ROOT_URL = 'http://yveschristol.me/';

  // Email settings for registration.
  Accounts.emailTemplates.from = 'yveschristol <noreply@yveschristol.me>';

  // The public name of the application.
  Accounts.emailTemplates.siteName = 'Libreboard';

  // The object line of the email.
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Libreboard : Confirm Your Email Address';
  };

  // The text content of the email.
  // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'Please click on the following link to verify your email address: ' + url;
  };

  // The smtp configuration.
  smtp = {
    username: 'noreply@yveschristol.me', 
    password: 'yfac6411', 
    server:   'mail.gandi.net',
    port: 25
  }
  
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

});
