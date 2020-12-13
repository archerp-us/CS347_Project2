const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');
const app = express();
app.use(cors());
app.use(express.json());
let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();
function rowToObject(row){
    return {
      year: row.year,
      month: row.month,
      day: row.day,
      message: row.message,
      id: row.id,

user: row.user,
      chatroom: row.chatroom,
    };
}
app.get('/messages/:chatroom/:id', (request, response) => {
    const query = 'SELECT year, month, day, message, id, user, chatroom, FROM h>
    const params = [request.params.chatroom, request.params.id];
    connection.query(query, params, (error, rows) => {
      response.send({
        messages: rows.map(rowToObject),
    });
  });
});
app.post('/messages', (request, response) => {
    const query = 'INSERT INTO memory(year, month, day, message, user, chatroom>
    const params = [request.body.year, request.body.month, request.body.day, re>
    connection.query(query, params, (error, result) => {
      response.send({
        ok: true,
        id: result.insertID,
    });
  });
});
app.patch('/messages/:id', (request, response) => {
    const query = 'UPDATE memory SET year = ?, month = ?, day = ?, message =?, >
    const params = [request.body.year, request.body.month, request.body.day, re>
    connection.query(query, params, (error, rows) => {
      response.send({
        ok: true,
    });
  });
});
app.delete('/messages/:user/:id', (request, response) => {
    const query = 'UPDATE memory SET is_deleted = 1, updated_at = CURRENT_TIMES>
    const params = [request.params.user, request.params.id];
    connection.query(query, params, (error, rows) => {

response.send({
        ok: true,
    });
  });
});
const port = 3443;
app.listen(port, () => {
  console.log(`We're live on port ${port}!`);
});