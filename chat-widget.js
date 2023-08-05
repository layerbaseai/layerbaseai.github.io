// JavaScript
window.addEventListener('DOMContentLoaded', function () {
  const chatCircle = document.getElementById('chat-circle');
  const chatWidget = document.getElementById('chat-widget');
  const closeButton = document.getElementById('close-button');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const chatContainer = document.getElementById('chat-container');
  const chatMessages = document.getElementById('chat-messages');

  let sessionID;

  chatCircle.addEventListener('click', function () {
    chatContainer.style.display = 'flex';
    chatCircle.style.display = 'none';
    sessionID = generateUUID();
    // Use the sessionID in your API requests or other logic
    console.log('Session ID:', sessionID);
  });

  closeButton.addEventListener('click', function () {
    chatContainer.style.display = 'none';
    chatCircle.style.display = 'flex';
  });

  sendButton.addEventListener('click', function () {
    const message = messageInput.value.trim();
    if (message !== '') {
      sendMessage(message);
      messageInput.value = '';
      showTypingIndicator(); // Show the typing indicator after clicking send
    }
  });

  function generateUUID() {
    // You can use a simple UUID generation function here
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function sendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Send the message to the API
    const payload = {
      query_text: message,
      index_name: "transcriptindex-index",
      namespace_id: "1roofsolution",
      layer_id: "1roofsolution",
      session_id: sessionID
    };

    fetch('https://jmohlmimz7.execute-api.us-east-1.amazonaws.com/lambda_chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        // Process the API response as needed
        console.log(data);

        hideTypingIndicator();

        // Append the answer to the chat widget
        const answer = data.answer;
        const url = data.url
        appendMessage(answer, url, 'response');
      })
      .catch(error => {
        // Handle any errors that occur during the API request
        console.error('Error:', error);
      });
  }

  function appendMessage(message, url, type) {
    const messageContainer = document.createElement('div');

    // Create the answer text message element
    const answerElement = document.createElement('div');
    answerElement.classList.add('message');
    answerElement.classList.add(type === 'response' ? 'response' : 'user');
    answerElement.textContent = message;
    messageContainer.appendChild(answerElement);

    // // Create the URL message element
    // const urlElement = document.createElement('div');
    // urlElement.classList.add('message');
    // urlElement.classList.add('response');
    // urlElement.textContent = 'Here is the page with more information: ';

    // const urlLinkElement = document.createElement('a');
    // urlLinkElement.href = url;
    // urlLinkElement.target = '_blank';
    // urlLinkElement.textContent = url;
    // urlElement.appendChild(urlLinkElement);

    // messageContainer.appendChild(urlElement);

    chatMessages.appendChild(messageContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'block';
  }

  function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'none';
  }

  const bookCallButton = document.getElementById('book-call-button');
  const callBookingForm = document.getElementById('call-booking-form');
  const callForm = document.getElementById('call-form');

  bookCallButton.addEventListener('click', function () {
    callBookingForm.style.display = 'block';
  });

  callForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    // Do something with the collected data, such as sending it to a server
    console.log('Name:', name);
    console.log('Phone:', phone);
    console.log('Email:', email);

    callBookingForm.style.display = 'none'; // Hide the form after submission
  });

});
