### Baseball Player Data App

This is a simple full-stack project app built with React, Express, MongoDB, and ChatGPT.

The app pulls in MLB career hits data from an open source API, performs a bit of data cleaning/validation to account for any missing values, and then stores the resulting data in a MongoDB collection for use in the client React app.

The client app displays the resulting data as a simple table, where the user has the option to edit and update a player's displayed stats.

If the user clicks on the name of any player, the row will expand to display the text result of ChatGPT prompt to return a basic description of the player selected.

To run this app locally, clone the repo and run <b>npm install</b> from the root directory to install the necessary back-end dependencies.  Once done, navigate into the <b>client</b> from the root and do likewise to install the necessary client dependencies.  

You will also need a <b>.env</b> file in the root directory with the following values stored as strings:

MONGO_DB_URI

OPEN_API_KEY

With MongoDB running locally on your machine, run <b>nodemon server.js</b> from the root directory in your CLI to start the Express server.  Navigate to the client and run <b>npm start</b> to start the client React app.

Marcus McBride, 2024