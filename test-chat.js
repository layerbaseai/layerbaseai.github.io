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

    const avatar = "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fa115450d611a5d9e5adccb79c5cdadc6.cdn.bubble.io%2Ff1692125393551x158245438633071400%2FOmnibot%2520Logo.002.jpeg?w=128&h=128&auto=compress&dpr=1&fit=max"

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
            namespace_id: "1roofsolution",
            layer_id: "1roofsolution",
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

    document.getElementById('text-area').addEventListener('keydown', function(event) {        
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

                appendMessage("Thank you for your contact information, someone will reach out to you shortly. In the meantime is there anything else I can help with?", "url", 'response');
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
