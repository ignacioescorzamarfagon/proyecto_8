const mongoose = require('mongoose');
const consoleSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    imagen: { type: String, required: true },
    precio: { type: Number, required: true },
    juegos: [{ type: mongoose.Types.ObjectId, ref: 'games', required: false }]
  },
  { timestamps: true, collection: 'consoles' }
);

const Console = mongoose.model('consoles', consoleSchema, 'consoles');
module.exports = Console;
