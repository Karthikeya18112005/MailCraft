/* MailCraft AI — background.js (Service Worker) */

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "MC_GENERATE") {
    handleGenerate(msg.prompt)
      .then((text) => sendResponse({ ok: true, text }))
      .catch((err) => sendResponse({ ok: false, error: err.message }));
    return true; // keeps message channel open for async
  }
});

async function handleGenerate(prompt) {
  const data = await chrome.storage.sync.get(["mcModel", "mcUrl"]);
  const model = data.mcModel || "mailcraft";
  const baseUrl = data.mcUrl || "http://localhost:11434";
  const url = `${baseUrl.replace(/\/$/, "")}/api/generate`;

  const body = {
    model: model,
    prompt: prompt,
    stream: false,
    options: {
      temperature: 0.75,
      top_p: 0.9,
      num_predict: 300,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Ollama error: ${res.status} ${res.statusText}`);
  }

  const dataRes = await res.json();
  return (dataRes.response || "").trim();
}
