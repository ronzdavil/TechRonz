"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const sendQuery = async () => {
    const res = await fetch("http://localhost:3001/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setMessages([...messages, { role: "user", text: query }, { role: "bot", text: data.answer }]);
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">🤖 TechRonz 1.9</h1>
      <div className="w-full max-w-2xl space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <div className={`p-3 rounded-xl inline-block ${m.role === "user" ? "bg-blue-600" : "bg-gray-700"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-6 w-full max-w-2xl">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about mobiles..."
          className="flex-1 p-3 rounded-l-xl text-black"
        />
        <button onClick={sendQuery} className="bg-blue-600 px-4 rounded-r-xl">Send</button>
      </div>
    </div>
  );
}
