export const journeySections = {
	studio: ["studio", "the-lucid", "short-film", "echoes", "artificial-selection", "duality"],
	creative: ["creative", "experience", "education", "visual-story-writing", "je-suis-quark", "maville", "other-projects", "skills", "relevant-courses"],
};

export const getJourneyForSection = (id) => Object.keys(journeySections).find((journey) => journeySections[journey].includes(id));

export const journeyCopy = {
	fr: {
		eyebrow: "Deux façons de me découvrir",
		title: "Faites votre choix.",
		introduction: "Vous avez toujours un choix dans la vie, je ne vais pas vous en priver.",
		note: "Suivez votre curiosité. Les deux parcours reconvergent.",
		back: "Votre choix",
		creativeNav: "Mon parcours",
		opened: "Parcours ouvert",
		transition: {
			eyebrow: "Votre choix dessine la suite",
			title: "Trajectoire sélectionnée",
			studio: "Univers / Studio",
			creative: "Création / Parcours",
		},
		progress: {
			ariaLabel: "Progression dans le parcours choisi",
			studio: "Univers imaginés",
			creative: "Parcours créatif",
			labels: {
				studio: {
					studio: "Fracture Interactive",
					"the-lucid": "The Lucid",
					echoes: "Echoes",
					"short-film": "Court-métrage",
				},
				creative: {
					creative: "Introduction",
					"visual-story-writing": "Visual Story-Writing",
					"je-suis-quark": "Je suis Quark",
					maville: "MaVille",
					"other-projects": "Autres projets",
					experience: "Expérience",
					skills: "Compétences",
					education: "Formation",
					"relevant-courses": "Cours pertinents",
				},
			},
		},
		studio: {
			kicker: "Les projets phares",
			title: "Projets",
			accent: "Majeurs.",
			description: "Mes projets majeurs, entre univers de studio et expérimentations indépendantes.",
			details: "The Lucid - La carte d’Echoes - Court-métrage - Artificial Selection - Duality",
			action: "Explorer les univers",
		},
		creative: {
			kicker: "Le développeur derrière les mondes",
			title: "Qui",
			accent: "suis-je?",
			description: "Andrei Bituleanu, Canadien et Citoyen Européen.",
			details: "Projets - Expérience - Compétences - Formation",
			action: "Découvrir mon parcours",
		},
		about: {
			eyebrow: "Andrei Bituleanu / Développeur créatif",
			title: "Qui",
			accent: "Suis-je?",
			description:
				"Je combine mon année d'expérience en design et développement web avec ma passion depuis l'enfance pour la narration et le game design. J'ai toujours eu une imagination infinie et une passion à créer des histoires qui nous font ressentir, réfléchir, ouvrir des nouvelles perspectives et inspirer l'humanité.",
			detail: "Voici les projets, les expériences et les apprentissages qui façonnent ma pratique.",
			disciplines: ["Game & narrative design", "Développement fullstack", "Expériences interactives"],
		},
	},
	en: {
		eyebrow: "Two ways to get to know me",
		title: "Make your choice.",
		introduction: "You always have a choice in life, and I'm not going to take that away from you.",
		note: "Follow your curiosity. Both paths converge again.",
		back: "Your choice",
		creativeNav: "My journey",
		opened: "Path opened",
		transition: {
			eyebrow: "Your choice shapes what comes next",
			title: "Path selected",
			studio: "Worlds / Studio",
			creative: "Making / Journey",
		},
		progress: {
			ariaLabel: "Progress through the selected path",
			studio: "Imagined worlds",
			creative: "Creative journey",
			labels: {
				studio: {
					studio: "Fracture Interactive",
					"the-lucid": "The Lucid",
					echoes: "Echoes",
					"short-film": "Short film",
				},
				creative: {
					creative: "Introduction",
					"visual-story-writing": "Visual Story-Writing",
					"je-suis-quark": "Je suis Quark",
					maville: "MaVille",
					"other-projects": "Other projects",
					experience: "Experience",
					skills: "Skills",
					education: "Education",
					"relevant-courses": "Relevant courses",
				},
			},
		},
		studio: {
			kicker: "The flagship projects",
			title: "Major",
			accent: "Projects.",
			description: "My major projects, spanning studio worlds and independent experiments.",
			details: "The Lucid - The Echoes map - Short film - Artificial Selection - Duality",
			action: "Explore the worlds",
		},
		creative: {
			kicker: "The developer behind the worlds",
			title: "Who",
			accent: "am I?",
			description: "Andrei Bituleanu, Canadian and European citizen.",
			details: "Projects - Experience - Skills - Education",
			action: "Discover my journey",
		},
		about: {
			eyebrow: "Andrei Bituleanu / Creative developer",
			title: "Who",
			accent: "Am I?",
			description:
				"I combine my year of experience in web design and development with my lifelong passion for storytelling and game design. I have always had a boundless imagination and a passion for creating stories that make us feel, think, open up new perspectives, and inspire humanity.",
			detail: "These are the projects, experiences, and lessons that shape my practice.",
			disciplines: ["Game & narrative design", "Fullstack development", "Interactive experiences"],
		},
	},
};
