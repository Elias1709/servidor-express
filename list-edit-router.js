const express = require('express');
const listEditRouter = express.Router();
const errorHandler = require('./error-handler');

listEditRouter.use(errorHandler);

let taskList = [
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

listEditRouter.post('/crear-tarea', (req, res) => {
  const { id, isCompleted, description } = req.body;
  const newTask = { id, isCompleted, description };
  taskList.push(newTask);
  res.json({ message: 'Tarea creada exitosamente', task: newTask });
});

listEditRouter.delete('/eliminar-tarea/:id', (req, res) => {
  const taskId = req.params.id;
  taskList = taskList.filter(task => task.id !== taskId);
  res.json({ message: 'Tarea eliminada exitosamente', taskId });
});

listEditRouter.put('/actualizar-tarea/:id', (req, res) => {
  const taskId = req.params.id;
  const { isCompleted, description } = req.body;
  taskList = taskList.map(task => {
    if (task.id === taskId) {
      return {
        ...task,
        isCompleted: isCompleted !== undefined ? isCompleted : task.isCompleted,
        description: description !== undefined ? description : task.description,
      };
    }
    return task;
  });
  res.json({ message: 'Tarea actualizada exitosamente', taskId });
});

module.exports = listEditRouter;
