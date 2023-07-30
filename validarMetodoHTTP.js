function validarMetodoHTTP(req, res, next) {
    const metodosPermitidos = ['GET', 'POST', 'PUT', 'DELETE']; 
  
    if (!metodosPermitidos.includes(req.method)) {
      return res.status(405).json({ error: 'Método HTTP no permitido para esta ruta' });
    }
  
    next();
  }
  
module.exports = validarMetodoHTTP;
  
  //middleware a nivel de aplicacion, no maneja rutas