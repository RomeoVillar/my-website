const form = document.getElementById("contact-form");
const response = document.getElementById("form-response");

form.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent default submission

    // Use FormSubmit with AJAX to send the form
    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(responseFetch => {
        if (responseFetch.ok) {
            response.textContent = "✅ Message sent successfully!";
            form.reset();
        } else {
            response.textContent = "⚠️ Oops! Something went wrong. Try again.";
        }
    })
    .catch(() => {
        response.textContent = "⚠️ Unable to send message. Check your internet.";
    });
});
