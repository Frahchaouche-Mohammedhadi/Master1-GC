# M1 GC — Ressources pédagogiques

Petit site statique de partage de ressources pour le M1 Génie Civil — Structures. Il utilise HTML, JavaScript et Tailwind CSS via CDN; aucune installation n'est nécessaire.

## Lancer le site

Ouvrez simplement `index.html` dans un navigateur connecté à Internet (le CDN Tailwind doit pouvoir être chargé).

## Modifier le programme

Dans `script.js`, `CURRICULUM` décrit chaque module, ses catégories et les ressources de chaque catégorie. Les noms et catégories correspondent à la structure prévue. `SEMESTER_MODULES` détermine les modules affichés pour S1 et S2. Pour le moment, les deux semestres affichent tout le catalogue; modifiez leurs listes lorsque la répartition officielle sera connue.

Exemple de répartition :

```js
const SEMESTER_MODULES = {
  S1: ["Béton Armé", "DDS 1"],
  S2: ["Structures Métalliques", "MDS"]
};
```

## Ajouter un document

Dans `script.js`, ajoutez une ressource dans la liste de la catégorie concernée de `CURRICULUM`. Remplacez le titre et l'URL par les vraies informations Drive :

```js
"Béton Armé": {
  "Cours": [
    { title: "Cours 1", url: "https://drive.google.com/..." }
  ],
  "TD": [],
  "Examen / Interrogation": []
}
```

Chaque ressource avec une URL HTTP ou HTTPS valide apparaît automatiquement comme un lien ouvrant un nouvel onglet. Les catégories vides affichent un état d'attente et un repère désactivé « Lien à ajouter ». Aucun document ni lien Drive n'est fourni par défaut.

## Ajouter un module ou une catégorie

Ajoutez le module avec ses catégories dans `CURRICULUM`, par exemple `"Nouveau module": { "Cours": [], "TD": [] }`. Ajoutez ensuite son nom dans `SEMESTER_MODULES.S1`, `SEMESTER_MODULES.S2`, ou les deux. Pour une nouvelle catégorie, ajoutez simplement sa clé et sa liste dans `CURRICULUM`. L'interface est générée depuis ces données.

## Thème

Le thème initial suit la préférence système. Le choix effectué avec le bouton de thème est conservé dans `localStorage`.
