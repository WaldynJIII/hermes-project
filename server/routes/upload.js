
require('dotenv').config();
const {Storage} = require('@google-cloud/storage');
const bucketName = 'hermes-jb';

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
});
const bucket = storage.bucket(bucketName);
function getPublicUrl (filename) {
    return `https://storage.googleapis.com/${bucketName}/${filename}`;
  }
  function sendUploadToGCS (req, res, next) {

    if (!req.file) {
      return next();
    }
  
   let gcsname = Date.now() + req.file.originalname;
    console.log('20 upload', gcsname)
    const file = bucket.file(gcsname);
  
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      },
      resumable: false
    });
  
    stream.on('error', (err) => {
      req.file.cloudStorageError = err;
      next(err);
    });
  
    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname
        console.log(gcsname)
      file.makePublic().then(() => {
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
      });
    });
 
    stream.end(req.file.buffer);
    return(gcsname)
  }
  const Multer = require('multer');
const multer = Multer({
  storage: Multer.MemoryStorage,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // no larger than 5mb
//   }
});
// [END multer]

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer,
 
};
    