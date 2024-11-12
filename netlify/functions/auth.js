export async function handler(event) {
    if (event.httpMethod !== 'GET') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }
  
    const authCode = event.queryStringParameters.code;
  
    if (!authCode) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'No authorization code provided' })
      };
    }
  
    try {
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: process.env.OAUTH_CLIENT_ID,
          client_secret: process.env.OAUTH_CLIENT_SECRET,
          code: authCode
        })
      });
      
      const data = await response.json();
      
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to complete OAuth handshake' })
      };
    }
  }