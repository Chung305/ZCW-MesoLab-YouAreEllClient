import MessageService from "./message-service.js";

let userId = "chung";
const messageService = new MessageService(userId);

window.addEventListener("load", function(){
    document.getElementById("greeting").innerHTML = `Welcome ${userId}!`;
    messageService.getAllMessages();

    function successCallback(response) {
      // This data comes from the resolve method
        console.log(response);
    }

    function errorCallback(response) {
     // This data comes from the reject method
        console.log(response);
    }
});
function populateMessages(messages){
    messages.forEach(messages => {
        addMessageToThread(messages);
    })
}

function populateThread(message){
    messages.forEach(message => {
        const messageListItem = document.createElement("LI"); 
        const userIdHeading = document.createElement("h3");
        const messageParagraph = document.createElement("p");
        const messageContent = document.document.createTextNode(message.message);
        const userIdContent = userIdContent = document.createTextNode(message.fromId);
        userIdHeading.appendChild(messageContent);
            messageParagraph.appendChild(messageContent);
            messageListItem.appendChild(userIdHeading).appendChild(messageParagraph);
        document.getElementById("message-list").appendChild(messageListItem);
    })
}

function createFormListener(){
    const form = document.getElementById("new-message-form");

    form.onsubmit = function (event) {
        // stop the regular form submission
        event.preventDefault();
        const data = {
            fromid: userId,
            message: form.message.value
        };

        messageService.createNewMessage(data)
            .then(successCallback, errorCallback);

        function successCallback(response) {
            // This data comes from the resolve method
            addMessageToThread(response);
        }

        function errorCallback(response) {
            // This data comes from the reject method
            console.log(response);
        }
    }
}

function addMessageToThread(message) {
    const messageListItem = document.createElement("LI");
    const userIdHeading = document.createElement("h3");
    const messageParagraph = document.createElement("p");
    const messageContent = document.createTextNode(message.message);
    const userIdContent = document.createTextNode(message.fromid);
    userIdHeading.appendChild(userIdContent);
    messageParagraph.appendChild(messageContent);
    messageListItem
        .appendChild(userIdHeading)
        .appendChild(messageParagraph);
    document.getElementById("message-list").appendChild(messageListItem);
}