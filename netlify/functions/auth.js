const axios = require('axios');
const querystring = require('querystring');

const GITHUB_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const NETLIFY_REDIRECT_URI = "https://gabehubner.netlify.app/.netlify/functions/auth";

const auth = async (event) => {
  const { provider, code } = querystring.parse(event.queryStringParameters);

  // Step 1: Check if the code is present
  if (provider === 'github' && code) {
    try {
      // Step 2: Exchange the code for a GitHub access token
      const response = await axios.post(
        'https://github.com/login/oauth/access_token',
        querystring.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: NETLIFY_REDIRECT_URI,
        }),
        {
          headers: { 'Accept': 'application/json' },
        }
      );

      // Check if access_token exists
      if (response.data.access_token) {
        const accessToken = response.data.access_token;

        // Step 3: Retrieve user data with the access token
        const userResponse = await axios.get('https://api.github.com/user', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const { login, name, avatar_url } = userResponse.data;

        // Step 4: Set a session cookie with the access token
        return {
          statusCode: 200,
          headers: {
            'Set-Cookie': `token=${accessToken}; HttpOnly; Path=/; Max-Age=3600`, // 1-hour session
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: 'GitHub Authentication Successful',
            user: { login, name, avatar_url },
          }),
        };
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Failed to retrieve access token' }),
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'GitHub authentication failed', details: error.message }),
      };
    }
  }

  // Step 5: If no code provided, initiate GitHub OAuth flow
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${NETLIFY_REDIRECT_URI}`;
  return {
    statusCode: 302,
    headers: { Location: githubAuthUrl },
  };
};

module.exports.handler = auth;
