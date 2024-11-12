const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');

const GITHUB_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const NETLIFY_REDIRECT_URI = "https://gabehubner.netlify.app/.netlify/functions/auth";
const SUCCESS_REDIRECT_URI = "https://gabehubner.netlify.app/admin/";

// Maximum number of retry attempts
const MAX_RETRIES = 3;

const auth = async (event) => {
  // Clear existing cookies if starting a new auth flow
  if (!event.queryStringParameters?.code) {
    return startAuthFlow();
  }

  const params = querystring.parse(event.queryStringParameters || {});
  const { code, state } = params;

  // Validate state if present
  const savedState = getCookieValue(event.headers.cookie, 'oauth_state');
  if (state && savedState && state !== savedState) {
    return errorResponse('Invalid state parameter');
  }

  if (code) {
    try {
      // Exchange code for token
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

      if (tokenResponse.data.error) {
        throw new Error(tokenResponse.data.error_description || 'Failed to obtain access token');
      }

      if (tokenResponse.data.access_token) {
        // Verify the token works by making a test API call
        try {
          await axios.get('https://api.github.com/user', {
            headers: { 'Authorization': `Bearer ${tokenResponse.data.access_token}` }
          });

          // If we get here, the token is valid
          return {
            statusCode: 302,
            headers: {
              'Set-Cookie': [
                `netlifyCmsAuth=${tokenResponse.data.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`,
                'oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0' // Clear the state cookie
              ],
              'Cache-Control': 'no-cache',
              'Location': SUCCESS_REDIRECT_URI
            },
          };
        } catch (error) {
          throw new Error('Token validation failed');
        }
      }
      throw new Error('No access token received');
    } catch (error) {
      console.error('Auth Error:', error);
      return errorResponse(error.message);
    }
  }

  return startAuthFlow();
};

// Helper function to start the OAuth flow
const startAuthFlow = () => {
  const state = crypto.randomBytes(16).toString('hex');
  
  return {
    statusCode: 302,
    headers: {
      'Set-Cookie': [
        // Clear any existing auth cookies
        'netlifyCmsAuth=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
        `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=300` // 5 minute expiry
      ],
      'Cache-Control': 'no-cache',
      'Location': `https://github.com/login/oauth/authorize?${querystring.stringify({
        client_id: GITHUB_CLIENT_ID,
        redirect_uri: NETLIFY_REDIRECT_URI,
        scope: 'repo user',
        state: state
      })}`
    },
  };
};

// Helper function to handle errors
const errorResponse = (message) => {
  return {
    statusCode: 302,
    headers: {
      'Set-Cookie': [
        'netlifyCmsAuth=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
        'oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
      ],
      'Location': `/admin/#error=${encodeURIComponent(message)}`
    },
  };
};

// Helper function to get cookie value
const getCookieValue = (cookieString, name) => {
  if (!cookieString) return null;
  const match = cookieString.match(new RegExp(`${name}=([^;]+)`));
  return match ? match[1] : null;
};

exports.handler = auth;