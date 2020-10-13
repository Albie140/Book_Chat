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
      renderSearch(response);
    });

  });
  
  function renderSearch(data) {
    
    console.log("rendering search")
    
    $("#bookResults").empty()
    
    let rawHTML = "";
    
    for (let i = 0; i < 8; i++) {
      rawHTML += `<div><img src="${data.items[i].volumeInfo.imageLinks ? data.items[i].volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x196?text=No+Image+Found'}" alt="book cover"><h4>${data.items[i].volumeInfo.title ? data.items[i].volumeInfo.title : "No Title"}</h4><p>by ${data.items[i].volumeInfo.authors ? data.items[i].volumeInfo.authors.join(", ") : "No Author"}</p><p>${data.items[i].searchInfo ? data.items[i].searchInfo.textSnippet : "no description available"}</p><button class="addBook btn btn-default" type="submit" data-selfLink="${data.items[i].selfLink}">Add Club</button></div>`;
      
      console.log(rawHTML);
    };
    
    console.log(rawHTML);
    
    $("#bookResults").html(rawHTML);
    
    console.log("done")
  }
  
  $(".addBook").on("click", event => {
    event.preventDefault();
    
    console.log(event.target)
    
    console.log($(event.target).attr("data-selfLink"));
    
    let bookURL = $(event.target).attr("data-selfLink");
    
    $.ajax({
      url: bookURL,
      method: "GET"
    }).then(function (response) {
      let google_id = response.id;
      let book_title = response.volumeInfo.title;
      let book_author = response.volumeInfo.authors ? response.volumeInfo.authors.join(", ") : "no author";
      let pg_count = response.volumeInfo.pageCount;
      if (response.volumeInfo.imageLinks) {
        let picture_url = response.volumeInfo.imageLinks.large ? response.volumeInfo.imageLinks.large : response.volumeInfo.imageLinks.thumbnail;
      } else {
        let picture_url = "https://via.placeholder.com/128x196?text=No+Image+Found"
      };
      
      
      
    });
  })
});

// This file just does a GET request to figure out which user is logged in
// // and updates the HTML on the page
// $.get("/api/user_data").then(data => {
//   $(".member-name").text(data.username);
// });