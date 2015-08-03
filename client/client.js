Accounts.onEmailVerificationLink(function() {
  console.log("Trying to verify the mail address...");
  if (Accounts._verifyEmailToken) {
    console.log("Token = "+Accounts._verifyEmailToken);
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
      if (err != null) {
        console.log("Something went wrong : "+err.message);
      } else {
        console.log("Thank you! Your email address has been confirmed.")
      }
    });
  }
});

