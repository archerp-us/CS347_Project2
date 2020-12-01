const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3003;

const messages = [
  {
    username: 'Bot',
    message: 'Welcome.',
  },
];

app.post('/message', (request, response) => {
  messages.push({
    username: request.body.username,
    message: request.body.message,
  });
  response.send(':)');
});

app.get('/messages/:index', (request, response) => {
  response.send(messages.slice(request.params.index));
});

app.delete('/clear', (request, response) => {
  messages = messages.slice(0, 1);
  response.send(':)');
});

app.listen(port, () => {
  console.log(`Live on port ${port}!`);
});
