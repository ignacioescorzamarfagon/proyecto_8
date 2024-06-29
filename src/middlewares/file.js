const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

/*
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'proyecto8',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
  }
});

const upload = multer({ storage });
*/

const createUploadMiddleware = (folder) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder,
      allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
    }
  });

  return multer({ storage });
};

//module.exports = upload;
module.exports = createUploadMiddleware;
