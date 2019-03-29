                ///                            ///
                ///        DEPENDENCIES        ///
                ///                            ///

const express = require('express');

// 
var bodyParser = require("body-parser");
var logger = require("morgan");

// MONGOOSE
var mongoose = require("mongoose");

const OktaJwtVerifier = require('@okta/jwt-verifier');
var cors = require('cors');
var path = require('path');
var $ = require('jquery');
// CHECK THE EXAMPLES DOWNLOADED FROM SITE FOR HOW THEY SET UP ROUTING.


                ///                            ///
                ///           LOGIC            ///
                ///                            ///

      //////////////
      // MONGOOSE //
      
// SETUP MONGOOSE DATABASE
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoMemes";

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

      //////////
      // OKTA //

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-817020.okta.com/oauth2/default',
  clientId: '0oadjrwyhSqaqWDTz356',
  assertClaims: {
    aud: 'api://default',
  },
});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    return res.status(401).end();
  }

  const accessToken = match[1];

  return oktaJwtVerifier.verifyAccessToken(accessToken)
    .then((jwt) => {
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
}

      /////////////
      // EXPRESS //

const app = express();

  // MIDDLEWARE
/**
 * For local testing only!  Enables CORS for all domains
 */
app.use(cors());

// Use morgan logger for logging requests
app.use(logger("dev"));

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
    extended: true
}));
// parse application/json
app.use(bodyParser.json());


/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */
app.get('/secure', authenticationRequired, (req, res) => {
  res.json(req.jwt);
});

app.get('/', function(req, res) {
  res.json(path.join(__dirname, "./src/pages/Home.jsx"));
});

// Import and use routes.
var scraperRoutes = require("./controllers/controller.js");
var savedRoutes = require("./controllers/saved-memes.js");
app.use(scraperRoutes, savedRoutes);

// Start the server
var PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("App running on port https://localhost:" + PORT);
});
