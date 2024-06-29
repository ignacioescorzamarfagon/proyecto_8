//const upload = require('../../middlewares/file');
const createUploadMiddleware = require('../../middlewares/file');
const upload = createUploadMiddleware('users');
const { isAuth, isAdmin } = require('../../middlewares/auth');
const {
  register,
  login,
  deleteUser,
  getUsers,
  putUser
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
usersRoutes.put('/:id', [isAdmin], upload.single('imagenPerfil'), putUser);
usersRoutes.delete('/:id', [isAdmin], deleteUser);
module.exports = usersRoutes;
