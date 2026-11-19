# ✨ Pépites de Famille (prototype)

Une mini-appli pour apprendre chaque jour quelque chose de ses proches :
culture G, expérience de vie, bons plans, finance…

## Version en ligne

`artifact.html` est la version web partageable, hébergée sur claude.ai avec une
base de données partagée (chaque personne a sa propre série, ses réactions et
ce qu'elle a appris). C'est la version à utiliser en premier.

`server.js` + `public/` est une version locale (Node) qu'on peut garder pour
plus tard, par exemple pour un hébergement indépendant.

## Ce que fait la v0

- **Aujourd'hui** : chaque jour, 3 pépites partagées par les autres membres de la famille, que tu n'as pas encore apprises. Tu cliques sur « J'ai appris ! » et tu gagnes une série 🔥 de jours consécutifs.
- **Partager** : tu écris une pépite (catégorie, titre, texte) que toute la famille verra.
- **Tout** : l'historique de toutes les pépites, avec un filtre par catégorie.
- Réactions ❤️ 🤯 😂 🙏, et on voit qui a appris quoi.
- Pas de compte : chacun tape son prénom à la première visite.

## Lancer

Il faut seulement [Node.js](https://nodejs.org) (aucune dépendance à installer) :

```bash
cd pepites-famille
node server.js
```

Puis ouvrir http://localhost:3000.

Pour que la famille y accède depuis son téléphone sur le même Wi-Fi, ouvrir
`http://<ip-de-ton-ordi>:3000`. Pour un accès de partout, déployer le dossier
sur un hébergeur Node (Render, Railway, Fly.io…).

Les données sont dans `data.json` (créé automatiquement à partir de `seed.json`).

## Idées pour la suite

- Notification le matin / le soir (PWA + notifications push)
- Vrais comptes et un code d'invitation « famille »
- Commentaires et questions sous une pépite (« raconte-moi plus ! »)
- Un quiz du dimanche sur les pépites de la semaine
- Une base de données (SQLite, Supabase…) à la place du fichier JSON
