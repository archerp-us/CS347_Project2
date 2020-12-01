const username = prompt('Please enter your username');

const sendButton = document.getElementById('send-button');
const deleteButton = document.getElementById('delete-button');
const messagesRoot = document.getElementById('messages-root');
const newMessageBox = document.getElementById('new-message-box');

let nextId = 0;
const domain = 'localhost';
const port = 3003;
const url = `http://${domain}:${port}`;

function sync() {
  fetch(`${url}/messages/${nextId}`)
    .then(response => response.json())
    .then(data => {
      nextId += data.length;
      for (let message of data) {
        const p = document.createElement('p');
        p.innerHTML = `<b>${message.username}</b>: ${message.message}`;
        messagesRoot.appendChild(p);
      }
    });
}

setInterval(sync, 1000);

newMessageBox.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    send();
  }
});
sendButton.addEventListener('click', send);

function send() {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, message: newMessageBox.value}),
  }
  fetch(`${url}/message`, options)
    .then(response => {
      newMessageBox.value = '';
    });
}

deleteButton.addEventListener('click', onDelete);
function onDelete() {

  while(messagesRoot.childElementCount > 1){
    messagesRoot.removeChild(messagesRoot.childNodes[1]);
  }

}

