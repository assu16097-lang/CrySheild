console.log("CHATBOT JS LOADED");

const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");
const typing = document.getElementById("typing");
const clearChat = document.getElementById("clearChat");

console.log("chatForm:", chatForm);
console.log("messageInput:", messageInput);
console.log("chatMessages:", chatMessages);

function addMessage(message, type) {

    const messageContainer = document.createElement("div");

    messageContainer.className =
        "chat-message " + type;

    const bubble = document.createElement("div");

    bubble.className = "message-bubble";

    bubble.textContent = message;

    messageContainer.appendChild(bubble);

    chatMessages.appendChild(messageContainer);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


// ==========================================
// SEND MESSAGE
// ==========================================

chatForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    console.log("SEND BUTTON CLICKED");

    const message =
        messageInput.value.trim();

    if (message === "") {

        console.log("Message is empty");

        return;
    }

    console.log("User message:", message);

    // Show user message
    addMessage(message, "user");

    // Clear input
    messageInput.value = "";

    // Show typing
    typing.classList.remove("hidden");

    try {

        console.log("Sending request to /api/chat...");

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        console.log(
            "Server response status:",
            response.status
        );

        const data = await response.json();

        console.log(
            "Server response:",
            data
        );

        typing.classList.add("hidden");

        if (data.success) {

            addMessage(
                data.reply,
                "ai"
            );

        } else {

            addMessage(
                data.reply ||
                "Something went wrong.",
                "ai"
            );

        }

    }

    catch (error) {

        console.error(
            "CHATBOT ERROR:",
            error
        );

        typing.classList.add("hidden");

        addMessage(
            "Cannot connect to the server. Make sure npm start is running.",
            "ai"
        );

    }

});


// ==========================================
// CLEAR CHAT
// ==========================================

clearChat.addEventListener("click", function () {

    chatMessages.innerHTML = "";

    addMessage(
        "Hello! 👋 I'm CyberShield AI. Ask me anything about cybersecurity.",
        "ai"
    );

});


// ==========================================
// SUGGESTION BUTTONS
// ==========================================

const suggestions =
    document.querySelectorAll(".suggestion");

suggestions.forEach(function (button) {

    button.addEventListener("click", function () {

        messageInput.value =
            button.textContent.trim();

        messageInput.focus();

    });

});