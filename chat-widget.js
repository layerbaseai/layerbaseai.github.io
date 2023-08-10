window.addEventListener('DOMContentLoaded', function () {
  // Function to create and inject chat widget HTML
  function createAndInjectChatWidget() {
    // Create a wrapper div for your chat widget
    const chatWidgetWrapper = document.createElement('div');
    chatWidgetWrapper.style.zIndex = 999999
    chatWidgetWrapper.innerHTML = `
    <!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Embeddable Chat Widget</title>
    
    
    
      <!-- Include your CSS styles or link to an external CSS file -->
      <style>
        #ai-name-container {
          display: flex;
          align-items: center;
        }
    
        #ai-initials {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #007bff;
          /* Adjusted color */
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          /* Adjust font size */
          font-weight: bold;
          /* Added font weight */
          color: white;
          margin-right: 10px;
          /* Add margin for spacing */
        }
    
        /* Style for the book call */
        #book-call-button {
          align-self: flex-end;
          width: 50%;
          background-color: #007bff;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 15px;
          cursor: pointer;
          margin: 0 10px 0 0;
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
    
    
        #chat-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 350px;
          height: 90%;
          border-radius: 20px;
          overflow: hidden;
          transition: height 0.3s ease;
          background-color: #fff;
          padding-bottom: 5px;
          z-index: 1000000; /* Set a high z-index value */
        }
    
        #chat-circle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #4fa9d9;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 1000001; /* Set a z-index higher than chat-widget */
        }
    
        #chat-circle img {
          width: 40px;
          height: 40px;
        }
    
        /* Updated styles for the chat container */
        #chat-container {
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          border: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          border-radius: 20px;
        }
    
        /* New styles for Anna's name and AI image */
        #chat-header {
          padding: 10px;
          background-color: #4fa9d9;
          color: white;
          display: flex;
          align-items: center;
          /* Vertically center content */
          justify-content: space-between;
          /* Space evenly between content */
        }
    
        #chat-messages {
          flex-grow: 1;
          padding: 10px;
          overflow-y: auto;
          margin-bottom: 10px;
        }
    
        #close-button {
          font-size: 24px;
          /* Increase font size */
          cursor: pointer;
        }
    
        /**
        Loader
        */
    
        .dot-pulse {
          position: relative;
          left: -9999px;
          width: 5px;
          height: 5px;
          border-radius: 2.5px;
          color: #fff;
          box-shadow: 9999px 0 0 -5px;
          animation: dot-pulse 1.5s infinite linear;
          animation-delay: 0.25s;
          margin: 0 20px 0 40px;
        }
    
        .dot-pulse::before,
        .dot-pulse::after {
          content: "";
          display: inline-block;
          position: absolute;
          top: 0;
          width: 5px;
          height: 5px;
          border-radius: 2.5px;
          color: #fff;
        }
    
        .dot-pulse::before {
          box-shadow: 9984px 0 0 -5px;
          animation: dot-pulse-before 1.5s infinite linear;
          animation-delay: 0s;
        }
    
        .dot-pulse::after {
          box-shadow: 10014px 0 0 -5px;
          animation: dot-pulse-after 1.5s infinite linear;
          animation-delay: 0.5s;
        }
    
    
        #dynamic-name {
          font-size: 20px;
          /* Adjust font size */
        }
    
    
        #message-input {
          padding: 10px;
          border: none;
          border-top: 1px solid #ccc;
          border-radius: 15px;
          background-color: #E0E0E0;
          margin: 10px;
          /* Add margin on top, right, and bottom */
          flex-grow: 1;
          /* Expand to fill available space */
          box-sizing: border-box;
          /* Include padding and border in the element's total width */
          width: 75%;
        }
    
    
        .message {
          margin-bottom: 10px;
          font-size: 14px;
          display: flex;
          /* Use flex layout */
          justify-content: flex-start;
          /* Align content to the start */
          max-width: 70%;
          /* Limit the width of the bubbles */
        }
    
        /* New styles for the message container */
        .message-container {
          display: flex;
          margin-bottom: 10px;
        }
    
    
        /* Style for response messages */
        .message.response {
          background-color: #F2F2F2;
          color: #555555;
          padding: 8px;
          margin-bottom: 10px;
          border-radius: 5px;
        }
    
        /* Updated styles for the message avatar */
        .message-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #95c2e6;
          display: inline-flex;
          align-self: flex-start;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          color: white;
          margin-left: 10px;
          align-items: center;
        }
    
        /* Adjusted styles for the message text */
        .message-text {
          display: inline-block;
          word-wrap: break-word;
          background-color: #007bff;
          padding: 10px;
          color: #fff;
          border-radius: 15px 5px 15px 15px;
          max-width: 80%;
        }
    
        .message-content {
          width: 90%;
          text-align: end;
        }
    
        /* Apply flexbox to the message form */
        .message-form {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
    
        /* Style for AI speech bubble */
        .response {
          color: #555555;
          align-self: flex-start;
          border-radius: 20px 20px 0 20px;
          /* Rounded corners for AI speech bubble */
          margin-right: auto;
          /* Push the bubble to the left for AI messages */
        }
    
        .response-content {
          text-align: start;
          width: 90%;
        }
    
        .response-text {
          display: inline-block;
          word-wrap: break-word;
          background-color: #6d8aaa;
          padding: 10px;
          color: #fff;
          border-radius: 5px 15px 15px 15px;
          max-width: 80%;
        }
    
        .response-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #dc7064;
          display: inline-flex;
          align-self: flex-start;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          color: white;
          margin-right: 10px;
          align-items: center;
        }
    
    
        #send-button {
          padding: 10px;
          border: none;
          background-color: white;
          color: blue;
          cursor: pointer;
          width: auto;
          border-radius: 5px;
          margin: 10px 0;
        }
    
        .typing-container {
          display: inline-block;
          word-wrap: break-word;
          background-color: #6d8aaa;
          padding: 5px;
          color: #fff;
          border-radius: 5px 15px 15px 15px;
          text-align: justify;
        }
    
    
        #typing-message {
          display: inline;
          color: #959595;
          margin-left: 8px;
        }
    
        /* Style for user speech bubble */
        .user {
          padding: 10px;
          align-items: flex-end;
        }
    
        /* In your <style> tag or external CSS file */
        body {
          font-family: "Roboto", Arial, sans-serif;
        }
    
        /* Apply the font to specific elements */
        #chat-header,
        .message-text,
        .response-text,
        #message-input,
        #call-form-inputs label,
        #call-form-inputs input,
        #call-form-inputs button {
          font-family: "Roboto", Arial, sans-serif;
        }
    
        @keyframes dot-pulse-before {
          0% {
            box-shadow: 9984px 0 0 -5px;
          }
    
          30% {
            box-shadow: 9984px 0 0 2px;
          }
    
          60%,
          100% {
            box-shadow: 9984px 0 0 -5px;
          }
        }
    
        @keyframes dot-pulse {
          0% {
            box-shadow: 9999px 0 0 -5px;
          }
    
          30% {
            box-shadow: 9999px 0 0 2px;
          }
    
          60%,
          100% {
            box-shadow: 9999px 0 0 -5px;
          }
        }
    
        @keyframes dot-pulse-after {
          0% {
            box-shadow: 10014px 0 0 -5px;
          }
    
          30% {
            box-shadow: 10014px 0 0 2px;
          }
    
          60%,
          100% {
            box-shadow: 10014px 0 0 -5px;
          }
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
            <div id="ai-name-container">
              <div id="ai-initials">AI</div>
              <div id="dynamic-name">AI Receptionist</div>
            </div>
            <span id="close-button">&times;</span>
          </div>
          <div id="chat-messages">
            <div id="typing-indicator" style="display: none;">
              <div class="typing-container">
                <div class="dot-pulse"></div>
              </div>
            </div>
          </div>
          <button id="book-call-button">Get In Touch</button>
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
          <form id="message-form">
            <input type="text" id="message-input" placeholder="Write Message" />
            <button type="submit" id="send-button">Send</button>
          </form>
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
  var scriptTag = document.getElementById('chat-widget-script');
  var variable1 = scriptTag.getAttribute('data-variable1');
  var variable2 = scriptTag.getAttribute('data-variable2');


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
          // showTypingIndicator(); // Show the typing indicator after clicking send
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
      appendMessage(message, "url", 'user');
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      const typingIndicator = document.createElement('div');
      typingIndicator.classList.add('message-container', 'response'); // Add classes for styling
      typingIndicator.innerHTML = `
          <div class="response-avatar">AI</div>
          <div class="response-content">
              <div class="message-label">AI</div>
              <div class="response-text">
                  <div class="typing-container">
                      <div class="dot-pulse"></div>
                  </div>
              </div>
          </div>
          
      `;
      chatMessages.appendChild(typingIndicator);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Send the message to the API
      const payload = {
          query_text: message,
          index_name: "transcriptindex-index",
          namespace_id: variable1,
          layer_id: variable2,
          session_id: sessionID,
          company_type: "Commercial and Residential Roofing"
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

              // Remove the typing indicator
              chatMessages.removeChild(typingIndicator);


              // Append the answer to the chat widget
              const answer = data.answer;
              const url = data.url
              appendMessage(answer, url, 'response');
          })
          .catch(error => {
              // Handle any errors that occur during the API request
              console.error('Error:', error);
              // Wait for 3 seconds
              setTimeout(function () {
                  // Your code to be executed after the delay
                  chatMessages.removeChild(typingIndicator);
                  appendMessage("Please ask again", "url", 'response');
              }, 12000);
              // Remove the typing indicator and append a default response
          });
  }

  function appendMessage(message, url, type) {
      const messageContainer = document.createElement('div');
      messageContainer.classList.add('message-container'); // New container class

      // Create the message avatar element
      const avatarElement = document.createElement('div');
      avatarElement.classList.add('message-avatar');
      avatarElement.textContent = type === 'user' ? 'G' : 'AI'; // Use 'Guest' for user messages

      // Create a container for label and message text
      const contentContainer = document.createElement('div');
      contentContainer.classList.add('message-content');

      // Create the guest or AI label
      const labelElement = document.createElement('div');
      labelElement.classList.add('message-label');
      labelElement.textContent = type === 'user' ? 'Guest' : 'AI';

      // Append the label to the content container
      contentContainer.appendChild(labelElement);

      // Create the message text element
      const messageElement = document.createElement('div');
      messageElement.classList.add('message-text');
      messageElement.textContent = message;

      // Append the message text to the content container
      contentContainer.appendChild(messageElement);

      // Append the content container to the new message container
      messageContainer.appendChild(contentContainer);

      // Append the avatar before or after the content container based on the message type
      if (type === 'user') {
          messageContainer.appendChild(avatarElement);
          contentContainer.classList.add('message-content'); // Add .message-content class for user messages
      } else {
          messageContainer.insertBefore(avatarElement, contentContainer);
          contentContainer.classList.remove('message-content');
          contentContainer.classList.add('response-content'); // Add .response-content class for AI messages
          avatarElement.classList.remove('message-avatar');
          avatarElement.classList.add('response-avatar'); // Add .response-avatar class for AI messages
          messageElement.classList.remove('message-text');
          messageElement.classList.add('response-text'); // Add .response-text class for AI messages
      }

      // Apply the type-specific class for styling
      messageContainer.classList.add(type === 'response' ? 'response' : 'user');

      chatMessages.appendChild(messageContainer);
      chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
      const typingIndicator = document.getElementById('typing-indicator');
      typingIndicator.style.display = 'inline-block';
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

  // Handle sending messages
  document.getElementById('message-form').addEventListener('submit', function (event) {
      event.preventDefault();
      const message = document.getElementById('message-input').value.trim();
      if (message !== '') {
          sendMessage(message); // Call your message sending function
          document.getElementById('message-input').value = ''; // Clear the input
      }
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
