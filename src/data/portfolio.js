const imageAspectRatios = {
	"/TheLucidMask.png": "1 / 1",
	"/Mask.png": "1 / 1",
	"/FractureInteractive.png": "1 / 1",
	"/VisualStoryWriting.gif": "830 / 467",
	"/JeSuisQuark.png": "1280 / 705",
	"/Prophunt.jpg": "3 / 2",
	"/MaVille.png": "1915 / 941",
};

const projectImages = (sources, alt) => {
	const imageSources = Array.isArray(sources) ? sources : [sources];
	const labels = ["Main", "Detail 01", "Detail 02"];

	return labels.map((label, index) => {
		const src = imageSources[index] ?? imageSources[index % imageSources.length];

		return {
			src,
			alt: index === 0 ? `${alt} main project view` : `${alt} project detail`,
			position: "center",
			aspectRatio: imageAspectRatios[src] ?? "16 / 10",
			label,
		};
	});
};

const projects = [
	{
		id: "the-lucid",
		title: "The Lucid",
		year: { en: "2026", fr: "2026" },
		category: { en: "FMV narrative game", fr: "Jeu narratif FMV" },
		role: {
			en: "Creative direction & narrative systems",
			fr: "Direction créative et systèmes narratifs",
		},
		description: {
			en: "A branching live-action narrative experience where player decisions fracture the story and possible endings.",
			fr: "Une expérience narrative en prise de vues réelles où les décisions du joueur fracturent l'histoire et ses fins possibles.",
		},
		technologies: ["Unity", "FMV", "Narrative Design", "Branching Systems"],
		href: null,
		decorative: "LUCID",
		accent: "#f04cbd",
		images: projectImages(["/TheLucidMask.png", "/Mask.png", "/FractureInteractive.png"], "The Lucid"),
	},
	{
		id: "visual-story-writing",
		title: "Visual Story-Writing",
		shortTitle: "Visual Story",
		year: "2026",
		category: { en: "Fullstack web app", fr: "Application web fullstack" },
		role: {
			en: "Frontend & AI integration",
			fr: "Frontend et intégration IA",
		},
		description: {
			en: "A visual writing interface for manipulating stories through entities, actions, and locations, with AI-assisted generation and rewriting.",
			fr: "Une interface d'écriture visuelle pour manipuler des récits via des entités, actions et lieux, avec génération et réécriture assistées par IA.",
		},
		technologies: ["React", "TypeScript", "Express", "OpenAI API"],
		href: "https://github.com/StarPlatinumSan/VisualStoryWriting-Andrei",
		decorative: "STORY",
		accent: "#e82bb7",
		images: projectImages("/VisualStoryWriting.gif", "Visual Story-Writing"),
	},
	{
		id: "je-suis-quark",
		title: "Je Suis Quark",
		year: { en: "Game project", fr: "Projet de jeu" },
		category: { en: "Interactive game", fr: "Jeu interactif" },
		role: {
			en: "Game design & development",
			fr: "Game design et développement",
		},
		description: {
			en: "An original space-themed Java game project with story, editor, and save-management modes.",
			fr: "Un projet de jeu spatial Java original avec des modes histoire, éditeur et gestion des sauvegardes.",
		},
		technologies: ["Game Design", "UI", "Narrative", "Prototyping"],
		href: null,
		decorative: "QUARK",
		accent: "#63d8fa",
		images: projectImages("/JeSuisQuark.png", "Je Suis Quark"),
	},
	{
		id: "prop-hunt",
		title: "Prop Hunt",
		year: { en: "Work in progress", fr: "En cours" },
		category: { en: "Game prototype", fr: "Prototype de jeu" },
		role: {
			en: "Gameplay & level design",
			fr: "Gameplay et level design",
		},
		description: {
			en: "An in-progress game prototype focused on learning Blueprints on Unreal Engine 5 through the building of a custom Prop Hunt game.",
			fr: "Un prototype en cours du jeu Prop Hunt pour améliorer mes compétences en Blueprints Unreal Engine 5.",
		},
		technologies: ["Game Design", "Level Design", "Prototyping"],
		href: null,
		decorative: "HUNT",
		accent: "#9188ef",
		images: projectImages("/Prophunt.jpg", "Prop Hunt"),
	},
	{
		id: "maville",
		title: "MaVille",
		year: "2025",
		category: {
			en: "Civic fullstack platform",
			fr: "Plateforme civique fullstack",
		},
		role: {
			en: "Fullstack development",
			fr: "Développement fullstack",
		},
		description: {
			en: "A Montreal city-information platform with authentication, live construction data, interactive Leaflet maps, and urban notifications.",
			fr: "Une plateforme d'information urbaine pour Montréal avec authentification, données de chantiers, cartes Leaflet et notifications.",
		},
		technologies: ["React", "Spring Boot", "Java", "Leaflet"],
		href: "https://github.com/StarPlatinumSan/MaVille",
		decorative: "CITY",
		accent: "#45bff2",
		images: projectImages("/MaVille.png", "MaVille"),
	},
];

