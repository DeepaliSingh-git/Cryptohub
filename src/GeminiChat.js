import { useState } from "react";
import "./GeminiChat.css";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

export default function GeminiChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
        const res = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: input }]
        }
      ]
    })
  }
);


      const data = await res.json();
      const aiText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I couldn’t think of a reply 😅";

      setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong 🤕" }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">💬 Crypto AI Assistant</h2>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble ${msg.role}`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="chat-bubble ai typing">
            Gemini is thinking<span>.</span><span>.</span><span>.</span>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about crypto..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
