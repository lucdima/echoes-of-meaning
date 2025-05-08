# Echoes of Meaning

_Echoes of Meaning_ is a generative text visualization that breathes life into words through motion, color, and emotion. Words drift gently across the screen, subtly shifting in size and position, while emotionally charged language is illuminated with dynamic hues drawn from a curated emotional lexicon.

Designed to be contemplative and immersive, this sketch transforms text into a living rhythm — where feelings linger, fade, and reappear like echoes. Whether used as a poetic display, an ambient installation, or a meditative experience, _Echoes of Meaning_ invites viewers to feel language beyond its literal form.

> Created in May 2025 by **Lucas Dima** for a project led by artist **Karina Villavicencio**.

---

## 🚀 Installation & Usage


### 💻 Run locally (with a local web server)

Because modern browsers block local file access for things like fonts and JSON, you’ll need to run a local web server to use this sketch.

#### Clone the repository:
    ```bash
    git clone https://github.com/lucdima/echoes-of-meaning.git
    ```
#### Customize:
   - Place your `text.txt` file (source text).
   - Place your `emotions.json` file (emotion-word mapping).
   - Ensure `DejaVuSansMono-Bold.ttf` is in the project folder.

Here are two easy ways using Node.js and npm:

#### ✅ Option 1: Using `http-server` (simple, zero config)

```bash
npm install -g http-server
http-server .
```

Then open your browser and go to:  
[http://localhost:8080](http://localhost:8080)

#### ✅ Option 2: Using `live-server` (auto-reload on changes)

```bash
npm install -g live-server
live-server
```

This will launch the sketch in your browser and automatically reload it when you change files.

---

### 🌐 Run on [editor.p5js.org](https://editor.p5js.org)

You can also use this sketch online with the p5.js Web Editor:

1. Go to [https://editor.p5js.org](https://editor.p5js.org)
2. Copy the contents of `sketch.js` into a new project
3. Upload your `text.txt`, `emotions.json`, and `DejaVuSansMono-Bold.ttf` files using the **"Sketch Files"** panel
4. Press the ▶️ Run button to visualize your text!

🧠 This project was created using [p5.js](https://p5js.org), an open-source JavaScript library for creative coding originally developed by **Lauren McCarthy**.  
Her work and the p5.js community are amazing inspirations for projects like this one.

---

## ⚙️ Configuration

Edit the top section of the main `.js` file to adjust:

- Word spacing, line height, and font size
- Timing (delays and durations)
- Emotion highlight intensity
- Background and border settings
- Memory mode (whether old words fade or persist)

---

## 📁 File Structure

```
📦 echoes-of-meaning/
├── index.html
├── sketch.js
├── text.txt
├── emotions.json
├── DejaVuSansMono-Bold.ttf
└── README.md
```

---

## 🙌 Credits

- **Lucas Dima** – Concept & Development  
- **Karina Villavicencio** – Artistic Direction  
- Font: [DejaVu Sans Mono](https://dejavu-fonts.github.io/)  
- Built with [p5.js](https://p5js.org) by Lauren McCarthy and contributors  

---

## 📝 License

This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html).  
You are free to use, modify, and distribute this work, provided that all derivative works remain under the same license.

---
