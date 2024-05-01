const mongoose = require('mongoose'); //Importo mongoose para trabajar con la BBDD

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('BBDD conectada');
  } catch (error) {
    console.log('Error al conectar a la BBDD ' + error);
  }
};

module.exports = { connectDB }; //Exporto la conexión a la BBDD
