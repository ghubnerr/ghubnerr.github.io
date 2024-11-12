const axios = require('axios');
const querystring = require('querystring');

const GITHUB_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const NETLIFY_REDIRECT_URI = "https://gabehubner.netlify.app/.netlify/functions/auth";
const SUCCESS_REDIRECT_URI = "https://gabehubner.netlify.app/admin/"; // Add this

const auth = async (event) => {
  const params = querystring.parse(event.queryStringParameters || {});
  const { code, state } = params;

  // If we have a code, process the callback from GitHub
  if (code) {
    try {
      // Exchange the code for an access token
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
        const accessToken = tokenResponse.data.access_token;

        // Get user data
        const userResponse = await axios.get('https://api.github.com/user', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        
        // Set cookie and redirect to admin panel
        return {
          statusCode: 302,
          headers: {
            'Set-Cookie': `token=${accessToken}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax`,
            'Cache-Control': 'no-cache',
            'Location': SUCCESS_REDIRECT_URI,
          },
        };
      } else {
        return {
          statusCode: 302,
          headers: {
            'Location': `/admin?error=${encodeURIComponent('Failed to retrieve access token')}`,
          },
        };
      }
    } catch (error) {
      console.error('Auth Error:', error);
      return {
        statusCode: 302,
        headers: {
          'Location': `/admin?error=${encodeURIComponent(error.message)}`,
        },
      };
    }
  }

  // Generate random state for CSRF protection
  const random_state = Math.random().toString(36).substring(7);
  
  // Start the OAuth flow
  const githubAuthUrl = `https://github.com/login/oauth/authorize?${querystring.stringify({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: NETLIFY_REDIRECT_URI,
    scope: 'repo',
    random_state,
  })}`;

  return {
    statusCode: 302,
    headers: { 
      'Location': githubAuthUrl,
      'Cache-Control': 'no-cache',
    },
  };
};

module.exports.handler = auth;