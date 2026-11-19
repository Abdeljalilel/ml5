// Pépites de Famille — serveur ultra simple, zéro dépendance.
// Lancer : node server.js   puis ouvrir http://localhost:3000
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data.json");
const PUBLIC_DIR = path.join(__dirname, "public");
const CATEGORIES = ["culture", "experience", "bonplan", "finance", "autre"];

function load() {
  if (!fs.existsSync(DATA_FILE)) {
    const seed = JSON.parse(fs.readFileSync(path.join(__dirname, "seed.json"), "utf8"));
    fs.writeFileSync(DATA_FILE, JSON.stringify(seed, null, 2));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}
function save(db) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (c) => {
      raw += c;
      if (raw.length > 1e5) req.destroy();
    });
    req.on("end", () => {
      try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { reject(e); }
    });
  });
}

function send(res, status, obj) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(obj));
}

const clean = (s, max) => String(s || "").trim().slice(0, max);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  try {
    // --- API ---
    if (url.pathname === "/api/pepites" && req.method === "GET") {
      return send(res, 200, load().pepites);
    }
    if (url.pathname === "/api/pepites" && req.method === "POST") {
      const b = await readBody(req);
      const p = {
        id: crypto.randomUUID(),
        titre: clean(b.titre, 120),
        contenu: clean(b.contenu, 2000),
        categorie: CATEGORIES.includes(b.categorie) ? b.categorie : "autre",
        auteur: clean(b.auteur, 40) || "Anonyme",
        date: new Date().toISOString(),
        reactions: {},
        apprisPar: [],
      };
      if (!p.titre || !p.contenu) return send(res, 400, { error: "Titre et contenu requis" });
      const db = load();
      db.pepites.push(p);
      save(db);
      return send(res, 201, p);
    }
    const m = url.pathname.match(/^\/api\/pepites\/([\w-]+)\/(appris|reaction)$/);
    if (m && req.method === "POST") {
      const b = await readBody(req);
      const db = load();
      const p = db.pepites.find((x) => x.id === m[1]);
      if (!p) return send(res, 404, { error: "Introuvable" });
      const qui = clean(b.qui, 40) || "Anonyme";
      if (m[2] === "appris") {
        if (!p.apprisPar.includes(qui)) p.apprisPar.push(qui);
      } else {
        const emoji = ["❤️", "🤯", "😂", "🙏"].includes(b.emoji) ? b.emoji : "❤️";
        const list = (p.reactions[emoji] = p.reactions[emoji] || []);
        const i = list.indexOf(qui);
        i === -1 ? list.push(qui) : list.splice(i, 1); // toggle
      }
      save(db);
      return send(res, 200, p);
    }

    // --- Fichiers statiques ---
    const file = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
    const full = path.join(PUBLIC_DIR, path.normalize(file));
    if (!full.startsWith(PUBLIC_DIR) || !fs.existsSync(full)) {
      res.writeHead(404);
      return res.end("Not found");
    }
    const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json" };
    res.writeHead(200, { "Content-Type": (types[path.extname(full)] || "text/plain") + "; charset=utf-8" });
    fs.createReadStream(full).pipe(res);
  } catch (e) {
    send(res, 500, { error: e.message });
  }
});

server.listen(PORT, () => console.log(`Pépites de Famille → http://localhost:${PORT}`));
