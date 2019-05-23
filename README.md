Hermes
Hermes is a web-based application that helps content creators automate the process of generating different file types and sending them to multiple blog, podcast, or video platforms.
Once users allow Hermes to connect to their Podbean and WordPress accounts, users upload an audio file, receive a transcription of their audio, edit the transcription and publish both audio and transcription files to their Podbean and WordPress account respectively. 
 
Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
Prerequisites
What things you need to install the software and how to install them
NPM install dependencies
- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

Setting Up Google Cloud Storage and Google Speech-To-Text
- Create a Google Cloud Platform project and create a bucket. (https://cloud.google.com/storage/docs/quickstart-console)
- Enable Cloud Storage API (https://cloud.google.com/apis/docs/enable-disable-apis).  Add GOOGLE_APPLICATION_CREDENTIALS="[PATH]" to .env file.
- Enable Speech-To-Text API. Create a service account. Select product owner role and download private key as JSON (https://cloud.google.com/speech-to-text/docs/quickstart-client-libraries). Add GOOGLE_CLOUD_PROJECT_ID=[project_id] to .env file.
- Create bucket in your cloud storage (https://cloud.google.com/storage/docs/creating-buckets)


WordPress Account: 
Obtain Wordpress client Secret: 
1.Make a wordpress account
https://wordpress.com/
2. https://developer.wordpress.com/apps/
	a.Create new application and fill in information
	b.Redirect URL: https://your_redirect_url/wordpress/callback_wordpress
      C. javascript origins: https://your_redirect_url/wordpress/callback_wordpress
3. Go to your app dashboard and scroll down
	a.in wordpress.router.js and take the oauth information and put into router
		1.line 17: var client_id = ‘Your client id’;
2.line 19: var redirect_uri = ‘Your redirect uri’;
3.line 71: res.redirect(’https://your_javascript_origins/#/connect')
4.line 100: res.redirect(’https://your_javascript_origins/#/home')
4. In connectPage.js
a. line 24: let wordpressRedirectUrl =       ’https://your_redirect_url/wordpress/callback_wordpress'
b.line 25: let wordpressClientId = ‘your_client_id’

Then try out the links and make sure you get to the authorization page

Podbean Account
Create a Podbean account
https://www.podbean.com
complete application registration
podbean: https://developers.podbean.com/app/apply
For Redirect URI
https://your_url_not_localhost/podbean/callback_podbean
Submit
Go to manage application
There you will find your Client ID and Client Secret
Copy the client secret from manage app and paste in your client credentials into Heroku CLIENT_SECRET_PODBEAN=[your_client_secret]
Go to Connect page 
let podbeanRedirectUrl = ’https://your_url_not_localhost/podbean/callback_podbean'
let podbeanClientID = ‘your_client_id’
on podbean.router.js
var client_id = ‘Your client id’;
var redirect_uri = ‘Your redirect uri’;
podbean.router.js line 83 change the URL to be your
res.redirect(‘your_redirect_uri/#/connect’)
Scroll down and put this into your post router
podbean.router.js line 122
This is non-functioning but this should get you the token
   10. Push and check to make sure you can get your credentials
   11. Check to make sure authentication process works on deployed site

If all is set up correctly you should get a podbean token in your database
 



 
Built With
React.js, Wordpress Api, PodBean Api, 
Contributing
David Friday, Julia Sugarman, Marifel Angeles, Madison Herkowitzs, Waldyn J  Benbenek III
 
Acknowledgments
Thank you to Jon Landers for his help with UX

