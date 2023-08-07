window.addEventListener('DOMContentLoaded', function () {
  // Function to create and inject chat widget HTML
  function createAndInjectChatWidget() {
      // Create a wrapper div for your chat widget
      const chatWidgetWrapper = document.createElement('div');
      chatWidgetWrapper.innerHTML = `
      <!DOCTYPE html>
      <html>
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Embeddable Chat Widget</title>
      
      
      
        <!-- Include your CSS styles or link to an external CSS file -->
        <style>
          #chat-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 300px;
            height: 80%;
            border-radius: 5px;
            overflow: hidden;
            transition: height 0.3s ease;
            z-index: 10000000
          }
      
          #chat-circle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: #4CAF50;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 9999;
          }
      
          #chat-circle img {
            width: 40px;
            height: 40px;
          }
      
          #chat-container {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
      
          #chat-header {
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            display: flex;
            justify-content: flex-end;
          }
      
          #close-button {
            cursor: pointer;
          }
      
          #chat-messages {
            flex-grow: 1;
            padding: 10px;
            overflow-y: auto;
            border: 1px solid #ccc;
            background: white
          }
      
          #message-input {
            padding: 10px;
            border: 1px solid #ccc;
            border-top: none;
            border-radius: 0;
          }
      
          #send-button {
            padding: 10px;
            border: none;
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
          }
      
          /* Style for response messages */
          .message.response {
            background-color: #F2F2F2;
            color: #555555;
            padding: 8px;
            margin-bottom: 10px;
            border-radius: 5px;
          }
      
          /* Style for the spinner */
          .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }
      
          /* Style for the book call */
          #book-call-button {
            width: 25%;
            align-self: flex-end;
          }
      
          #call-booking-form {
            display: none;
            background-color: #f5f5f5;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-top: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
      
          #call-form-inputs label,
          #call-form-inputs input,
          #call-form-inputs button {
            display: block;
            margin-bottom: 10px;
            width: 100%;
          }
      
          #call-form-inputs button {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
          }
      
      
      
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
      
            100% {
              transform: rotate(360deg);
            }
          }
        </style>
      </head>
      
      <body>
        <!-- Embeddable Chat Widget -->
        <div id="chat-widget">
          <div id="chat-circle">
            <img src="https://cdn-icons-png.flaticon.com/512/6488/6488547.png" alt="Chat Icon" />
          </div>
          <div id="chat-container" style="display: none;">
            <div id="chat-header">
              <span id="close-button">&times;</span>
            </div>
            <div id="chat-messages"></div>
            <div id="typing-indicator" style="display: none;">
              <div class="spinner"></div>
            </div>
            <button id="book-call-button">Contact Human</button>
            <div id="call-booking-form" style="display: none;">
              <h3>Book a Call</h3>
              <form id="call-form-inputs">
                <label for="name">Name:</label>
                <input type="text" id="name" required>
          
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" required>
          
                <label for="email">Email:</label>
                <input type="email" id="email" required>
          
                <button type="submit">Submit</button>
              </form>
            </div>
            <input type="text" id="message-input" placeholder="Type your message..." />
            <button id="send-button">Send</button>
          </div>
        </div>
      
    
      </body>
      
      </html>
      `;

      // Insert the chat widget wrapper before the end of the body
      document.body.appendChild(chatWidgetWrapper);
  }

  // Call the function to create and inject the chat widget HTML
  createAndInjectChatWidget();
});


// JavaScript
window.addEventListener('DOMContentLoaded', function () {
  const chatCircle = document.getElementById('chat-circle');
  const chatWidget = document.getElementById('chat-widget');
  const closeButton = document.getElementById('close-button');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const chatContainer = document.getElementById('chat-container');
  const chatMessages = document.getElementById('chat-messages');
  const bookCallButton = document.getElementById('book-call-button');
  const callBookingForm = document.getElementById('call-booking-form');
  const callFormInputs = document.getElementById('call-form-inputs');
  var variable1 = script.getAttribute('data-variable1');
  var variable2 = script.getAttribute('data-variable2');


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
      namespace_id: variable1,
      layer_id: variable1,
      session_id: sessionID,
      company_type: variable2
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

  bookCallButton.addEventListener('click', function () {
    if (callBookingForm.style.display === 'block') {
      callBookingForm.style.display = 'none';
    } else {
      callBookingForm.style.display = 'block';
    }

    console.log("button clicked")
  });

  callFormInputs.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    // Send the message to the API
    const lead_payload = {
      name_text: name,
      phone_text: phone,
      email_text: email,
      session_id: sessionID
    };


    fetch('https://jmohlmimz7.execute-api.us-east-1.amazonaws.com/storeInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(lead_payload)
    })
      .then(response => response.json())
      .then(data => {
        // Process the API response as needed
        console.log(data);

        appendMessage("your information has been sent", "url", 'response');
      })
      .catch(error => {
        // Handle any errors that occur during the API request
        console.error('Error:', error);
      });

    console.log(name)
    console.log(phone)
    console.log(email)

    callBookingForm.style.display = 'none';
  });
});
