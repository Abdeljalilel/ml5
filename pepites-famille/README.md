# ✨ Pépites de Famille (prototype)

Une mini-appli pour apprendre chaque jour quelque chose de ses proches :
culture G, expérience de vie, bons plans, finance…

## Version en ligne

`artifact.html` est la version web partageable, hébergée sur claude.ai avec une
base de données partagée (chaque personne a sa propre série, ses réactions et
ce qu'elle a appris). C'est la version à utiliser en premier.

`server.js` + `public/` est une version locale (Node) qu'on peut garder pour
plus tard, par exemple pour un hébergement indépendant.

## Ce que fait la version en ligne

- Un fil d'observations de la vie, sans catégorie : du texte, et un lien si on veut (les liens écrits dans le texte deviennent cliquables aussi).
- **À découvrir** : les pépites des autres que tu n'as pas encore lues. « J'ai appris ✦ » fait grimper ta série 🔥.
- Une grande horloge, et la famille en haut : chacun indique sa ville, avec son monument (Tour Eiffel pour Paris…) et son heure locale.
- Chaque pépite est une carte postale avec le tampon de la ville d'où elle a été écrite.
- Profil avec photo et lieu de vie (monuments de Rabat : Tour Hassan, Tour Mohammed VI, Oudayas, Mausolée Mohammed V).
- Étoiles : +3 par pépite, +1 quand quelqu'un apprend grâce à toi, 👑 pour le plus grand transmetteur.
- Un lien seul ne suffit pas : il faut au moins 40 caractères écrits avec ses mots.

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
