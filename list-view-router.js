const express = require('express');
const listViewRouter = express.Router();
const validarParametros = require('./validarParametros');

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

listViewRouter.get('/obtener/:id', (req, res) => {
  const id = req.params.id
  const task = taskList.filter(task => task.id ==id)
  res.send(task)
})

  listViewRouter.get('/completas', (req, res) => {
    console.log('GET request to /completas');
    const completedTasks = taskList.filter(task => task.isCompleted);
    res.json(completedTasks);
  });


  listViewRouter.get('/incompletas',  (req, res) => {
    console.log('GET request to /incompletas');
    const incompleteTasks = taskList.filter(task => !task.isCompleted);
    res.json(incompleteTasks);
  });

  module.exports = listViewRouter;
