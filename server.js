const express = require('express');
const OktaJwtVerifier = require('@okta/jwt-verifier');
var cors = require('cors');
var path = require('path');
var $ = require('jquery');
// CHECK THE EXAMPLES DOWNLOADED FROM SITE FOR HOW THEY SET UP ROUTING.


const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-817020.okta.com/oauth2/default',
  clientId: '0oadjrwyhSqaqWDTz356',
  assertClaims: {
    aud: 'api://default',
  },
});

const url = require('url');
const sampleConfig = require('../.samples.config.json');
const SampleWebServer = require('../common/sample-web-server');

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
new SampleWebServer(sampleConfig.webServer, oidcMiddlewareConfig, 'custom-login-home');

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

const app = express();

app.use(cors());

/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */
app.get('/secure', authenticationRequired, (req, res) => {
  res.json(req.jwt);
});

app.get("/", function(req, res) {
  res.json(path.join(__dirname, "./src/pages/Home"));
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Serve Ready on port 3000');
});
