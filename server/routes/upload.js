
require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const bucketName = 'YOUR_BUCKET_NAME'; // The name of your google bucket

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID //Your google project id
});
const bucket = storage.bucket(bucketName);
function getPublicUrl(filename) {
  // gets the url for the bucket location
  return `https://storage.googleapis.com/${bucketName}/${filename}`;
}
function sendUploadToGCS(req, res, next) {
  // starts the upload project
  if (!req.file) {
    //if no file is found send an error
    return next();
  }

  let gcsname = Date.now() + req.file.originalname; //adds the date to the uploaded file name
  console.log('20 upload', gcsname)
  const file = bucket.file(gcsname); //tells the bucket to file store the file.

  const stream = file.createWriteStream({
    //starts the file stream to the cloud
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
      //makes the file public and able to access.
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });

  stream.end(req.file.buffer);
  return (gcsname)
}
const Multer = require('multer');
//Multers are used to stream content to the cloud. Streaming is easier for audio than a simple upload 
//It sends the file to a temporary storage and then uploads it piece by piece
const multer = Multer({
  storage: Multer.MemoryStorage,

});


module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer,

};
