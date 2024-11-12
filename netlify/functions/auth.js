const axios = require('axios');
const querystring = require('querystring');

const GITHUB_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const NETLIFY_REDIRECT_URI = "https://gabehubner.netlify.app/.netlify/functions/auth";
const SUCCESS_REDIRECT_URI = "https://gabehubner.netlify.app/admin/";

const auth = async (event) => {
  const params = querystring.parse(event.queryStringParameters || {});
  const { code, state } = params;

  if (code) {
    try {
      const tokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: NETLIFY_REDIRECT_URI,
        },
        {
          headers: { 'Accept': 'application/json' },
        }
      );

      if (tokenResponse.data.access_token) {
        // Set secure cookie with SameSite attribute
        return {
          statusCode: 302,
          headers: {
            'Set-Cookie': `netlifyCmsAuth=${tokenResponse.data.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`,
            'Cache-Control': 'no-cache',
            'Location': SUCCESS_REDIRECT_URI,
          },
        };
      }
      throw new Error('No access token received');
    } catch (error) {
      console.error('Auth Error:', error);
      return {
        statusCode: 302,
        headers: {
          'Location': `/admin/#error=${encodeURIComponent(error.message)}`,
        },
      };
    }
  }

  // Initial OAuth flow
  const random_state = Math.random().toString(36).substring(7);
  const githubAuthUrl = `https://github.com/login/oauth/authorize?${querystring.stringify({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: NETLIFY_REDIRECT_URI,
    scope: 'repo user',
    state: random_state,
  })}`;

  return {
    statusCode: 302,
    headers: {
      'Location': githubAuthUrl,
      'Cache-Control': 'no-cache',
    },
  };
};

exports.handler = auth;