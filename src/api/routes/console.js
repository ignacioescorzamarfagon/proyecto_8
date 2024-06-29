//const upload = require('../../middlewares/file');
const createUploadMiddleware = require('../../middlewares/file');
const upload = createUploadMiddleware('users');
const { isAuth, isAdmin } = require('../../middlewares/auth');
const {
  getConsoles,
  getConsolesById,
  getConsolesByPrice,
  postConsole,
  putConsole,
  deleteConsole
} = require('../controllers/console');

const consolesRouter = require('express').Router();

//Ordenamos de mayor a menor restricción las rutas.
consolesRouter.get('/precio/:precio', [isAuth], getConsolesByPrice);
consolesRouter.get('/:id', [isAuth], getConsolesById);
consolesRouter.get('/', [isAuth], getConsoles);
consolesRouter.post('/', [isAdmin], upload.single('imagen'), postConsole);
consolesRouter.put('/:id', [isAdmin], upload.single('imagen'), putConsole);
//consolesRouter.put('/:id', [isAdmin], putConsole);
consolesRouter.delete('/:id', [isAdmin], deleteConsole);

module.exports = consolesRouter;
