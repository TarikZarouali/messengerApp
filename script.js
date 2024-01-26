const toggleButton = document.querySelector(".dark-light");
const colors = document.querySelectorAll(".color");
const msgInput = document.querySelector("#messageInput");
var i = 0;

/**
 * Adds click event listeners to color elements, allowing users to change the theme.
 *
 * This function iterates through the provided color elements, adds a click event listener
 * to each, and updates the page theme accordingly. The selected color is visually highlighted
 * by adding the "selected" class.
 *
 * @param {NodeList} colors 
 */
colors.forEach((color) => {
  color.addEventListener("click", (e) => {
      // Remove "selected" class from all color elements
      colors.forEach((c) => c.classList.remove("selected"));

      // Get the data-color attribute to determine the selected theme
      const theme = color.getAttribute("data-color");

      // Set the page theme using the data-theme attribute on the body
      document.body.setAttribute("data-theme", theme);

      // Add the "selected" class to the clicked color element
      color.classList.add("selected");
  });
});

/**
 * Formats the given time of day into a human-friendly format.
 *
 * @param {number} hours - The hours component of the time of day, in 24-hour format.
 * @param {number} minutes - The minutes component of the time of day.
 * @returns {string} The formatted time of day.
 */
function formatTime(hours, minutes) {
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}


/**
 * Adds a click event listener to a toggle button, allowing users to toggle between light and dark modes.
 **/
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});


// Function to fetch existing chats from the server
/**
 * Fetches chats from the server
 * @returns {Promise<Chat[]>} an array of chats
 */
async function fetchChats() {
  const call = await fetch("ajax.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      scope: "chat",
      action: "getChats",
    }),
  });
  const response = await call.json();
  if (response.status === "200") {
    // Assuming the server sends an array of chats
    return response.data;
  } else {
    throw new Error("Failed to fetch chats");
  }
}

/**
Fetches chats from the server
@returns {Promise<Chat[]>} an array of chats
 */
async function getChats() {
  const chatlist = await fetchChats();
  chatlist.forEach((chat) => {
    createChatElement(chat);
  });
}


//event listener to create a new chat element
/**
 * Adds an event listener to the 'msgInput' element, capturing the 'keypress' event.
 * If the pressed key is 'Enter', it invokes the 'handleUserMessage' function and clears the input field.
 */
msgInput.addEventListener("keypress", (event) => {
  // Check if the pressed key is 'Enter'
  if (event.key === "Enter") {
    // Invoke the 'handleUserMessage' function to handle the user's input
    handleUserMessage();

    // Clear the value of the 'msgInput' field after processing the user's message
    msgInput.value = "";
  }
});



/**
 * Handles user messages by capturing the input value, trimming it, and displaying the message.
 */
function handleUserMessage() {
  // Get the input value from the message input field
  const inputValue = msgInput.value.trim();

  // Check if the input value is not empty
  if (inputValue !== "") {
    // Display the user's message using the displayOwnerMessage function
    displayOwnerMessage(inputValue);
  } else {
    // If the input value is empty, do nothing and return
    return;
  }
}


/**
 * Creates a chat element for the given chat
 * @param {Chat} chat - the chat object
 */
function displayOwnerMessage(inputValue) {
  // Create chat message container
  const chatMsg = document.createElement("div");
  chatMsg.classList.add("chat-msg", "owner");

  // Create profile section
  const chatProfile = document.createElement("div");
  chatProfile.classList.add("chat-msg-profile");

  // Create profile image
  const chatImg = document.createElement("img");
  chatImg.classList.add("chat-msg-img");
  chatImg.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png";
  chatImg.alt = "";

  // Create date section
  const chatDate = document.createElement("div");
  chatDate.classList.add("chat-msg-date");
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  chatDate.textContent = `Message seen ${formatTime(hours, minutes)}`;

  // Append image and date to profile section
  chatProfile.appendChild(chatImg);
  chatProfile.appendChild(chatDate);

  // Create content section
  const chatContent = document.createElement("div");
  chatContent.classList.add("chat-msg-content");

  // Create text section and set content
  const chatText = document.createElement("div");
  chatText.classList.add("chat-msg-text-owner");
  chatText.textContent = inputValue;

  // Append text to content section
  chatContent.appendChild(chatText);

  // Append profile and content sections to chat message container
  chatMsg.appendChild(chatProfile);
  chatMsg.appendChild(chatContent);

  // Append the chat message to the desired container
  const chatContainer = document.querySelector(".chat-area-main"); // Replace with the actual container selector
  chatContainer.appendChild(chatMsg);
  const chatId = localStorage.getItem("chatId");
  const messageOwner = "owner";

  sendMessage(inputValue, messageOwner, chatId);
  setTimeout(displayBotMessage, 3000);
}

