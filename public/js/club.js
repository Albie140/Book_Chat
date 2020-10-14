$(document).ready(() => {

    updateProgress();

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

        window.location.replace(`/thread/${topicID}`);
    });
});