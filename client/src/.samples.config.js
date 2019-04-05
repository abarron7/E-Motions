export default {
  oidc: {
    clientId: '0oadjrwyhSqaqWDTz356',
    issuer: 'https://dev-817020.okta.com/oauth2/default',
    // redirectUri: 'https://e-motions.herokuapp.com/implicit/callback',
    // top is for when push to heroku bottom is for local run switch to emotions when pushing to master
    redirectUri: 'http://localhost:3000/implicit/callback',
    scope: 'openid profile email',
  },
};