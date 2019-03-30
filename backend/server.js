// This is the app's backend start point.  It establishes a connection to:
  // User authentication (Okta)
  // The Mongo DB (Mongoose)
  // An Express server
    // Express API routes direct API and DB traffic to and from the back end, via a proxy from the front end
    // All other routes direct the user to the single page React app

////////////////////////////////////////
///                                  ///
///           DEPENDENCIES           ///
///                                  ///
////////////////////////////////////////

    // ~~~ EXPRESS ~~~ //
const express = require('express');
const logger = require("morgan");
const routes = require("./routes");
const PORT = process.env.PORT || 5000;

    // ~~~ DATABASE ~~~ //
const mongoose = require("mongoose");

    // ~~~ OTHER ~~~ //
const cors = require('cors');
const path = require('path');

    // ~~~ OKTA ~~~ //
const OktaJwtVerifier = require('@okta/jwt-verifier');


////////////////////////////////////////
///                                  ///
///               LOGIC              ///
///                                  ///
////////////////////////////////////////

    //////////////
    //   OKTA   //
    //////////////

// ???
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-817020.okta.com/oauth2/default',
  clientId: '0oadjrwyhSqaqWDTz356',
  assertClaims: {
    aud: 'api://default',
  },
});

// ???
const url = require('url');
// const sampleConfig = require('../.samples.config.json');
// const SampleWebServer = require('../common/sample-web-server');

// ???
const oidcMiddlewareConfig = {
  routes: {
    login: {
      viewHandler: (req, res) => {
        const baseUrl = url.parse(sampleConfig.webServer.oidc.issuer).protocol + '//' + url.parse(sampleConfig.webServer.oidc.issuer).host;
        // Render your custom login page, you must create this view for your application and use the Okta Sign-In Widget
        res.render('custom-login', {
          csrfToken: req.csrfToken(),
          baseUrl: baseUrl
        });
      }
    }
  }
};

/**
 * Bootstrap the sample web server with the additional configuration for the custom login page
 */
// new SampleWebServer(sampleConfig.webServer, oidcMiddlewareConfig, 'custom-login-home');

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

    //////////////////
    //   MONGOOSE   //
    //////////////////

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mongoMemes",
  {useNewUrlParser: true}
);

    /////////////////
    //   EXPRESS   //
    /////////////////

// Create new instance of express
const app = express();

// MIDDLEWARE
// Enable cors
app.use(cors());

// Use morgan logger for logging requests
app.use(logger("dev"));

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static('public'));

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/build/"));
}

/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */
app.get('/secure', authenticationRequired, (req, res) => {
  res.json(req.jwt);
});

// Serve up single-page app React
app.get('/', function(req, res) {
  res.json(path.join(__dirname, "../frontend/src/pages/Home.jsx"));
});

// Add routes, includes both React and API
app.use(routes);

// Start the server
app.listen(PORT, () => {
  console.log("App running on port https://localhost:" + PORT);
});
