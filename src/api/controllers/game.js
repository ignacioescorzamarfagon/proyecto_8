const { deleteFile } = require('../../utils/deleteFile');
const Game = require('../models/game');

const getGames = async (req, res, next) => {
  try {
    const games = await Game.find();
    return res.status(200).json(games);
  } catch (error) {
    return res.status(400).json('Error al obtener los juegos ' + error);
  }
};

const getGamesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id);
    return res.status(200).json(game);
  } catch (error) {
    return res.status(400).json('Error al obtener el juego por id:  ' + error);
  }
};
const getGamesByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const games = await Game.find({ categoria: categoria });
    return res.status(200).json(games);
  } catch (error) {
    return res
      .status(400)
      .json('Error al obtener el juego por categoría ' + error);
  }
};

const getGamesByPrice = async (req, res, next) => {
  try {
    const { precio } = req.params;
    const games = await Game.find({ precio: { $lt: precio } });
    return res.status(200).json(games);
  } catch (error) {
    return res
      .status(400)
      .json('Error al obtener el juego por precio: ' + error);
  }
};

const postGame = async (req, res, next) => {
  try {
    const newGame = new Game(req.body);
    if (req.file) {
      newGame.imagen = req.file.path;
    }
    const gameSaved = await newGame.save();
    return res.status(200).json(gameSaved);
  } catch (error) {
    return res.status(400).json('Error al crea un juego nuevo: ' + error);
  }
};

const putGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newGame = new Game(req.body);
    newGame._id = id;
    const gameUpdated = await Game.findByIdAndUpdate(id, newGame, {
      new: true
    });
    return res.status(200).json(gameUpdated);
  } catch (error) {
    return res.status(400).json('Error al actualizar un juego: ' + error);
  }
};

const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gameDeleted = await Game.findByIdAndDelete(id);
    deleteFile(gameDeleted.imagen);
    return res.status(200).json(gameDeleted);
  } catch (error) {
    return res.status(400).json('Error al eliminar un juego: ' + error);
  }
};

module.exports = {
  getGames,
  getGamesById,
  getGamesByCategory,
  getGamesByPrice,
  postGame,
  putGame,
  deleteGame
};