/**
 * Creates a chat element for the given chat
 * @param {Chat} chat - the chat object
 */
function displayBotMessage() {
  // Create chat message container
  const chatMsg = document.createElement("div");
  chatMsg.classList.add("chat-msg", "bot");

  // Create profile section
  const chatProfile = document.createElement("div");
  chatProfile.classList.add("chat-msg-profile");

  // Create profile image
  const chatImg = document.createElement("img");
  chatImg.classList.add("chat-msg-img");
  chatImg.src ="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png";
  chatImg.alt = "";

  // Create date section
  const chatDate = document.createElement("div");
  chatDate.classList.add("chat-msg-date");
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  chatDate.textContent = `Message seen ${formatTime(hours, minutes)}`;

  // Append image and date to profile section
  chatProfile.appendChild(chatImg);
  chatProfile.appendChild(chatDate);

  // Create content section
  const chatContent = document.createElement("div");
  chatContent.classList.add("chat-msg-content");

  // Create text section and set content
  const chatText = document.createElement("div");
  chatText.classList.add("chat-msg-text-bot");
  chatText.textContent = Fake[i];

  // Append text to content section
  chatContent.appendChild(chatText);

  // Append profile and content sections to chat message container
  chatMsg.appendChild(chatProfile);
  chatMsg.appendChild(chatContent);

  // Append the chat message to the desired container
  const chatContainer = document.querySelector(".chat-area-main"); // Replace with the actual container selector
  chatContainer.appendChild(chatMsg);
  i++;
  if (i >= Fake.length) {
    i = 0;
  }
  const message = chatText.textContent;

  messageOwner = "bot";
  const chatId = localStorage.getItem("chatId");
  sendMessage(message, messageOwner, chatId);
}

//array for Fake messages
var Fake = [
  "Hi there, I'm Fabio and you?",
  "Nice to meet you",
  "How are you?",
  "Not too bad, thanks",
  "What do you do?",
  "That's awesome",
  "Codepen is a nice place to stay",
  "I think you're a nice person",
  "Why do you think that?",
  "Can you explain?",
  "Anyway I've gotta go now",
  "It was a pleasure chat with you",
  "Time to make a new codepen",
  "Bye",
  ":)",
];

/**
 * Creates a chat element for the given chat
 * @param {Chat} chat - the chat object
 */
function createChatElement(chat) {
  const conversationArea = document.querySelector(".conversation-area");
  const newChat = document.createElement("div");
  newChat.classList.add("msg", "js-chat", `js-chat-${chat.chatId}`);

  // Add a line to remove the "active" class from all chat elements
  document.querySelectorAll(".js-chat").forEach((chatElement) => {
    chatElement.classList.remove("active");
  });
  const chatId = chat.chatId;
  newChat.onclick = function () {
    document.querySelectorAll(".js-chat").forEach((chatElement) => {
      chatElement.classList.remove("active");
    });

    localStorage.setItem("chatId", chatId);

    newChat.classList.add("active");

    drawMessages(chatId);
  };

  const chatProfile = document.createElement("div");
  chatProfile.classList.add("msg-profile", "group");

  const detail = document.createElement("div");
  detail.classList.add("msg-detail");

  const username = document.createElement("div");
  username.classList.add("msg-username");
  username.textContent = chat.chatName;

  const content = document.createElement("div");
  content.classList.add("msg-content");
  content.textContent = "Hello there! I am using ChatApp.";

  detail.appendChild(username);
  detail.appendChild(content);

  // newChat.appendChild(img);
  newChat.appendChild(chatProfile);
  newChat.appendChild(detail);

  conversationArea.insertBefore(newChat, conversationArea.firstChild);
}
getChats();


// Send a message to the server to upload a new message
/**
 * Sends a message to the server to upload a new message
 * @param {string} message - The message content to be sent
 * @param {string} messageOwner - The owner of the message, either "owner" or "bot"
 * @param {number} chatId - The ID of the chat the message is associated with
 */
async function sendMessage(message, messageOwner, chatId) {
  const call = await fetch("ajax.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      scope: "messages",
      action: "uploadMessage",
      messageContent: message,
      chatId: chatId,
      messageOwner: messageOwner,
    }),
  });
  const response = await call.json();

  if (response.status === 200) {
  } else {
    console.error("Error sending message:", response.message);
  }
}


