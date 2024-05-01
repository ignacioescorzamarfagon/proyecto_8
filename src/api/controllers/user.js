const { deleteFile } = require('../../utils/deleteFile');
const { generateToken } = require('../../utils/jwt');
const User = require('../models/user');
const bcrypt = require('bcrypt');

//Registro del usuario
const register = async (req, res, next) => {
  try {
    //Creamos un usuario
    const newUser = new User({
      email: req.body.email,
      nombreUsuario: req.body.nombreUsuario,
      contrasenia: req.body.contrasenia,
      anioNacimiento: req.body.anioNacimiento,
      rol: req.body.rol,
      imagenPerfil: req.body.imagenPerfil
    });
    //Comprobamos si el email o el usuario están duplicados
    const emailDuplicated = await User.findOne({ email: req.body.email });
    const userDuplicated = await User.findOne({
      nombreUsuario: req.body.nombreUsuario
    });

    if (emailDuplicated) {
      return res.status(400).json('El email ya existe');
    } else if (userDuplicated) {
      return res.status(400).json('El usuario ya existe');
    }
    if (req.file) {
      newUser.imagenPerfil = req.file.path;
    }
    //Guardamos el usuario en la BBDD
    const userSaved = await newUser.save();

    return res.status(201).json(userSaved);
  } catch (error) {
    return res.status(400).json('El error es ' + error);
  }
};

//Loguear un usuario
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ nombreUsuario: req.body.nombreUsuario });
    if (user) {
      //Comparar contraseñas encriptadas
      if (bcrypt.compareSync(req.body.contrasenia, user.contrasenia)) {
        const token = generateToken(user.id);
        return res.status(200).json({ user, token });
      } else {
        return res.status(400).json('Usuario o contraseña incorrecto');
      }
    } else {
      return res.status(400).json('Usuario, email o contraseña incorrecto');
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

//Borrar usuario
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDeleted = await User.findByIdAndDelete(id);
    deleteFile(userDeleted.imagenPerfil);
    return res
      .status(200)
      .json({ mensaje: 'Se ha eliminado el usuario ', userDeleted });
  } catch (error) {
    return res.status(400).json(error);
  }
};

//Obtener usuarios
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { register, login, deleteUser, getUsers };
