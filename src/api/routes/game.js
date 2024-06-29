//const upload = require('../../middlewares/file');
const createUploadMiddleware = require('../../middlewares/file');
const upload = createUploadMiddleware('users');
const { isAuth, isAdmin } = require('../../middlewares/auth');
const {
  getGames,
  getGamesById,
  getGamesByCategory,
  getGamesByPrice,
  postGame,
  putGame,
  deleteGame
} = require('../controllers/game');

const gamesRouter = require('express').Router();

//Ordenamos de mayor a menor restricción las rutas.
gamesRouter.get('/precio/:precio', [isAuth], getGamesByPrice);
gamesRouter.get('/categoria/:categoria', [isAuth], getGamesByCategory);
gamesRouter.get('/:id', [isAuth], getGamesById);
gamesRouter.get('/', [isAuth], getGames);
gamesRouter.post('/', [isAdmin], upload.single('imagen'), postGame);
gamesRouter.put('/:id', [isAdmin], upload.single('imagen'), putGame);
//gamesRouter.put('/:id', [isAdmin], putGame);
gamesRouter.delete('/:id', [isAdmin], deleteGame);

module.exports = gamesRouter;