// Send a message to the server to get messages
async function drawMessages(chatId) {
  const chatContainer = document.querySelector(".chat-area-main");
  chatContainer.innerHTML = "";
  try {
    const call = await fetch("ajax.php", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        scope: "messages",
        action: "getMessage",
        chatId: chatId,
      }),
    });
    const response = await call.json();
    if (response.status === 200) {
      var allChatMsg = document.querySelectorAll(".chat-msg");
      if (allChatMsg[0]) {
        allChatMsg.forEach(function (chatMsg) {
          chatMsg.remove();
        });
      }

      const chatArea = document.querySelector(".chat-area");
      const chatAreaMain = chatArea.querySelector(".chat-area-main");
      const chatAreaFooter = chatArea.querySelector(".chat-area-footer");
      

      response.data.forEach(function (messageData) {
        const chatTitle = document.querySelector(".chat-area-title");
        chatTitle.textContent = messageData.chatName;

        if (messageData.messageOwner == "owner") {
          const ownerMsgDiv = document.createElement("div");
          ownerMsgDiv.className = "chat-msg owner";

          const ownerMsgProfile = document.createElement("div");
          ownerMsgProfile.className = "chat-msg-profile";

          const ownerProfileImg = document.createElement("img");
          ownerProfileImg.className = "chat-msg-img";
          ownerProfileImg.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png";

          const chatMsgDate = document.createElement("div");
          chatMsgDate.classList.add("chat-msg-date");
          // Get the current time
          const currentTime = new Date();
          const hours = currentTime.getHours();
          const minutes = currentTime.getMinutes();

          // Format the time as 'h:mm am/pm'
          const formattedTime = formatTime(hours, minutes);

          // Set the text content with the formatted time
          chatMsgDate.textContent = `Message send ${formattedTime}`;

          const ownerMsgContent = document.createElement("div");
          ownerMsgContent.className = "msg-content";

          const newMessage = document.createElement("div");
          newMessage.className = "chat-msg-text-owner";
          newMessage.textContent = messageData.messageContent;

          chatArea.appendChild(chatAreaMain);
          chatAreaMain.appendChild(ownerMsgDiv);
          ownerMsgDiv.scrollIntoView({ behavior: "smooth", block: "end" });
          ownerMsgDiv.appendChild(ownerMsgProfile);
          ownerMsgProfile.appendChild(ownerProfileImg);
          ownerMsgProfile.appendChild(chatMsgDate);
          ownerMsgDiv.appendChild(ownerMsgContent);
          ownerMsgContent.appendChild(newMessage);
        } else {

          const botMsgDiv = document.createElement("div");
          botMsgDiv.className = "chat-msg";

          const botMsgProfile = document.createElement("div");
          botMsgProfile.className = "chat-msg-profile";

          const botProfileImg = document.createElement("img");
          botProfileImg.className = "chat-msg-img";
          botProfileImg.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg";

          const chatMsgDate = document.createElement("div");
          chatMsgDate.classList.add("chat-msg-date");
          // Assume messageData.messageCreateDate is a Unix timestamp
          const unixTimestamp = messageData.messageCreateDate;

          // Convert Unix timestamp to JavaScript Date object
          const messageDate = new Date(unixTimestamp * 1000);

          // Get hours and minutes from the Date object
          const hours = messageDate.getHours();
          const minutes = messageDate.getMinutes();

          // Format the time as 'h:mm am/pm'
          const formattedTime = formatTime(hours, minutes);

          // Set the text content with the formatted time
          chatMsgDate.textContent = `Message send ${formattedTime}`;

          const botMsgContent = document.createElement("div");
          botMsgContent.className = "chat-msg-content";

          const newMessage = document.createElement("div");
          newMessage.className = "chat-msg-text-bot";
          newMessage.textContent = messageData.messageContent;

          chatArea.appendChild(chatAreaMain);
          chatAreaMain.appendChild(botMsgDiv);
          botMsgDiv.scrollIntoView({ behavior: "smooth", block: "end" });
          botMsgDiv.appendChild(botMsgProfile);
          botMsgProfile.appendChild(botProfileImg);
          botMsgProfile.appendChild(chatMsgDate);
          botMsgDiv.appendChild(botMsgContent);
          botMsgContent.appendChild(newMessage);
        }
      });
      chatArea.appendChild(chatAreaFooter);
    } else {
      console.error("Error getting users:", response.message);
    }
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}

var modal = document.getElementById("myModal");

var modalButton = document.getElementById("modalButton");

var span = document.getElementsByClassName("close")[0];

modalButton.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

