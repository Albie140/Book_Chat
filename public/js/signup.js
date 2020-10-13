$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const usernameInput = $("input#username_input");
  const passwordInput = $("input#password_input");
  const firstNameInput = $("input#first_name_input");
  const lastNameInput = $("input#last_name_input");

  // When the signup button is clicked, we validate the username and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      first_name: firstNameInput.val().trim(),
      last_name: lastNameInput.val().trim(),
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.first_name ||!userData.last_name ||!userData.username || !userData.password) {
      return;
    }
    // If we have a first name, last name, username and password, run the signUpUser function
    signUpUser(userData.first_name, userData.last_name, userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(first_name, last_name, username, password) {
    $.post("/api/signup", {
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