export const projectGroups = [
	{
		id: "dnd-web-tools",
		title: { en: "D&D Web Tools", fr: "Outils web D&D" },
		description: {
			en: "A connected set of browser experiments for character building, timing, and game-system interaction.",
			fr: "Un ensemble d'expériences web liées à la création de personnages, au timing et aux systèmes de jeu.",
		},
		projects: [
			{
				id: "dnd-character-creator",
				title: "D&D Character Creator",
				year: "2026",
				category: {
					en: "Serverless web app",
					fr: "Application web serverless",
				},
				role: {
					en: "Product & fullstack development",
					fr: "Produit et développement fullstack",
				},
				description: {
					en: "A character-building platform with authentication, guided creation, cloud saves, and a serverless architecture.",
					fr: "Une plateforme de création de personnages avec authentification, parcours guidé, sauvegarde cloud et architecture serverless.",
				},
				technologies: ["React", "Authentication", "Serverless", "Database"],
				href: "https://github.com/StarPlatinumSan/DND_Builder_App",
				accent: "#bd3ed4",
				images: projectImages("/dnd.png", "D&D Character Creator"),
			},
			{
				id: "heartbeat-qte",
				title: "Heartbeat QTE",
				year: "2025",
				category: {
					en: "Interactive web game",
					fr: "Jeu web interactif",
				},
				role: {
					en: "Game logic & interaction",
					fr: "Logique de jeu et interaction",
				},
				description: {
					en: "A reflex game where players land inputs as a heartbeat crosses its target.",
					fr: "Un jeu de réflexe où le joueur agit au passage du battement dans la cible.",
				},
				technologies: ["React", "JavaScript", "CSS Motion"],
				href: "https://heartbeat-qte-stay-calm.vercel.app/",
				accent: "#f04cbd",
				images: projectImages("/heartbeat.png", "Heartbeat QTE"),
			},
			{
				id: "qte-reflex-trainer",
				title: "QTE Reflex Trainer",
				year: "2025",
				category: {
					en: "Interactive web game",
					fr: "Jeu web interactif",
				},
				role: { en: "Interaction design", fr: "Design d'interaction" },
				description: {
					en: "A browser reflex trainer inspired by quick-time event systems.",
					fr: "Un entraînement de réflexes inspiré des systèmes de quick-time events.",
				},
				technologies: ["React", "JavaScript", "Animation Timing"],
				href: "https://qte-roan.vercel.app/",
				accent: "#63d8fa",
				images: projectImages("/qte.png", "QTE Reflex Trainer"),
			},
		],
	},
	{
		id: "other-projects",
		title: { en: "Other Projects", fr: "Autres projets" },
		description: {
			en: "Smaller studies in responsive design, backend architecture, and data visualization.",
			fr: "Des études plus compactes en design responsive, architecture backend et visualisation de données.",
		},
		projects: [
			{
				id: "responsive-course",
				title: "Responsive Course Website",
				year: "2024",
				category: { en: "Frontend website", fr: "Site frontend" },
				role: {
					en: "Responsive UI development",
					fr: "Développement UI responsive",
				},
				description: {
					en: "A responsive university-course website designed around accessible mobile layouts.",
					fr: "Un site de cours universitaire responsive pensé pour des mises en page mobiles accessibles.",
				},
				technologies: ["HTML", "CSS", "JavaScript"],
				href: "https://starplatinumsan.github.io/Design-Responsive/",
				accent: "#9188ef",
				images: projectImages("/designresp.png", "Responsive Course Website"),
			},
			{
				id: "football-db",
				title: "FootballDB",
				year: "2025",
				category: { en: "Data platform", fr: "Plateforme de données" },
				role: {
					en: "API & database engineering",
					fr: "Ingénierie API et base de données",
				},
				description: {
					en: "A football statistics platform backed by a Kotlin REST API and relational database.",
					fr: "Une plateforme de statistiques de football avec API REST Kotlin et base relationnelle.",
				},
				technologies: ["Ktor", "PostgreSQL", "Docker"],
				href: "https://github.com/StarPlatinumSan/Projet-Groupe32",
				accent: "#7c65e8",
				images: projectImages("/footballdb.png", "FootballDB"),
			},
			{
				id: "d3-boxplot",
				title: "D3.js Boxplot Graph",
				year: "2025",
				category: {
					en: "Data visualization",
					fr: "Visualisation de données",
				},
				role: {
					en: "Data & interface design",
					fr: "Design de données et interface",
				},
				description: {
					en: "An interactive D3.js tool for exploring chess ranking distributions.",
					fr: "Un outil D3.js interactif pour explorer les distributions de classements d'échecs.",
				},
				technologies: ["D3.js", "JavaScript", "SVG"],
				href: "https://github.com/StarPlatinumSan/AndreiBituleanu-FIDE",
				accent: "#45bff2",
				images: projectImages("/d3.png", "D3.js Boxplot Graph"),
			},
		],
	},
];

