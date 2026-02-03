const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.geminiChat = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be logged in"
    );
  }

  const message = data.message;
  if (!message || message.length > 500) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Invalid message"
    );
  }

  const apiKey = functions.config().gemini.key;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    }
  );

  const result = await response.json();

  return {
    reply:
      result.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI",
  };
});
