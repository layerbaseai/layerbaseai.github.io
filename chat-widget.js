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
          --primaryBoxShadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
          --secondaryBoxShadow: 0px -10px 15px rgba(0, 0, 0, 0.1);
          --light: 300;
          --regular: 400;
          --semiBold: 600;
          --extraLight: 300;
          --italic: 300;
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
    
        #chat-avatar {
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
          background: var(--omnibotPrimaryGradient);
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
          padding: 20px;
          border-top: 1px solid #E3E3E3;
          border-radius: 10px 10px 0 0;
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
          background: var(--omnibotPrimaryGradient);
          color: #fff;
          border: none;
          padding: 8px 12px;
          border-radius: 10px;
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
          border-radius: 10px;
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
          background: var(--omnibotPrimaryGradient);
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
          background-color: #fff;
        }
    
        /* New styles for Anna's name and AI image */
        #chat-header {
          padding: 10px;
          /* background: var(--omnibotPrimaryGradient); */
          color: rgb(35, 35, 35);
          display: flex;
          align-items: center;
          /* Vertically center content */
          justify-content: space-between;
          /* Space evenly between content */
          /* box-shadow: var(--primaryBoxShadow); */
          border-bottom: 1px solid #E3E3E3;
          font-weight: 600;
        }
    
        /* New styles for Anna's name and AI image */
        #chat-footer {
          padding: 10px;
          /* background: var(--omnibotPrimaryGradient); */
          border-top: 1px solid #E3E3E3;
        }
    
        #chat-messages {
          flex-grow: 1;
          padding: 10px 20px;
          overflow-y: auto;
        }
    
        #close-button {
          font-size: 24px;
          /* Increase font size */
          cursor: pointer;
          margin-right: 5px;
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
          color: #252525;
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
          color: #252525;
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
          border-radius: 5px;
          padding: 0 10px;
          outline: none;
          border: solid 1px #e3e3e3;
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
          margin-bottom: 15px;
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
          padding: 3px 15px;
        }
    
        /* Updated styles for the message avatar */
        .message-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--omnibotPrimaryGradient));
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
          background: var(--omnibotPrimaryGradient);
          color: #fff;
          max-width: 95%;
          border-radius: 10px;
          padding: 14px 18px;
          display: inline-block;
          font-size: 14px;
          line-height: 1.4;
          overflow-wrap: anywhere;
          position: relative;
          min-width: 60px;
        }
    
        .message-content {
          width: 100%;
          text-align: end;
        }
    
        /* Apply flexbox to the message form */
        #message-form {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
    
        #omnibot-credits {
          display: block;
          background: #f7f7f8;
          text-align: center;
          padding: 10px;
          font-size: 11px;
          color: #7d7c83;
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
          background: linear-gradient(white, white) padding-box, var(--omnibotPrimaryGradient) border-box;
          border: 1px solid transparent;
          color: rgb(26, 26, 26);
          max-width: 85%;
          border-radius: 10px;
          padding: 14px 18px;
          display: inline-block;
          font-size: 14px;
          line-height: 1.4;
          overflow-wrap: anywhere;
          position: relative;
          min-width: 60px;
        }
    
        .response-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--omnibotPrimaryGradient));
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
          /* background-color: rgba(255, 255, 255, 0);
          color: rgb(255, 255, 255); */
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
    
        #text-area {
          background: none;
          border: none;
          width: 85%;
          font-family: "Roboto", Arial, sans-serif;
          resize: none;
          font-size: 15px;
          line-height: 20px;
          display: block;
          color: inherit;
          max-height: 200px;
          outline: none;
          height: 25px;
          margin-left: 15px;
        }
    
        #test-div {
          text-align: end;
          margin: 100px 20px;
    
        }
    
        /* Style for user speech bubble */
        .user {
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
    
    
        #bounce-element {
          color: rgb(255, 255, 255);
          background: var(--omnibotPrimaryGradient);
          animation: bounce .3s ease-in-out 3;
          animation-delay: 2s;
          display: flex;
          position: fixed;
          bottom: 95px;
          right: 20px;
          padding: 20px;
          border-radius: 15px;
          transition: transform 0.2s cubic-bezier(0.6, 0.4, 0, 1), opacity 0.15s cubic-bezier(0.6, 0.4, 0, 1);
          /* Delay before the second bounce */
        }
    
        #bounce-element:after {
          border-radius: 4px 0 0;
          content: '';
          height: 14px;
          width: 14px;
          position: absolute;
          bottom: -7px;
          transform: rotate(-135deg);
          background: var(--omnibotPrimary);
          right: 24px;
        }
    
        @keyframes bounce {
    
          0%,
          100% {
            transform: translateY(0);
          }
    
          50% {
            transform: translateY(-10px);
          }
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
        <div id="bounce-element">Have a question?</div>
        <div id="chat-circle">
          <img src="https://cdn-icons-png.flaticon.com/512/6488/6488547.png" alt="Chat Icon" />
        </div>
        <div id="chat-container" style="display: none;">
          <div id="chat-header">
            <div id="ai-name-container">
              <img id="chat-avatar" src="https://a115450d611a5d9e5adccb79c5cdadc6.cdn.bubble.io/f1692125393551x158245438633071400/Omnibot%20Logo.002.jpeg?_gl=1*30gn33*_ga*MTExNjUxMjU3NC4xNjg5NzE2MDky*_ga_BFPVR2DEE2*MTY5MzMzMTcxNC43NS4xLjE2OTMzMzc3NTMuNjAuMC4w">
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
              <!-- <input type="text" id="message-input" placeholder="Write Message" /> -->
              <textarea id="text-area" placeholder="Ask anything..."></textarea>
              <button type="submit" id="send-button">Send</button>
            </form>
          </div>
          <div id="omnibot-credits">
            Powered by <a href="https://omnibotsystems.com" target="_blank">Omnibot</a>
          </div>
        </div>
      </div>

      <script src="/chat-widget.js"></script>

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
  const messageInput = document.getElementById('text-area');
  const sendButton = document.getElementById('send-button');
  const chatContainer = document.getElementById('chat-container');
  const chatMessages = document.getElementById('chat-messages');
  const bookCallButton = document.getElementById('book-call-button');
  const callBookingForm = document.getElementById('call-booking-form');
  const callFormInputs = document.getElementById('call-form-inputs');
  const bounceElement = document.getElementById('bounce-element');
  const chatAvatar = document.getElementById('chat-avatar');
  const dynamicName = document.getElementById('dynamic-name');
  let htmlElement = document.documentElement;
  let scriptTag = document.getElementById('chat-widget-script');
  let companyId = scriptTag.getAttribute('companyId');
  let categories = scriptTag.getAttribute('categories');
  let chatName = scriptTag.getAttribute('chatName');
  let accountId = scriptTag.getAttribute('accountId');
  let color1 = scriptTag.getAttribute('color1');
  let color2 = scriptTag.getAttribute('color2');
  let chatAvatarImg = scriptTag.getAttribute('chatAvatarImg');

  let gradientValue = `linear-gradient(135deg, ${color1}, ${color2})`;

  htmlElement.style.setProperty('--omnibotPrimaryGradient', gradientValue);
  htmlElement.style.setProperty('--omnibotPrimary', color2);


  dynamicName.innerText = chatName
  chatAvatar.src = chatAvatarImg


  let sessionID;

  chatCircle.addEventListener('click', function () {
    chatContainer.style.display = 'flex';
    chatWidget.style.border = "1px solid #E3E3E3";
    chatWidget.style.height = "90%";
    chatCircle.style.display = 'none';
    bounceElement.style.display = 'none';
    // Check if session ID already exists in session storage
    sessionID = sessionStorage.getItem('sessionID');

    if (!sessionID) {
      sessionID = generateUUID();
      sessionStorage.setItem('sessionID', sessionID);
      appendMessage("How can I help you today?", "url", 'response');
    }

    console.log('Session ID:', sessionID);
  });

  closeButton.addEventListener('click', function () {
    chatContainer.style.display = 'none';
    chatCircle.style.display = 'flex';
    chatWidget.style.boxShadow = "0px 0 0 #fff";
    chatWidget.style.height = "0";
    chatWidget.style.border = "0 solid grey";
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
          <div class="response-content">
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
        setTimeout(function () {
          // Your code to be executed after the delay
          chatMessages.removeChild(typingIndicator);
          appendMessage("Please ask again", "url", 'response');
        }, 4000);
        // Remove the typing indicator and append a default response
      });
  }

  function appendMessage(message, url, type) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container'); // New container class

    // Create the message avatar element
    const avatarElement = document.createElement('div');
    avatarElement.classList.add('message-avatar');
    avatarElement.textContent = type === 'user' ? 'G' : 'AI';

    // Create a container for label and message text
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('message-content');

    // Create the guest or AI label
    const labelElement = document.createElement('div');
    labelElement.classList.add('message-label');
    labelElement.textContent = type === 'user' ? 'Guest' : 'AI';

    // Append the label to the content container
    // contentContainer.appendChild(labelElement);

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
      // messageContainer.appendChild(avatarElement);
      contentContainer.classList.add('message-content'); // Add .message-content class for user messages
    } else {
      // messageContainer.insertBefore(avatarElement, contentContainer);
      contentContainer.classList.remove('message-content');
      contentContainer.classList.add('response-content'); // Add .response-content class for AI messages
      // avatarElement.classList.remove('message-avatar');
      // avatarElement.classList.add('response-avatar'); // Add .response-avatar class for AI messages
      messageElement.classList.remove('message-text');
      messageElement.classList.add('response-text'); // Add .response-text class for AI messages
    }

    // Apply the type-specific class for styling
    messageContainer.classList.add(type === 'response' ? 'response' : 'user');

    chatMessages.appendChild(messageContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
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
    const message = document.getElementById('text-area').value.trim();
    if (message !== '') {
      sendMessage(message); // Call your message sending function
      document.getElementById('text-area').value = ''; // Clear the input
    }
  });

  document.getElementById('text-area').addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const message = document.getElementById('text-area').value.trim();
      if (message !== '') {
        sendMessage(message); // Call your message sending function
        document.getElementById('text-area').value = ''; // Clear the input
      }
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
      session_id: sessionID,
      namespace_id: companyId,
      account_id: accountId
    };

    const typingIndicatorSend = document.createElement('div');
    typingIndicatorSend.classList.add('message-container', 'response'); // Add classes for styling
    typingIndicatorSend.innerHTML = `
          <div class="response-content">
              <div class="response-text">
                  <div class="typing-container">
                      <div class="dot-pulse"></div>
                  </div>
              </div>
          </div>
          
      `;
    chatMessages.appendChild(typingIndicatorSend);


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
        chatMessages.removeChild(typingIndicator);

        appendMessage("Thank you for your contact information, someone will reach out to you shortly. In the meantime is there anything else I can help with?", "url", 'response');
      })
      .catch(error => {
        // Handle any errors that occur during the API request
        chatMessages.removeChild(typingIndicator);
        appendMessage("We were unable to send your information. Please check you information is correct and submt again", "url", 'response');
        console.error('Error:', error);
      });

    console.log(name)
    console.log(phone)
    console.log(email)

    callBookingForm.style.display = 'none';
  });
});