export const echoesFeature = {
	id: "echoes",
	primaryImage: {
		src: "/EchoesLowRez.png",
		alt: "Interactive map of the Echoes fictional universe",
		position: "center",
		label: "Echoes / Interactive universe",
	},
	primaryHref: "https://echoes-neon.vercel.app",
	imageFit: "cover",
	title: "Echoes",
	format: {
		en: "Interactive fictional universe",
		fr: "Univers fictif interactif",
	},
	status: {
		en: "Constantly evolving",
		fr: "Mon Univers",
	},
	summary: {
		en: "Discover all my stories within my constantly evolving, interactive fictional universe of Echoes here.",
		fr: "Retrouve toutes mes histoires au sein de mon Univers Fictif et interactif de Echoes en constante évolution ici.",
	},
	linksTitle: {
		en: "Explore the universe",
		fr: "Explorer l'univers",
	},
	links: [
		{
			id: "website",
			label: { en: "Open Echoes", fr: "Ouvrir Echoes" },
			href: "https://echoes-neon.vercel.app",
		},
	],
};

export const studioFeature = {
	id: "the-lucid",
	logo: {
		src: "/FractureInteractive.png",
		alt: "Fracture Interactive studio logo",
	},
	primaryImage: {
		src: "/TheLucidMask.png",
		alt: "The Lucid fractured mask artwork",
		position: "center",
		label: "The Lucid / Key art",
	},
	imageFit: "contain",
	title: "The Lucid",
	format: { en: "FMV narrative game", fr: "Jeu narratif FMV" },
	status: { en: "Q4 2026 on Steam", fr: "Q4 2026 sur Steam" },
	summary: {
		en: "The flagship Fracture Interactive project: a live-action branching narrative where player choices reshape scenes, the storyline and endings.",
		fr: "Le projet phare de Fracture Interactive : un film FMV Unity à embranchements où les choix transforment l'histoire, les scènes et les fins. Date de sortie prévue sur Steam en Q4 2026.",
	},
	links: [
		{
			id: "video",
			label: { en: "Watch video", fr: "Voir la vidéo" },
			href: null,
		},
		{ id: "steam", label: "Steam", href: null },
		{ id: "instagram", label: "Instagram", href: null },
		{ id: "youtube", label: "YouTube", href: null },
		{
			id: "website",
			label: { en: "Website", fr: "Site web" },
			href: null,
		},
	],
};

