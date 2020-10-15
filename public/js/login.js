$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const usernameInput = $("input#username_input");
  const passwordInput = $("input#password_input");

  // When the form is submitted, we validate there's an username and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      $("#errormessage").show()
      return;
    }

    // If we have an username and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password) {
    $.post("/api/login", {
      username: username,
      password: password
    })
      .then((data) => {
        console.log(data);
        console.log("data")
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(err => {
        if (err){
          $("#errormessage").show()
        }
        console.log(err);
        console.log("error")
      });
  }
});
