function validarParametros(req, res, next) {
    const limit = parseInt(req.query.limit);
    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({ error: 'El parámetro "limit" debe ser un número positivo' });
    }
  
    next();
  }
  
  module.exports = validarParametros;
  