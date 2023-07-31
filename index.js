const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;
const validarMetodoHTTP = require('./validarMetodoHTTP');

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');


app.use(bodyParser.json());

app.use(validarMetodoHTTP);

app.use('/tareas', listViewRouter);

app.use('/tareas', listEditRouter);

const users = [
  { id: 1, username: 'usuario1', password: '1234' },
  { id: 2, username: 'usuario2', password: '9876' },
  
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

  res.json({ token });
});

function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.user = decoded;
    next();
  });
}

app.get('/ruta-protegida', verificarToken, (req, res) => {
  res.json({ message: 'Ruta protegida alcanzada', user: req.user });
});

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
