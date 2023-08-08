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
        appendMessage(message, "url", 'user');
        chatMessages.appendChild(messageElement);
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
        messageContainer.classList.add('message-container'); // New container class
        
        // Create the message avatar element
        const avatarElement = document.createElement('div');
        avatarElement.classList.add('message-avatar');
        avatarElement.textContent = type === 'user' ? 'G' : 'AI'; // Use 'Guest' for user messages
        
        // Append the avatar to the new container
        messageContainer.appendChild(avatarElement);
    
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
