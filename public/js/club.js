$(document).ready(() => {

    $("#pgBtn").on("click", event => {
        event.preventDefault();
        console.log("clicked")
        updateProgress()
    });

    function updateProgress(){
        let currentPg = parseInt($("#current_pg").val());
        console.log(currentPg);
        let totalPg = parseInt($("#totalPgCount").html());
        console.log(totalPg)
        let percentProg = ((currentPg/totalPg) * 100) + "%"
        console.log(percentProg)

        $("#progress").width(percentProg);
    };

    $(".threadTopic").on("click", event => {
        event.preventDefault();

        let topicID = $(event.target).parent().attr("data-id");
        console.log(topicID + " was clicked!")

        window.location.replace(`thread/${topicID}`);
    });

    function renderClub(data) {

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
});