const axios = require('axios');
const querystring = require('querystring');
const { parse } = require('url');

const GITHUB_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const NETLIFY_REDIRECT_URI = "https://gabehubner.netlify.app/.netlify/functions/auth";

const auth = async (event, context) => {
  const { provider, code } = querystring.parse(event.queryStringParameters);

  // Step 1: Check for a code parameter in the request
  if (provider === 'github' && code) {
    try {
      // Step 2: Exchange the code for a GitHub access token
      const response = await axios.post(
        'https://github.com/login/oauth/access_token',
        querystring.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code: code,
          redirect_uri: NETLIFY_REDIRECT_URI,
        }),
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      // Step 3: Get the user data from GitHub using the access token
      const accessToken = response.data.access_token;
      const userResponse = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const user = userResponse.data;

      // Step 4: Return the user data or create a Netlify Identity session
      const { login, name, avatar_url } = user;
      
      // This can be extended to create a user session, store in a database, etc.
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'GitHub Authentication Successful',
          user: { login, name, avatar_url },
        }),
      };

    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'GitHub authentication failed', details: error.message }),
      };
    }
  }

  // Step 5: Redirect to GitHub OAuth authorization page if no code is provided
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${NETLIFY_REDIRECT_URI}`;
  return {
    statusCode: 302,
    headers: {
      Location: githubAuthUrl,
    },
  };
};

module.exports.handler = auth;
