const socket = io();
const token = prompt('Insert token');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

socket.on('message', (post) => {
  appendMessage(post);
});
socket.on('notification', (notification) => {
  alert(notification.message);
});

messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = messageInput.value;

  // send message to server
  await fetch('http://localhost:5000/api/v1/chat/message', {
    method: 'Post',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
    accept: '*/*',
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'fail') return;
      messageInput.value = '';
    })
    .catch((err) => {
      console.error(err);
    });
});

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = `${message.userName}: ${message.message}`;
  messageContainer.append(messageElement);
}
function appendAllMessages(messages) {
  messages.map((message) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = `${message.userName}: ${message.message}`;
    messageContainer.append(messageElement);
  });
}

fetch('http://localhost:5000/api/v1/chat/messages', {
  method: 'Get',
  credentials: 'include',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  accept: '*/*',
})
  .then((res) => res.json())
  .then((data) => {
    if (data.status === 'fail') return data.message;
    return appendAllMessages(data.data.messages);
  });
