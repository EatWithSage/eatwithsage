import './index.css'
import { createRoot } from "react-dom/client";
import App from "./App";

const root = document.getElementById("root")!;

window.addEventListener('error', (e) => {
  if (!root.innerHTML) {
    root.innerHTML = `<div style="padding:2rem;font-family:sans-serif;color:#c00">
      <h2>App failed to load</h2>
      <pre style="white-space:pre-wrap">${e.message}\n${e.filename}:${e.lineno}</pre>
    </div>`;
  }
});

createRoot(root).render(<App />);
