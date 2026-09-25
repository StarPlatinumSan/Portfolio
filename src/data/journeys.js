export const journeySections = {
  studio: ['studio', 'the-lucid', 'echoes', 'short-film'],
  creative: ['creative', 'visual-story-writing', 'je-suis-quark', 'maville', 'prop-hunt', 'other-projects', 'experience', 'skills', 'education', 'relevant-courses'],
}

export const getJourneyForSection = (id) =>
  Object.keys(journeySections).find((journey) => journeySections[journey].includes(id))

export const journeyCopy = {
  fr: {
    eyebrow: 'Deux façons de me découvrir',
    title: 'Faites votre choix.',
    introduction: 'Les mondes que j’imagine. La manière dont je les construis. Par où voulez-vous commencer ?',
    note: 'Suivez votre curiosité. Les deux parcours se rejoignent.',
    back: 'Les deux parcours',
    opened: 'Parcours ouvert',
    studio: {
      kicker: 'Les projets phares',
      title: 'Fracture',
      accent: 'Interactive.',
      description: 'Des histoires à vivre. Des univers à explorer.',
      details: 'The Lucid · La carte d’Echoes · Court-métrage',
      action: 'Explorer les univers',
    },
    creative: {
      kicker: 'Le développeur derrière les mondes',
      title: 'L’esprit',
      accent: 'créatif.',
      description: 'Du code, des idées et le goût de leur donner vie.',
      details: 'Projets · Expérience · Compétences · Formation',
      action: 'Découvrir mon parcours',
    },
    about: {
      eyebrow: 'Andrei Bituleanu / Développeur créatif',
      title: 'Imaginer.',
      accent: 'Puis construire.',
      description: 'Je fais dialoguer le développement web, le game design et la narration. Ce qui me motive : transformer une idée en une expérience que l’on peut explorer, utiliser et ressentir.',
      detail: 'Voici les projets, les expériences et les apprentissages qui façonnent ma pratique.',
      action: 'Voir mes projets',
      disciplines: ['Développement fullstack', 'Game & narrative design', 'Expériences interactives'],
    },
    bridge: {
      eyebrow: 'La suite vous appartient',
      title: 'Un autre point de vue ?',
      toCreative: 'Vous avez découvert mes univers. Rencontrez maintenant le développeur qui leur donne vie.',
      toStudio: 'Vous avez découvert ma façon de construire. Entrez maintenant dans les univers que j’imagine.',
      revisit: 'Revenir à ce parcours',
      contact: 'Ou parlons de votre projet',
    },
  },
  en: {
    eyebrow: 'Two ways to get to know me',
    title: 'Make your choice.',
    introduction: 'The worlds I imagine. The way I build them. Where would you like to start?',
    note: 'Follow your curiosity. Both paths connect.',
    back: 'Both paths',
    opened: 'Path opened',
    studio: {
      kicker: 'The flagship projects',
      title: 'Fracture',
      accent: 'Interactive.',
      description: 'Stories to live. Worlds to explore.',
      details: 'The Lucid · The Echoes map · Short film',
      action: 'Explore the worlds',
    },
    creative: {
      kicker: 'The developer behind the worlds',
      title: 'The creative',
      accent: 'mind.',
      description: 'Code, ideas, and the drive to bring them to life.',
      details: 'Projects · Experience · Skills · Education',
      action: 'Discover my journey',
    },
    about: {
      eyebrow: 'Andrei Bituleanu / Creative developer',
      title: 'Imagine.',
      accent: 'Then build.',
      description: 'I bring web development, game design, and storytelling together. What drives me: turning an idea into an experience you can explore, use, and feel.',
      detail: 'These are the projects, experiences, and lessons that shape my practice.',
      action: 'See my projects',
      disciplines: ['Fullstack development', 'Game & narrative design', 'Interactive experiences'],
    },
    bridge: {
      eyebrow: 'You choose what comes next',
      title: 'Another perspective?',
      toCreative: 'You have explored my worlds. Now meet the developer who brings them to life.',
      toStudio: 'You have seen how I build. Now step into the worlds I imagine.',
      revisit: 'Return to this path',
      contact: 'Or let’s talk about your project',
    },
  },
}
