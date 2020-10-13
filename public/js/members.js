$(document).ready(() => {

  const searchForm = $("form.search");
  const searchInput = $("input#search_input");

  searchForm.on("submit", event => {
    event.preventDefault();

    const searchTerm = searchInput.val().trim()

    if (!searchTerm) {
      return;
    }

    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm

    // Ajax Function

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
    });

    // This file just does a GET request to figure out which user is logged in
    // // and updates the HTML on the page
    // $.get("/api/user_data").then(data => {
    //   $(".member-name").text(data.username);
    // });
  });
});
