const axios = require('axios');
const querystring = require('querystring');

const GITHUB_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const NETLIFY_REDIRECT_URI = "https://gabehubner.netlify.app/.netlify/functions/auth";
const SUCCESS_REDIRECT_URI = "https://gabehubner.netlify.app/admin/#/";  // Note the /#/ addition

const auth = async (event) => {
  // Debug logging
  console.log('Auth function called with:', {
    queryParams: event.queryStringParameters,
    headers: event.headers,
    path: event.path
  });

  const params = querystring.parse(event.queryStringParameters || {});
  const { code } = params;

  // If we detect a potential loop (could be customized based on your needs)
  const requestCount = parseInt(event.headers['x-request-count'] || '0');
  if (requestCount > 3) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Too many redirects',
        message: 'Detected a potential redirect loop'
      })
    };
  }

  // If we have a code, process the callback from GitHub
  if (code) {
    try {
      console.log('Processing GitHub callback with code');
      
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

      console.log('Token response received:', {
        status: tokenResponse.status,
        hasToken: !!tokenResponse.data.access_token
      });

      if (tokenResponse.data.access_token) {
        const accessToken = tokenResponse.data.access_token;

        // Get user data to verify token works
        const userResponse = await axios.get('https://api.github.com/user', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        console.log('Successfully retrieved user data:', {
          login: userResponse.data.login,
          hasData: !!userResponse.data
        });

        // Set multiple cookies to ensure one works
        const cookieHeaders = [
          `token=${accessToken}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax`,
          `github_token=${accessToken}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax`,
          `netlifycms.${GITHUB_CLIENT_ID}.auth.token=${accessToken}; Path=/; Max-Age=3600; SameSite=Lax`
        ];

        return {
          statusCode: 302,
          headers: {
            'Set-Cookie': cookieHeaders,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Location': SUCCESS_REDIRECT_URI,
            'X-Request-Count': (requestCount + 1).toString()
          },
        };
      } else {
        console.log('No access token in response:', tokenResponse.data);
        return {
          statusCode: 302,
          headers: {
            'Location': `/admin?error=${encodeURIComponent('No access token received')}&time=${Date.now()}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          },
        };
      }
    } catch (error) {
      console.error('Auth Error:', error);
      return {
        statusCode: 302,
        headers: {
          'Location': `/admin?error=${encodeURIComponent(error.message)}&time=${Date.now()}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        },
      };
    }
  }

  // Start the OAuth flow with additional parameters
  console.log('Starting OAuth flow');
  const githubAuthUrl = `https://github.com/login/oauth/authorize?${querystring.stringify({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: NETLIFY_REDIRECT_URI,
    scope: 'repo user',
    state: Date.now().toString(),
    allow_signup: 'false'
  })}`;

  return {
    statusCode: 302,
    headers: {
      'Location': githubAuthUrl,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Request-Count': (requestCount + 1).toString()
    },
  };
};

module.exports.handler = auth;