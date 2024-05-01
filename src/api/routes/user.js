const upload = require('../../middlewares/file');
const { isAuth, isAdmin } = require('../../middlewares/auth');
const {
  register,
  login,
  deleteUser,
  getUsers
} = require('../controllers/user');
const usersRoutes = require('express').Router();
usersRoutes.get('/', getUsers);
usersRoutes.post(
  '/register',
  [isAdmin],
  upload.single('imagenPerfil'),
  register
);
usersRoutes.post('/login', login);
usersRoutes.delete('/:id', [isAdmin], deleteUser);
module.exports = usersRoutes;
