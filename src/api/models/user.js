const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    nombreUsuario: { type: String, trim: true, required: true, unique: true },
    contrasenia: { type: String, trim: true, required: true },
    anioNacimiento: { type: Number, trim: true, required: true },
    rol: { type: String, trim: true, required: true },
    imagenPerfil: { type: String, trim: true, required: true }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

//Encriptar contraseña
userSchema.pre('save', function () {
  this.contrasenia = bcrypt.hashSync(this.contrasenia, 10);
});
const User = mongoose.model('users', userSchema, 'users');

module.exports = User;