export const siteCopy = {
	en: {
		languageName: "English",
		navigation: {
			work: "Work",
			studio: "Studio",
			experience: "Experience",
			about: "About",
			contact: "Contact",
		},
		hero: {
			eyebrow: "Creative developer",
			lead: "I build story-driven",
			accent: "interactive worlds",
			description:
				"I am Andrei Bituleanu, a narrative/game designer, web and interactive story-driven game developer. I bring together video game project direction, fullstack engineering, narrative design, and frontend design to share my passion for storytelling and interactive digital experiences.",
			primaryAction: "Explore selected work",
			secondaryAction: "Contact me",
			status: "Available for work",
			focus: "Current focus",
			focusValue: "Narrative systems, Unity FMV projects, UE5 3D worlds and interactive web experiences.",
			profileAlt: "Portrait of Andrei Bituleanu",
		},
		projectSection: {
			eyebrow: "Selected work / 2024-2026",
			title: "Projects",
			introduction: "A collection of fullstack tools, data products, and interaction experiments. Scroll to move through the layers.",
			scrollCue: "Scroll to explore",
			viewProject: "View project",
			comingSoon: "Coming soon",
			imagePending: "Image ready for replacement",
		},
		studio: {
			eyebrow: "Independent studio",
			title: "Fracture Interactive",
			description: "My narrative game studio begins with The Lucid, its first project: a Unity FMV experience shaped by atmosphere, branching stories, and meaningful player choice.",
			featuredProject: "First studio project",
			productionStatus: "In development",
			formatLabel: "Format",
			releaseLabel: "Release",
			linksTitle: "Watch, follow, or wishlist",
			linkComingSoon: "Coming soon",
		},
		experience: {
			eyebrow: "Experience",
			title: "My Experience",
		},
		about: {
			eyebrow: "Capabilities",
			title: "Two disciplines, one point of view",
			webLabel: "Web development",
			gameLabel: "Game development",
			education: "Education",
		},
		contact: {
			eyebrow: "Contact",
			title: "Join my World.",
			subtitle: "Let's tell its story.",
			email: "Email me",
			github: "GitHub",
			linkedin: "LinkedIn",
		},
		footer: "Andrei Bituleanu / Creative development",
	},
	fr: {
		languageName: "Français",
		navigation: {
			work: "Projets",
			studio: "Studio",
			experience: "Expérience",
			about: "À propos",
			contact: "Contact",
		},
		hero: {
			eyebrow: "Développeur créatif",
			lead: "Je crée des mondes",
			accent: "interactifs et narratifs",
			description:
				"Je suis Andrei Bituleanu, un designer narratif, développeur web et d'expériences vidéoludiques numériques interactives et narratives. Je combine ces compétences et continue de les élargir afin de pouvoir partager ma passion de faire vibrer et réfléchir l'humanité à travers mes histoires.",
			primaryAction: "Explorer les projets",
			secondaryAction: "Contacte-moi",
			status: "Photo peu professionnelle",
			focus: "Focus actuel",
			focusValue: "Systèmes narratifs, projets FMV Unity, mondes UE5 3D et expériences web interactives.",
			profileAlt: "Portrait de Andrei Bituleanu",
		},
		projectSection: {
			eyebrow: "Projets choisis / 2024-2026",
			title: "Projets",
			introduction: "Une collection d'outils fullstack, de produits de données et d'expériences interactives. Faites défiler pour traverser les couches.",
			scrollCue: "Défiler pour explorer",
			viewProject: "Voir le projet",
			comingSoon: "Bientôt",
			imagePending: "Image prête à être remplacée",
		},
		studio: {
			eyebrow: "Studio indépendant",
			title: "Fracture Interactive",
			description: "Mon studio de jeux narratifs débute avec The Lucid, son premier projet : une expérience FMV sous Unity façonnée par l'atmosphère, les récits à embranchements et les choix du joueur.",
			featuredProject: "Premier projet du studio",
			productionStatus: "En développement",
			formatLabel: "Format",
			releaseLabel: "Sortie",
			linksTitle: "Voir, suivre ou ajouter à la liste",
			linkComingSoon: "Bientôt",
		},
		experience: {
			eyebrow: "Expérience",
			title: "Mon Expérience",
		},
		about: {
			eyebrow: "Compétences",
			title: "Deux disciplines, un même regard",
			webLabel: "Développement web",
			gameLabel: "Développement jeu",
			education: "Formation",
		},
		contact: {
			eyebrow: "Contact",
			title: "Rejoins mon Univers.",
			subtitle: "Racontons son histoire.",
			email: "Me contacter",
			github: "GitHub",
			linkedin: "LinkedIn",
		},
		footer: "Andrei Bituleanu / Développement créatif",
	},
};

