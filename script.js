document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    let messages = JSON.parse(localStorage.getItem("messages")) || [];

    messages.push({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("messages", JSON.stringify(messages));

    document.getElementById("form-response").textContent =
        "Message sent successfully!";

    this.reset();
});
