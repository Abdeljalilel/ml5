# Mettre Pépites de Famille en ligne (sans compte Claude)

Environ 15 minutes, une seule fois. Tout est gratuit.

## 1. Créer la base de données (Firebase)

1. Va sur https://console.firebase.google.com et connecte-toi avec ton compte Google.
2. **Ajouter un projet** → nomme-le `pepites-famille` → tu peux désactiver Google Analytics → **Créer**.
3. Menu de gauche **Créer → Authentication** → **Commencer** → onglet **Sign-in method** → **Google** → **Activer** → choisis ton e-mail d'assistance → **Enregistrer**.
4. Menu de gauche **Créer → Firestore Database** → **Créer une base de données** → emplacement `eur3 (europe-west)` → **mode production** → **Créer**.
5. Dans Firestore, onglet **Règles** → efface tout → colle le contenu du fichier `firestore.rules` → **Publier**.
6. Dans Firestore, onglet **Données** → **Commencer une collection** :
   - ID de la collection : `config`
   - ID du document : `acces`
   - Champ : `code`, type `string`, valeur : **ton code famille secret**, par ex. `baraka-rabat-2026` (lettres, chiffres et tirets uniquement)
   - **Enregistrer**
7. Roue crantée en haut à gauche → **Paramètres du projet** → en bas, **Vos applications** → icône **`</>`** (Web) → nomme-la `site` → **Enregistrer l'application**.
   Firebase affiche un bloc `firebaseConfig = { apiKey: ..., authDomain: ..., ... }`.
   Copie ces valeurs dans `config.js` (ou envoie-les à Claude, elles ne sont pas secrètes).

## 2. Mettre le site en ligne (Netlify, glisser-déposer)

1. Va sur https://app.netlify.com/drop (crée un compte gratuit si demandé).
2. Glisse le dossier `web` entier dans la page. Netlify te donne une adresse du type `https://nom-au-hasard.netlify.app`.
   (Tu peux la renommer : Site configuration → Change site name.)
3. Retour dans Firebase : **Authentication → Settings → Domaines autorisés → Ajouter un domaine** → colle `nom-au-hasard.netlify.app` (sans `https://`).

## 3. Inviter la famille

Envoie ce lien (adresse du site + `#` + ton code famille) :

```
https://nom-au-hasard.netlify.app/#baraka-rabat-2026
```

Chacun l'ouvre, se connecte avec Google, crée son profil (photo, nom, ville) et c'est parti.
Le code est retenu sur leur téléphone : les fois suivantes, l'adresse simple suffit.

## Qui peut faire quoi

- Sans le lien d'invitation (le bon code), personne ne peut entrer ni lire quoi que ce soit.
- Chacun ne peut modifier que **son** profil et supprimer que **ses** pépites.
- Personne ne peut modifier la pépite d'un autre.
