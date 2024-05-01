const jwt = require('jsonwebtoken');

//Generar el token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '60m' });
};
//Validar el token
const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
module.exports = { generateToken, verifyJwt };
