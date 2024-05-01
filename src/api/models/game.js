const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    imagen: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: {
      type: String,
      required: true,
      enum: [
        'puzzles',
        'aventuras',
        'miedos',
        'coches',
        'deportes',
        'plataformas',
        'rol'
      ]
    }
  },
  { timestamps: true, collection: 'games' }
);

const Game = mongoose.model('games', gameSchema, 'games');
module.exports = Game;
