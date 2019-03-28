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

/**
 * For local testing only!  Enables CORS for all domains
 */
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
  res.json(path.join(__dirname, "./src/pages/Home.jsx"));
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Serve Ready on port 3000');
});
