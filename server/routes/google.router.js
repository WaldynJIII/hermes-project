const express = require('express'); // Express web server framework
const router = express.Router();
require('dotenv').config();
// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');
const speech = require('@google-cloud/speech');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const upload = require('./upload')
// console.log(upload.gcsname)
// set up a directory where all our files will be saved
// give the files a new identifier
// SET STORAGE
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;

// Creates a storage client
const gStorage = new Storage({
  projectId: projectId,
});
const bucketName = 'hermes-jb';
const bucket = gStorage.bucket(bucketName)
router.get('/transcription', async function (req, res) {
  console.log(req.query)

  // The name for the bucket
  
  // The name of the audio file to transcribe
  const fileName = req.query.file;
  // local file to upload

  // Uploads a local file to the bucket
  await gStorage.bucket(bucketName).upload(fileName, {
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
    },
  });

  await console.log(`${fileName} uploaded to ${bucketName}.`);
  res.send({
    bucketName: bucketName,
    fileName: fileName
  })
})

router.get('/transcript', async function (req, res) {
  console.log('57 google', req.query.fileName)
  // Creates a speech client

  const client = new speech.SpeechClient();
  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    uri: `gs://${bucketName}/${req.query.fileName}`,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
    enableAutomaticPunctuation: true,
    // audioChannelCount: 2,
    // enableSeparateRecognitionPerChannel: true,
  };
  const request = {
    config: config,
    audio: audio,
  };

  // Detects speech in the audio file. This creates a recognition job that you
  // can wait for now, or get its result later.
  const [operation] = await client.longRunningRecognize(request);
  // Get a Promise representation of the final result of the job
  const [response] = await operation.promise();
  console.log(response)
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);
  // [END speech_transcribe_async_gcs]
  res.send(transcription);

});

router.post(
  '/upload',
  upload.multer.single('file'),
  upload.sendUploadToGCS,
  (req, res, next) => {

    let data = req.body;

    // Was audio uploaded? If so, we'll use its public URL
    // in cloud storage.
    if (req.file && req.file.cloudStoragePublicUrl) {
      data.audioUrl = req.file.cloudStoragePublicUrl;
    }
    var fileName = req.file.cloudStorage
    console.log('googlerouter', req.file.cloudStorageObject)
    res.send(req.file.cloudStorageObject)

  }
);


module.exports = router;