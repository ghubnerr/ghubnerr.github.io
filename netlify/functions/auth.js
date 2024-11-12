exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') { // Change to GET
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { code } = JSON.parse(event.body);

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to complete OAuth handshake' }),
    };
  }
};