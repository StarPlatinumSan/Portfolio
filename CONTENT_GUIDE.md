# Modifier les textes du portfolio

Le contenu éditorial est regroupé dans deux fichiers. Pour conserver le bouton FR/EN cohérent, modifier les blocs `fr` et `en` ensemble.

## 1. Textes principaux, projets et coordonnées

Fichier : `src/data/portfolio.js`

- `siteCopy.fr` et `siteCopy.en` : navigation, accueil, studio, projets, expérience, compétences, formation, cours, court-métrage, contact et pied de page.
- `siteCopy.[langue].contact` : adresse courriel, URLs GitHub et LinkedIn, localisation et année du pied de page.
- `projects` : les grands projets présentés individuellement.
- `projectGroups` : les cartes de la section « Autres projets ».
- `studioFeature` : le contenu de The Lucid et les liens du studio.
- `echoesFeature` : le contenu et les liens d’Echoes.
- `experienceItems`, `educationItems` et `relevantCourseItems` : expérience, formation et cours.
- `webTools` et `gameTools` : listes de compétences.
- `imageAltText` : descriptions accessibles des images.

Les champs `href` contrôlent les liens. Une valeur `null` affiche l’état « bientôt disponible » lorsqu’il est prévu par le composant.

## 2. Choix, embranchements et barre de progression

Fichier : `src/data/journeys.js`

- `journeyCopy.fr` et `journeyCopy.en` : écran « Faites votre choix », titres des deux branches, introduction du parcours créatif et passerelle entre les deux parcours.
- `transition` : texte de l’animation affichée après un choix.
- `progress` : nom du parcours et nom de chaque étape dans la barre du bas.
- `journeySections` : ordre technique des sections dans chaque branche. À modifier seulement si une section est ajoutée, supprimée ou déplacée.

## 3. Titre d’onglet et aperçu de partage

Fichier : `index.html`

Ce fichier contient le titre de l’onglet, la description SEO et les textes Open Graph utilisés lors du partage du site.

## 4. Repères visuels non éditoriaux

Les sigles `AB` et `FI` visibles uniquement comme marques graphiques de remplacement se trouvent dans `src/components/MediaFrame.jsx` et `src/components/Sections.jsx`. Le reste du texte visible est alimenté par les deux fichiers de données ci-dessus.
