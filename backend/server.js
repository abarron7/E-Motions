                ///                            ///
                ///        DEPENDENCIES        ///
                ///                            ///

const express = require('express');
const logger = require("morgan");

const mongoose = require("mongoose");

const cors = require('cors');
const path = require('path');

const routes = require("./routes");
const PORT = process.env.PORT || 5000;

const OktaJwtVerifier = require('@okta/jwt-verifier');
var $ = require('jquery');


                ///                            ///
                ///           LOGIC            ///
                ///                            ///



      //////////
      // OKTA //

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-817020.okta.com/oauth2/default',
  clientId: '0oadjrwyhSqaqWDTz356',
  assertClaims: {
    aud: 'api://default',
  },
});

const url = require('url');
// const sampleConfig = require('../.samples.config.json');
// const SampleWebServer = require('../common/sample-web-server');

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

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static('public'));

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/build/"));
}


      //////////////
      // MONGOOSE //

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mongoMemes",
  {useNewUrlParser: true}
);




/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */
app.get('/secure', authenticationRequired, (req, res) => {
  res.json(req.jwt);
});

app.get('/', function(req, res) {
  res.json(path.join(__dirname, "../frontend/src/pages/Home.jsx"));
});

// Add routes, API
app.use(routes);

app.get('/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

// Start the server
app.listen(PORT, () => {
  console.log("App running on port https://localhost:" + PORT);
});
