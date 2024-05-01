const User = require('../api/models/user');
const { verifyJwt } = require('../utils/jwt');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json('No estás autorizado');
    }
    const parsedToken = token.replace('Bearer ', '');

    const { id } = verifyJwt(parsedToken);

    const user = await User.findById(id);

    req.nombreUsuario = user;
    user.contrasenia = null;

    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json('No estás autorizado');
    }

    const parsedToken = token.replace('Bearer ', '');
    const { id } = verifyJwt(parsedToken);
    const user = await User.findById(id);

    if (user.rol === 'admin') {
      req.nombreUsuario = user.nombreUsuario;
      user.contrasenia = null;
      next();
    } else {
      return res.status(400).json('No eres admin');
    }
  } catch (error) {
    return res.status(400).json('Error: ' + error);
  }
};

module.exports = { isAuth, isAdmin };
