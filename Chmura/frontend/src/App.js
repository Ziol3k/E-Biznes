import React, { useState } from "react";

function App() {
  const [msg, setMsg] = useState("");

  const fetchMsg = async () => {
    const res = await fetch("/api/hello");
    const text = await res.text();
    setMsg(text);
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 24, borderRadius: 8, boxShadow: "0 0 10px #eee", textAlign: "center" }}>
      <h1>Frontend App</h1>
      <button onClick={fetchMsg} style={{ padding: 10, borderRadius: 5, background: "#1976d2", color: "#fff", border: "none", marginBottom: 20 }}>
        Pobierz wiadomość
      </button>
      <div>{msg && <p>{msg}</p>}</div>
    </div>
  );
}

export default App;
