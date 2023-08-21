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
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          *,
          html {
            --primaryGradient: linear-gradient(93.12deg, #1b2e98 0.52%, #1b2ae7 100%);
            --secondaryGradient: linear-gradient(268.91deg, #1b2e98 -2.14%, #1b2ae7 99.69%);
            --primaryBoxShadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
            --secondaryBoxShadow: 0px -10px 15px rgba(0, 0, 0, 0.1);
            --light: 300;
            --regular: 400;
            --semiBold: 600;
            --extraLight: 300;
            --italic: 300;
            --primary: #1b2398;
          }

          /* 300;0,400;0,600;1,300 */

          body {
            font-family: 'Nunito', sans-serif;
            font-weight: 400;
            font-size: 100%;
          }


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
            background: var(--primaryGradient);
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 15px;
            cursor: pointer;
            margin: 10px 25%;
            box-shadow: var(--primaryBoxShadow);
          }

          #book-cal-bg {
            background: transparent;
            padding: 10px auto;
          }


          #call-booking-form {
            display: none;
            background-color: var(--primaryGradient);
            padding: 20px;
            border: 1px solid #007bff;
            border-radius: 20px 20px 0 0;
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
            border-radius: 20px;
            cursor: pointer;
            height: 45px;
            width: 75%;
            margin: auto;
            font-size: 15px;
          }


          #chat-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 350px;
            height: 0;
            border-radius: 20px;
            overflow: hidden;
            transition: height 0.3s ease;
          }

          #chat-circle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgb(0, 72, 255), rgb(1, 204, 255));
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

          /* Updated styles for the chat container */
          #chat-container {
            height: 100%;
            width: 350px;
            display: flex;
            flex-direction: column;
            position: relative;
            border-radius: 20px;
            background-color: #F2F2F2;
          }

          /* New styles for Anna's name and AI image */
          #chat-header {
            padding: 10px;
            background: var(--primaryGradient);
            color: white;
            display: flex;
            align-items: center;
            /* Vertically center content */
            justify-content: space-between;
            /* Space evenly between content */
            box-shadow: var(--primaryBoxShadow);
          }

          /* New styles for Anna's name and AI image */
          #chat-footer {
            padding: 10px;
            background: var(--primaryGradient);
          }

          #chat-messages {
            flex-grow: 1;
            padding: 10px;
            overflow-y: auto;
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
            color: #0077ff;
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
            color: #0077ff;
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
          
          #form-intro {
            text-align: center;
          }

          #form-intro-text {
            font-size: 11px;
            margin: 10px 0;
          }

          .form-input {
            height: 35px;
            font-size: 16px;
            border-radius: 10px;
            padding: 0 10px;
            outline: none;
            border: solid 1px #007bff;
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
            outline: none;
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

          .message-label {
            font-size: 11px;
            padding: 3px 0;
          }

          /* Updated styles for the message avatar */
          .message-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgb(0, 72, 255), rgb(1, 204, 255));
            display: inline-flex;
            align-self: flex-end;
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
            background: var(--primaryGradient);
            padding: 15px;
            color: #fff;
            border-radius: 15px 15px 5px 15px;
            text-align: left;
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
            padding: 15px;
            border-radius: 15px 15px 15px 5px;
            border: 1px solid transparent;
            background: linear-gradient(white, white) padding-box, linear-gradient(135deg, rgb(0, 169, 255), rgb(1, 204, 255)) border-box;
            max-width: 80%;
          }

          .response-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgb(23, 135, 255), rgb(0, 27, 135));
            display: inline-flex;
            align-self: flex-end;
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
            background-color: rgba(255, 255, 255, 0);
            color: rgb(255, 255, 255);
            cursor: pointer;
            width: auto;
            font-size: 15px;
            border-radius: 5px;
            margin: 10px 0;
            outline: none;
          }

          .typing-container {
            display: inline-block;
            word-wrap: break-word;
            background-color: #6d8baa00;
            padding: 5px;
            color: #fff;
            border-radius: 5px 15px 15px 15px;
          }


          #typing-message {
            display: inline;
            color: #959595;
            margin-left: 8px;
          }

          #test-div {
            text-align: end;
            margin: 100px 20px;

          }

          /* Style for user speech bubble */
          .user {
            padding: 10px;
            align-items: flex-end;
          }

          /* In your <style> tag or external CSS file */
          body {
            font-family: "Roboto", Arial, sans-serif;
            background-color: #007bff;
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
            <div id="book-cal-bg">
              <button id="book-call-button">Talk to Person</button>
            </div>
            <div id="call-booking-form" style="display: none;">
              <div id="form-intro">
                <h3>Want to talk to a person?</h3>
                <p id="form-intro-text">Enter your contact information below and a representative will be with you shortly</p>
              </div>
              <form id="call-form-inputs">
                <label for="name">Name:</label>
                <input type="text" id="name" class="form-input" required>

                <label for="phone">Phone:</label>
                <input type="tel" id="phone" class="form-input" required>

                <label for="email">Email:</label>
                <input type="email" id="email" class="form-input" required>

                <button type="submit" id="form-submit">Submit</button>
              </form>
            </div>
            <div id="chat-footer">
            <form id="message-form">
              <input type="text" id="message-input" placeholder="Write Message" />
              <button type="submit" id="send-button">Send</button>
            </form>
          </div>
          </div>
        </div>

      </body>
      
      <script src="/chat-widget.js"></script>

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
  const dynamicName = document.getElementById('dynamic-name');
  const aiInitials = document.getElementById('ai-initials');
  var scriptTag = document.getElementById('chat-widget-script');
  var companyId = scriptTag.getAttribute('companyId');
  var categories = scriptTag.getAttribute('categories');
  var chatName = scriptTag.getAttribute('chatName');
  var intials = scriptTag.getAttribute('intials');

  dynamicName.innerText = chatName
  aiInitials.innerText = intials

  let sessionID;

  chatCircle.addEventListener('click', function () {
    chatContainer.style.display = 'flex';
    chatWidget.style.boxShadow = "0px 0 5px #9f9f9f";
    chatWidget.style.height = "90%";
    chatCircle.style.display = 'none';
    sessionID = generateUUID();
    // Use the sessionID in your API requests or other logic
    console.log('Session ID:', sessionID);
  });

  closeButton.addEventListener('click', function () {
    chatContainer.style.display = 'none';
    chatCircle.style.display = 'flex';
    chatWidget.style.boxShadow = "0px 0 0 #fff";
    chatWidget.style.height = "0";
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
          <div class="response-avatar">${intials}</div>
          <div class="response-content">
              <div class="message-label">${chatName}</div>
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
      namespace_id: companyId,
      layer_id: companyId,
      session_id: sessionID,
      company_type: categories
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
        chatMessages.removeChild(typingIndicator);
        appendMessage("Please ask again", "url", 'response');
      });
  }

  function appendMessage(message, url, type) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container'); // New container class

    // Create the message avatar element
    const avatarElement = document.createElement('div');
    avatarElement.classList.add('message-avatar');
    avatarElement.textContent = type === 'user' ? 'G' : intials; // Use 'Guest' for user messages

    // Create a container for label and message text
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('message-content');

    // Create the guest or AI label
    const labelElement = document.createElement('div');
    labelElement.classList.add('message-label');
    labelElement.textContent = type === 'user' ? 'Guest' : chatName;

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
