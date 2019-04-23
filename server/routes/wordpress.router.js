require('dotenv').config();
const pool = require('../modules/pool');
var request = require("request"); //this is the request for authorization access token

/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var cookieParser = require('cookie-parser');
var client_id = '65413'; // Your client id
var client_secret = process.env.CLIENT_SECRET_WORDPRESS; // Your secret
var redirect_uri = 'http://localhost:5000/wordpress/callback_wordpress'; // Your redirect uri
// note redirect uri is only for local development not for heroku

const router = express.Router();

router.get('/token_check', function (req, res) {// this is the route to check to 
  // see if we have a token for the account.
  // we should delete an entry when someone loggs out.
  const queryText = `SELECT * FROM "current_user";`
  pool.query(queryText)// get current user id
    .then((result) => {
      let userId = result.rows[0].current// set user id
      const queryText = `SELECT * FROM "storage" WHERE "user_id" = $1;`
      pool.query(queryText, [userId] )// query to get the token and then send a bolien.
      .then((results) => {
        if (results.rows[0].wordpress){
        res.send(true)
        }
        else {
        res.send(false)
        }
      })
    })
})

// main authorization steeps this is where the user inputed information is sent along.
router.get('/callback_wordpress', function (req, res) {
  console.log('call back wordpress was hit')
  console.log(req.body);
  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null; // this is the token we got back form wordpress
  //   var blogId = req.query.blog_id || null;
  //   var blogUrl = req.query.blog_url || null;

  const queryText = `SELECT * FROM "current_user";`
  pool.query(queryText)
    .then((result) => {
      console.log(result.rows[0].current)
      userId = result.rows[0].current
      //attempt to grab the current user form the database

      //execute an authorization code grant flow using ga post
      var authOptions = {
        url: 'https://public-api.wordpress.com/oauth2/token',
        // headers: { 'Authorization': 'Bearer' + ((client_id + ':' + client_secret).toString('base64')) },
        // it might be basic instead of bearer. or try { authorization: 'Bearer ACCESS_TOKEN',
        // 'content-type': 'application/json' }
        form: // i have changed this from body, parameter(s), and some more I forgot. 
        {
          grant_type: 'authorization_code',
          code: code,
          client_id: client_id,
          client_secret: client_secret,
          redirect_uri: redirect_uri,
        },
        headers: {
          'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
        // this is the json object  (above)
        json: true
      };
      request.post(authOptions, function (error, response, body) {
        console.log('log body', body)
        let access_token = body.access_token
        // let blogId = body.blog_id // we will make this a global varabile and update it every time they auth.
        // let blogurl = body.blog_url
        checkStorage(access_token, userId)// this updates the database with the token.
        res.redirect('http://localhost:3000/#/home')
        // to DB
      })
    })
})

// main authorization steeps this is where the user inputed information is sent along.


checkStorage = (access_token, userId) => { //checks if user has accounts
  const queryText = `SELECT * FROM "storage" WHERE "id"=$1;`
  pool.query(queryText, [userId]) //hardcoded
    .then((result) => {
      // add user if not in database
      if (!result.rows[0]) {
        postToStorage(access_token, userId) //if no account, create one
      }
      else {
        updateToStorage(access_token, userId) // if account update db
      }
    })
}
updateToStorage = (access_token, userId) => {

  const queryText = `UPDATE "storage" SET "wordpress"=$1 WHERE "id"=$2;` //update access token by user id
  pool.query(queryText, [access_token, userId]).then(() => {
    console.log('access token added to database');
  }).catch(error => {
    console.log('there was an error adding access_token to database', error);
  })
}

postToStorage = (access_token, userId) => {

  const queryText = `INSERT INTO "storage" ("user_id", "wordpress") VALUES ($1,$2)` //create access token by user id
  pool.query(queryText, [userId, access_token,]).then(() => {
    console.log('access token added to database');
  }).catch(error => {
    console.log('there was an error adding access_token to database', error);
  })
}
module.exports = router;