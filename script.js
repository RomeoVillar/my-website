const form = document.getElementById("contact-form");
const response = document.getElementById("form-response");

form.addEventListener("submit", function(e){
    e.preventDefault();

    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {'Accept':'application/json'}
    })
    .then(res => {
        if(res.ok){
            response.textContent = "✅ Message sent successfully!";
            form.reset();
        } else {
            response.textContent = "⚠️ Something went wrong.";
        }
    })
    .catch(() => {
        response.textContent = "⚠️ Check your internet connection.";
    });
});