export const experienceItems = [
	{
		period: "2026",
		place: { en: "Internship", fr: "Stage" },
		role: {
			en: "Visual Story-Writing App",
			fr: "Application Visual Story-Writing",
		},
		summary: {
			en: "Built a React interface for visual story manipulation, including AI support for narrative generation and editing.",
			fr: "Développement d'une interface React pour manipuler des récits visuellement, avec assistance IA pour la génération et l'édition.",
		},
	},
	{
		period: "Semester 3 & 4",
		place: { en: "Contract", fr: "Contrats" },
		role: { en: "Teaching Assistant", fr: "Auxiliaire d'enseignement" },
		summary: {
			en: "Taught web development to University of Montreal students in IFT1005.",
			fr: "Enseignement du développement web aux étudiants de l'Université de Montréal dans le cours IFT1005.",
		},
	},
	{
		period: "2024-2025",
		place: { en: "Volunteer", fr: "Bénévolat" },
		role: { en: "Frontend Developer", fr: "Développeur frontend" },
		summary: {
			en: "Contributed to UDEM's 2025 Hackathon app and the university physics-department journal.",
			fr: "Contribution à l'application du Hackathon UDEM 2025 et au journal du département de physique.",
		},
	},
];

export const educationItems = [
	{
		period: "2023-2027",
		degree: {
			en: "Computer Science and Operations Research",
			fr: "Informatique et recherche opérationnelle",
		},
		institution: {
			en: "University of Montreal",
			fr: "Université de Montréal",
		},
		note: {
			en: "International track, including a Master 2-level exchange at Université Grenoble Alpes.",
			fr: "Parcours international, incluant un échange de niveau Master 2 à l'Université Grenoble Alpes.",
		},
	},
	{
		period: "2021-2023",
		degree: {
			en: "DEC - Computer Science and Mathematics",
			fr: "DEC - Sciences informatiques et mathématiques",
		},
		institution: {
			en: "CEGEP Maisonneuve",
			fr: "CÉGEP Maisonneuve",
		},
		note: {
			en: "Technical and mathematical foundations.",
			fr: "Fondations techniques et mathématiques.",
		},
	},
];

export const webTools = ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Node.js", "Express", "Java", "Spring Boot", "MongoDB", "PostgreSQL", "Git/GitHub", "Figma"];

export const gameTools = ["Unity", "C#", "Narrative Design", "Game Design", "Cinemachine", "Scriptable Objects", "2D Prototyping", "Level Design", "FMV Workflow", "Version Control"];

const localize = (value, language) => (typeof value === "object" && value !== null && !Array.isArray(value) ? value[language] : value);

const localizeFeature = (feature, language) => ({
	...feature,
	format: localize(feature.format, language),
	status: localize(feature.status, language),
	summary: localize(feature.summary, language),
	linksTitle: feature.linksTitle ? localize(feature.linksTitle, language) : null,
	links: feature.links.map((link) => ({
		...link,
		label: localize(link.label, language),
	})),
});

export const getProjects = (language) =>
	projects.map((project) => ({
		...project,
		year: localize(project.year, language),
		category: localize(project.category, language),
		role: localize(project.role, language),
		description: localize(project.description, language),
	}));

export const getProjectGroups = (language) =>
	projectGroups.map((group) => ({
		...group,
		title: localize(group.title, language),
		description: localize(group.description, language),
		projects: group.projects.map((project) => ({
			...project,
			year: localize(project.year, language),
			category: localize(project.category, language),
			role: localize(project.role, language),
			description: localize(project.description, language),
		})),
	}));

export const getEchoesFeature = (language) => localizeFeature(echoesFeature, language);

export const getStudioFeature = (language) => localizeFeature(studioFeature, language);

export const getExperience = (language) =>
	experienceItems.map((item) => ({
		...item,
		place: localize(item.place, language),
		role: localize(item.role, language),
		summary: localize(item.summary, language),
	}));

export const getEducation = (language) =>
	educationItems.map((item) => ({
		...item,
		degree: localize(item.degree, language),
		institution: localize(item.institution, language),
		note: localize(item.note, language),
	}));
