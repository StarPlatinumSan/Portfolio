# Project image slots

Each project uses three optional WebP images: `hero.webp`, `detail-01.webp`, and
`detail-02.webp`. Place images in the directories listed in
`src/data/portfolio.js`, then restart the Vite development server so the local
asset manifest refreshes.

The layout uses fixed aspect ratios and `object-fit: cover`. Focal position can
be changed through the corresponding `position` value in the project data.
