document.addEventListener('DOMContentLoaded', function() {
  const baseURL = 'https://mybotdevapi.customerdemourl.com';

    document.head.insertAdjacentHTML('beforeend', '<link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css" rel="stylesheet">');
  
    // Session and Conversation management
    const sessionId = getSessionId();

    // Check for an existing session ID or generate a new one
    function getSessionId() {
      let sessionId = sessionStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = generateUniqueId();
        sessionStorage.setItem('sessionId', sessionId);
      }
      return sessionId;
    }

    // Generate a unique ID (simplified version for demonstration)
    function generateUniqueId() {
      return 'id_' + Math.random().toString(36).substr(2, 9);
    }

    // Inject the CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .hidden {
          display: none;
        }
        #chat-widget-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          flex-direction: column;
        }
        #chat-popup {
          height: 70vh;
          max-height: 70vh;
          transition: all 0.3s;
          overflow: hidden;
          border: 1px solid #1890ff;
        }
        .bg-blue-500 { 
          background-color: #1890ff;
        }
        #chat-messages{
          position: relative;
        }
        .typing-indicator {
          bottom: 5px;
          left: 50px;
          width: 10px;
          aspect-ratio: 1;
          border-radius: 50%;
          animation: a1 1s infinite linear alternate;
        }
        @keyframes a1 {
          0% {
            box-shadow: 20px 0 #3c82f6, -20px 0 #0002;
            background: #3c82f6;
          }
          33% {
              box-shadow: 20px 0 #3c82f6, -20px 0 #0002;
              background: #0002;
          }
          66% {
              box-shadow: 20px 0 #0002, -20px 0 #3c82f6;
              background: #0002;
          }
          100% {
              box-shadow: 20px 0 #0002, -20px 0 #3c82f6;
              background: #3c82f6;
          }
        }
        @media (max-width: 768px) {
          #chat-popup {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            max-height: 100%;
            border-radius: 0;
          }
        }
       `;
  
    document.head.appendChild(style);
  
    // Create chat widget container
    const chatWidgetContainer = document.createElement('div');
    chatWidgetContainer.id = 'chat-widget-container';
    document.body.appendChild(chatWidgetContainer);
    
    // Inject the HTML
    chatWidgetContainer.innerHTML = `
      <div id="chat-bubble" className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer text-3xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
      <div id="chat-popup" className="hidden absolute bottom-20 right-0 w-96 bg-white rounded-md shadow-md flex flex-col transition-all text-sm">
        <div id="chat-header" className="flex justify-between items-center p-4 bg-blue-500 text-white rounded-t-md">
          <h3 className="m-0 text-lg">Chat Widget by OrionEsolutions</h3>
          <button id="close-popup" className="bg-transparent border-none text-white cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div id="chat-messages" className="flex-1 p-4 overflow-y-auto"></div>
        <div id="chat-input-container" className="p-4 border-t border-gray-200">
          <div className="flex space-x-4 items-center">
            <input type="text" id="chat-input" className="flex-1 border border-gray-300 rounded-md px-4 py-2 outline-none w-3/4" placeholder="Type your message...">
            <button id="chat-submit" className="bg-blue-500 text-white rounded-md px-4 py-2 cursor-pointer">Send</button>
          </div>
          <div className="flex text-center text-xs pt-4">
            <span className="flex-1">Prompted by <a href="https://www.instagram.com/orionesolutions?igsh=cHM5dXV2YTR6dnp2" target="_blank" className="text-indigo-600">@OrionEsolutions</a></span>
          </div>
        </div>
      </div>
    `;
    
  
    // Add event listeners
    const chatInput = document.getElementById('chat-input');
    const chatSubmit = document.getElementById('chat-submit');
    const chatMessages = document.getElementById('chat-messages');
    const chatBubble = document.getElementById('chat-bubble');
    const chatPopup = document.getElementById('chat-popup');
    const closePopup = document.getElementById('close-popup');
    var typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';

    chatSubmit.addEventListener('click', function() {
      const message = chatInput.value.trim();
      if (!message) return;
      chatMessages.scrollTop = chatMessages.scrollHeight;
      chatInput.value = '';
      displayMessage(message, 'human');
      sendMessage(message)
    });
  
    chatInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        chatSubmit.click();
      }
    });
  
    chatBubble.addEventListener('click', function() {
      togglePopup();
    });
  
    closePopup.addEventListener('click', function() {
      togglePopup();
    });
  
    function togglePopup() {
      const chatPopup = document.getElementById('chat-popup');
      chatPopup.classList.toggle('hidden');
      if (!chatPopup.classList.contains('hidden')) {
        document.getElementById('chat-input').focus();
        scrollChatToBottom()
      }
    }  
  
    function scrollChatToBottom() {
      const lastMessage = chatMessages.lastElementChild;
      if (lastMessage) {
        lastMessage.scrollIntoView();
      }
    }

    // Start a new conversation
    function startConversation(sessionId) {
      fetch(baseURL+'/api/chat/' + sessionId + '/widget', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        if(data.messages.length>0){
          data.messages.forEach((message,index) => {
            displayMessage(message.msg, message.type);
          });
        }
      })
      .catch(error => console.error('Error:', error));
    }
    // Function to scroll chatMessages to the bottom


    // Send message
    function sendMessage(message) {
      fetch(baseURL+'/api/chat/widget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, message }),
      })
      .then(response => response.json())
      .then(data => {
        displayMessage(data.message, 'ai');
      })
      .catch(error => console.error('Error:', error));
    }

    // Display message in chat
    function displayMessage(message, type) {
      const messageElement = document.createElement('div');
      messageElement.className = type === 'human' ? 'flex justify-end mb-3' : 'flex mb-3';
      messageElement.innerHTML = `
        <div className="${type === 'human' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} rounded-lg py-2 px-4 max-w-[70%]">
          ${message}
        </div>
      `;
      chatMessages.appendChild(messageElement);
      type === 'human' ? chatMessages.appendChild(typingIndicator) : chatMessages.removeChild(typingIndicator);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    startConversation(sessionId);
  });