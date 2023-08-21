const express = require('express');
const listViewRouter = express.Router();

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

listViewRouter.get('/completas', (req, res) => {
    console.log('GET request to /completas');
    const completedTasks = taskList.filter(task => task.isCompleted);
    res.status(200).json(completedTasks);
  });


  listViewRouter.get('/incompletas', (req, res) => {
    console.log('GET request to /incompletas');
    const incompleteTasks = taskList.filter(task => !task.isCompleted);
    res.status(200).json(incompleteTasks);
  });

  listViewRouter.get('/buscar/:taskId', (req, res) => {
    console.log(`GET request to /buscar/${req.params.taskId}`);
    const taskId = req.params.taskId;
    const foundTask = taskList.find(task => task.id === taskId);
  
    if (foundTask) {
      res.status(200).json(foundTask);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  });

  module.exports = listViewRouter;

