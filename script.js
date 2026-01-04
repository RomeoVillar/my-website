// Button click example
document.getElementById('clickBtn').addEventListener('click', function() {
    document.getElementById('message').textContent = "You clicked the button! 🎉";
});

// Contact form submit
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent page reload

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const messageInput = document.getElementById('messageInput').value;

  // Check for network connectivity
  if (!navigator.onLine) {
    alert('You are offline. Please connect to the internet to send your message.');
    return;
  }

  // Send data to server using fetch
  fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      message: messageInput
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }
  })
  .then(data => {
    alert(`Thank you, ${name}! We received your message.`);
    this.reset(); // Clear form
  })
  .catch(error => {
    console.error('Error:', error);
    alert(`Failed to send message. Error: ${error.message}`);
  });
});