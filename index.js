const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');


app.use(bodyParser.json());

app.use('/tareas', listViewRouter);

app.use('/tareas', listEditRouter);

const taskList = [
  {
    "id": "123",
    "isCompleted": false,
    "description": "Walk the dog"
  },
  {
    "id": "789",
    "isCompleted": true,
    "description": "Throw trash"
  },
  {
    "id": "987",
    "isCompleted": false,
    "description": "Go to the gym"
  },
  
];

app.get('/tareas', (req, res) => {
  res.json(taskList);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor running on http://localhost:${port}`);
});
