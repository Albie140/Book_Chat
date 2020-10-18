
$("#sendMessage").on("submit", event => {
    event.preventDefault();
    let commentInput = $("#chatInput").val().trim();
    let thread_id = $("#sendMessage").attr("data-thread_id")

    if (!commentInput) {
        console.log("no comment");
        return;
    };

    $.post("/api/response", {
        comment: commentInput,
        ThreadId: thread_id
      })
        .then(() => {
          window.location.reload();
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);





});