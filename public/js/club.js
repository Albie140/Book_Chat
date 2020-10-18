$(document).ready(() => {

    updateProgress();

    $("#pgBtn").on("click", event => {
        event.preventDefault();

        let currentPg = parseInt($("#current_pg").val());
        let club_idInput = $("#threadTopic").attr("data-club_id");

        $.ajax("/api/pgnum", {
            type: "PUT",
            data: { pg_num: currentPg, club_id: club_idInput }
        }).then(() => {
            console.log("created pg to #" + currentPg);
            window.location.reload();
        });

    });

    function updateProgress() {
        let currentPg = parseInt($("#current_pg").val());
        console.log(currentPg);
        let totalPg = parseInt($("#totalPgCount").html());
        console.log(totalPg)
        let percentProg = ((currentPg / totalPg) * 100) + "%"
        console.log(percentProg)
        $("#progress").width(percentProg);
    };

    $("#threadTopic").on("submit", event => {
        event.preventDefault();

        let topicInput = $("#topic").val();
        let pg_numInput = $("#pg_num").val();
        let club_idInput = $("#threadTopic").attr("data-club_id");

        $.post("/api/thread", {
            topic: topicInput,
            pg_num: pg_numInput,
            ClubId: club_idInput
        })
            .then(() => {
                console.log("created club " + topicInput);
                location.reload();
                // If there's an error, log the error
            })
            .catch(err => {
                console.log("here is wrong")
                console.log(err);
            });


    });
});