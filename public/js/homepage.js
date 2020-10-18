$(document).ready(() => {
    // $( ".addBook" ).click(function() {
    //   $(this).text($(this).text() == 'bookmark_border' ? 'bookmark' : 'bookmark_border');

    //     });





    const searchForm = $("form.form-search");
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
        }).then(function (data) {
            console.log(data);
            let resArr = [];
            for (let i = 0; i < 8; i++) {

                indObj = {
                    image_url: data.items[i].volumeInfo.imageLinks ? data.items[i].volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x196?text=No+Image+Found',
                    book_title: data.items[i].volumeInfo.title ? data.items[i].volumeInfo.title : "No Title",
                    book_author: data.items[i].volumeInfo.authors ? data.items[i].volumeInfo.authors.join(", ") : "No Author",
                    selflink: data.items[i].selfLink
                };

                resArr.push(indObj);
            };

            console.log(resArr);

            $.ajax("/booksearch", {
                type: "PUT",
                data: { daddy: resArr }

            }).then(function () {
                location.reload();

            });


        });

    });

    $(".deleteBook").on("click", event => {
        event.preventDefault();
        let club_id = $(event.target).attr("data-clubId")

        $.ajax("/api/nofav", {
            type: "PUT",
            data: { book_id: club_id }

        }).then(function () {
            console.log();

        });

    });

    function renderSearch(data) {

        console.log("rendering search")

        $("#bookResults").empty()

        let rawHTML = "";

        for (let i = 0; i < 8; i++) {
            rawHTML += `<div class="col-2"><div class="card grow mb-5 mt-4 shadow border border-white" style=" border-radius: 20px;"><div class="card-body"><img src="${data.items[i].volumeInfo.imageLinks ? data.items[i].volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x196?text=No+Image+Found'}" alt="Book Cover" class="img-fluid"style="width: 100%; border-radius: 15px;"><h5 class="card-title mt-2">${data.items[i].volumeInfo.title ? data.items[i].volumeInfo.title : "No Title"}</h5><span class="stars">${data.items[i].volumeInfo.authors ? data.items[i].volumeInfo.authors.join(", ") : "No Author"}</span><a><span class="material-icons right">bookmark_border</span><span style="display: none" class="material-icons right">bookmark</span></a></div></div></div>`;

            console.log(rawHTML);
        };

        console.log(rawHTML);

        $("#bookResults").html(rawHTML);

        console.log("done")
    }

    // $(".clickClub").on("click", event => {
    //     event.preventDefault();
    //     event.stopPropagation();

    //     console.log($(event.target).attr("data-clubid"));

    //     let clickedID = $(event.target).attr("data-clubid");

    //     location.assign(`/club/${clickedID}`);
    // });

    $(".addBook").on("click", event => {
        // $("span", this).toggle();




        event.preventDefault();

        console.log(event.target)

        console.log($(event.target).attr("data-selfLink"));

        let bookURL = $(event.target).attr("data-selfLink");


        var toast = document.getElementById("toastConfirm");

        // Add the "show" class to DIV
        toast.className = "show";



        // Add the "show" class to DIV
        toast.className = "show";

        // After 3 seconds, remove the show class from DIV

        setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);





        setTimeout(function () { toasts.className = toast.className.replace("show", ""); }, 3000);

        $.ajax({
            url: bookURL,
            method: "GET"
        }).then(function (response) {
            let google_id = response.id;
            let book_title = response.volumeInfo.title;
            let book_author = response.volumeInfo.authors ? response.volumeInfo.authors.join(", ") : "no author";
            let pg_count = response.volumeInfo.pageCount;
            let book_rating = response.volumeInfo.averageRating ? response.volumeInfo.averageRating : "NO RATING";
            let picture_url = ""
            if (response.volumeInfo.imageLinks) {
                picture_url = response.volumeInfo.imageLinks.large ? response.volumeInfo.imageLinks.large : response.volumeInfo.imageLinks.thumbnail;
            } else {
                picture_url = "https://via.placeholder.com/128x196?text=No+Image+Found"
            };

            createClub(google_id, book_title, book_author, pg_count, picture_url, book_rating)


        }).then(function () {
            setTimeout(function () { location.reload() }, 1000);


        });

    });

    function createClub(google_id, book_title, book_author, pg_count, picture_url, book_rating) {
        $.post("/api/club", {
            google_id: google_id,
            book_title: book_title,
            book_author: book_author,
            pg_count: pg_count,
            picture_url: picture_url,
            book_rating: book_rating
        })
            .then(() => {
                console.log("created club " + book_title);
                // If there's an error, log the error
            })
            .catch(err => {
                console.log("here is wrong")
                console.log(err);
            });
    };

    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(data => {
        $(".member-name").text(data.first_name);
    });

});
$.fn.stars = function () {
    return $(this).each(function () {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 18;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}
$(function () {
    $('span.stars').stars();
});
//   var stupid = `type="submit" data-selfLink="${data.items[i].selfLink}"`