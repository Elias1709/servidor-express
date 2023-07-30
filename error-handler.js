function errorHandler(req, res, next) {
    if (req.method === 'POST' && Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'El cuerpo de la solicitud no puede estar vacío' });
      }
    if (req.method === 'POST') {
      const { id, isCompleted, description } = req.body;
    if (!id || !description || typeof isCompleted !== 'boolean') {
        return res.status(400).json({ error: 'Información inválida o faltante para crear la tarea' });
      }
    }
  
    if (req.method === 'PUT') {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'El cuerpo de la solicitud PUT no puede estar vacío' });
      }
  
      const { isCompleted, description } = req.body;
      if (isCompleted !== undefined && typeof isCompleted !== 'boolean') {
        return res.status(400).json({ error: 'El atributo "isCompleted" debe ser un valor booleano' });
      }
  
      if (description && typeof description !== 'string') {
        return res.status(400).json({ error: 'El atributo "description" debe ser una cadena de texto' });
      }
    }
  
    next();
  }
  
  module.exports = errorHandler;
  
  