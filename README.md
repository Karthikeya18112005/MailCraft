# MailCraft AI — Chrome Extension

Personalized AI sales emails, right inside Gmail.

## Folder structure

```
mailcraft-extension/
├── manifest.json         ← Extension config
├── content.js            ← Injected into Gmail (panel + button)
├── panel.css             ← Side panel styles (all themes)
├── background.js         ← Service worker → calls Ollama API
├── popup.html            ← Extension badge popup (settings)
├── popup.css
├── popup.js
├── create-icons.html     ← Open in browser to generate icons
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

---

## Step 1 — Generate icons

1. Open `create-icons.html` in Chrome
2. Click **Download all icons**
3. Save the 4 PNG files into the `icons/` folder

---

## Step 2 — Run your fine-tuned model with Ollama

```bash
# Install Ollama (if not already)
# https://ollama.ai

# Create a Modelfile pointing to your GGUF file
cat > Modelfile << 'EOF'
FROM ./gguf_model/unsloth.Q4_K_M.gguf

SYSTEM """You are MailCraft AI, an expert at writing personalized, conversion-focused B2B sales emails. You write in a clear, human, direct style. Always include a subject line. Keep emails under 120 words unless asked otherwise."""
EOF

# Create the Ollama model
ollama create mailcraft -f Modelfile

# Test it
ollama run mailcraft "Write a cold outreach email to a VP of Sales named Alex at TechCorp."

# The API is now live at: http://localhost:11434/api/generate
```

---

## Step 3 — Load the extension in Chrome

1. Open Chrome → go to `chrome://extensions`
2. Enable **Developer mode** (toggle top-right)
3. Click **Load unpacked**
4. Select this `mailcraft-extension/` folder
5. The ✦ MailCraft icon appears in your toolbar

---

## Step 4 — Use it in Gmail

1. Open [Gmail](https://mail.google.com)
2. Click **Compose** to open a compose window
3. In the compose toolbar, click **✦ MailCraft**
4. The side panel slides in (Gmail compresses to the left)
5. Choose your **tone** and **email type**
6. Type your prompt: _"Follow-up after demo, Alex Chen, TechCorp, VP Sales, raised pricing concerns"_
7. Press **⌘+Enter** or click **✦ Generate**
8. Review the email in the chat area
9. Click **Insert →** to paste it directly into the compose box

---

## Step 5 — Configure settings (optional)

Click the **✦** extension icon in the Chrome toolbar to open settings:
- **Colour theme**: Clay · Stone · Moss · Mist · Dusk · Sakura · Ink
- **Type style**: Clean · Serif · Mono
- **Ollama model name**: change if you named it something else
- **Ollama URL**: change if running on a different port

Settings sync across Chrome profiles via `chrome.storage.sync`.

---

## Themes

| Name    | Feel                   |
|---------|------------------------|
| Clay    | Warm khaki — your brand |
| Stone   | Neutral grey-beige      |
| Moss    | Organic sage green      |
| Mist    | Cool blue-grey          |
| Dusk    | Warm purple             |
| Sakura  | Soft rose-pink          |
| Ink     | Dark editorial mode     |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Ollama not running" in popup | Run `ollama serve` in terminal |
| Panel does not appear | Reload Gmail after installing extension |
| "Could not find compose window" | Make sure Gmail compose is open before inserting |
| Model gives wrong output | Adjust the system prompt in your Modelfile and re-run `ollama create mailcraft -f Modelfile` |
| Gmail layout looks broken | Refresh the page — `mc-shifted` class is cleaned up on reload |

---

## Keyboard shortcut

Inside the prompt textarea: **⌘+Enter** (Mac) or **Ctrl+Enter** (Windows) → Generate




set OLLAMA_ORIGINS=*
ollama serve




$env:OLLAMA_ORIGINS="*"
ollama serve
