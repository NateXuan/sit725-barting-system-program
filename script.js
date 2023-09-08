$(document).ready(function () {
    $("#registerButton").click(function () {
        window.location.href = "/register-page";
    });
});

$(document).ready(function () {
    setTimeout(function () {
        $(".temp-message").fadeOut("slow", function () {
            $(this).remove();
        });
    }, 5000); // 5 seconds

    $(".cancel-btn").on("click", function () {
        const productId = $(this).data("product-id");

        $.ajax({
            url: `/api/products/${productId}`,
            type: "DELETE",
            success: function (result) {
                // Display message
                $("#message")
                    .text("The product has been cancelled")
                    .css({
                        "background-color": "green",
                        "text-align": "center",
                        padding: "10px",
                        color: "white",
                    })
                    .fadeIn()
                    .delay(5000)
                    .fadeOut();

                setTimeout(() => {
                    location.reload(); // refresh the page
                }, 5100);
            },
        });
    });
});

$(document).ready(function () {
    $("#priceFilter").on("change", function () {
        let range = $(this).val();
        window.location.href = "/item?priceRange=" + range;
    });
});

//TODO: transactionScript.js
$(document).ready(function () {
    const chatbox = $(".transaction-chatbox");
    const messageBtn = $("#toggle-message-btn");
    messageBtn.on("click", function (event) {
        event.preventDefault();
        const isOpening = chatbox.hasClass("hidden");
        chatbox.toggleClass("hidden"); // toggle chatbox state
        if (isOpening) {
            onOpeningChatbox();
        } else {
            onClosingChatbox();
        }
    });
});

function onOpeningChatbox() {
    // Chatbox
    const chatbox = $(".transaction-chatbox");
    chatbox.html(`
    <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
    <span class="sr-only"></span>
    </div>
    </div>
    `);
    console.log(chatbox.html);
    // Detail
    const messageBtn = $("#toggle-message-btn");
    messageBtn.text("View Details");
    $(".transaction-details-items .col").each(function () {
        $(this).addClass("col-12");
    });
    $(".transaction-details-items .col.trade-icon").html(
        '<i class="bi bi-arrow-down-up" style="font-size: 30px"></i>'
    );
}

function onClosingChatbox() {
    // Chatbox
    $(".transaction-chatbox").html("");

    // Detail
    const messageBtn = $("#toggle-message-btn");
    messageBtn.text("Open Chat");
    $(".transaction-details-items .col").each(function () {
        $(this).removeClass("col-12");
    });
    $(".transaction-details-items .col.trade-icon").html(
        '<i class="bi bi-arrow-left-right" style="font-size: 50px"></i>'
    );
}
