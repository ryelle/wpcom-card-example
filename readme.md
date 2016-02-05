WordPress.com API Example
-------------------------

A demo app for the WordPress.com API. This demonstrates using [wpcom-oauth](https://github.com/Automattic/node-wpcom-oauth) to do client-side authentication, then using [wpcom.js](https://github.com/Automattic/wpcom.js) to grab user & site data.

Want to try it out? Fork this repo (or [download the zip](https://github.com/ryelle/wpcom-card-example/archive/master.zip)), and run these commands:

	git clone https://github.com/<yourname>/wpcom-card-example
	cd wpcom-card-example

You'll need to create a new client at [developer.wordpress.com](https://developer.wordpress.com/apps/) to get a client ID for the authentication process. You'll create a file called `config/default.json` with your client ID in this format:

	{
		"clientId": YOUR CLIENT ID
	}

Now you can start up the application:

	npm install
	npm run start

This will install all the required node packages to run the app, and start up a local server. You can view the app at http://localhost:5000.
