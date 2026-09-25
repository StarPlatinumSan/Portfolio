const imageAspectRatios = {
	"/TheLucidMask.png": "1 / 1",
	"/Mask.png": "1 / 1",
	"/FractureInteractive.png": "1 / 1",
	"/VisualStoryWriting.gif": "830 / 467",
	"/generation.png": "1087 / 532",
	"/Logo_UdeM-RVB-002.png": "768 / 362",
	"/JeSuisQuark.png": "1280 / 705",
	"/quark1.png": "1480 / 761",
	"/quark2.png": "1486 / 792",
	"/MaVille.png": "1915 / 941",
	"/map.png": "1355 / 910",
	"/map2.png": "889 / 858",
	"/mtl.png": "300 / 168",
};

const imageFitModes = {
	"/mtl.png": "cover",
};

const imagePositions = {
	"/mtl.png": "50% 50%",
};

const centeredImageCrops = new Set(["/mtl.png"]);

const imageMotionFallbacks = {
	"/VisualStoryWriting.gif": "/generation.png",
};

const imageAltText = {
	"/TheLucidMask.png": {
		en: "Fractured mask artwork for The Lucid",
		fr: "Illustration du masque fracturé de The Lucid",
	},
	"/Mask.png": {
		en: "Fracture Interactive mask emblem",
		fr: "Emblème du masque de Fracture Interactive",
	},
	"/FractureInteractive.png": {
		en: "Fracture Interactive studio logo",
		fr: "Logo du studio Fracture Interactive",
	},
	"/VisualStoryWriting.gif": {
		en: "Overview of the Visual Story Writing interface",
		fr: "Aperçu de l'interface Visual Story Writing",
	},
	"/generation.png": {
		en: "Story-generation workspace in Visual Story Writing",
		fr: "Espace de génération narrative de Visual Story Writing",
	},
	"/mtl.png": {
		en: "Université de Montréal logo",
		fr: "Logo de l'Université de Montréal",
	},
	"/JeSuisQuark.png": {
		en: "Je Suis Quark game title screen",
		fr: "Écran-titre du jeu Je Suis Quark",
	},
	"/quark1.png": {
		en: "Space scene from Je Suis Quark",
		fr: "Scène spatiale de Je Suis Quark",
	},
	"/quark2.png": {
		en: "Game interface from Je Suis Quark",
		fr: "Interface du jeu Je Suis Quark",
	},
	"/MaVille.png": {
		en: "MaVille civic platform interface",
		fr: "Interface de la plateforme civique MaVille",
	},
	"/map.png": {
		en: "Interactive construction map in MaVille",
		fr: "Carte interactive des chantiers dans MaVille",
	},
	"/map2.png": {
		en: "Map detail from the MaVille platform",
		fr: "Détail cartographique de la plateforme MaVille",
	},
	"/dnd.png": {
		en: "D&D character creator interface",
		fr: "Interface du créateur de personnages D&D",
	},
	"/heartbeat.png": {
		en: "Heartbeat QTE reflex-game interface",
		fr: "Interface du jeu de réflexes Heartbeat QTE",
	},
	"/qte.png": {
		en: "QTE Reflex Trainer interface",
		fr: "Interface de QTE Reflex Trainer",
	},
	"/designresp.png": {
		en: "Responsive university course website",
		fr: "Site responsive d'un cours universitaire",
	},
	"/footballdb.png": {
		en: "FootballDB statistics platform interface",
		fr: "Interface de la plateforme statistique FootballDB",
	},
	"/d3.png": {
		en: "Interactive D3.js chess-ranking boxplot",
		fr: "Diagramme en boîte interactif D3.js des classements d'échecs",
	},
};

const projectImages = (sources, alt) => {
	const imageSources = Array.isArray(sources) ? sources : [sources];
	const labels = ["Main", "Detail 01", "Detail 02"];

	return labels.map((label, index) => {
		const src = imageSources[index] ?? imageSources[index % imageSources.length];

		return {
			src,
			alt: imageAltText[src] ?? {
				en: index === 0 ? `${alt} main project view` : `${alt} project detail`,
				fr: index === 0 ? `Aperçu principal de ${alt}` : `Détail du projet ${alt}`,
			},
			position: imagePositions[src] ?? "center",
			aspectRatio: imageAspectRatios[src] ?? "16 / 10",
			fit: imageFitModes[src],
			centeredCrop: centeredImageCrops.has(src),
			motionFallback: imageMotionFallbacks[src],
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
		accent: "#e82bb7",
		images: projectImages(["/VisualStoryWriting.gif", "/generation.png", "/mtl.png"], "Visual Story-Writing"),
	},
	{
		id: "je-suis-quark",
		title: "Je Suis Quark",
		year: { en: "Game project", fr: "Projet de jeu" },
		yearLabel: { en: "Status", fr: "Statut" },
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
		accent: "#63d8fa",
		images: projectImages(["/JeSuisQuark.png", "/quark1.png", "/quark2.png"], "Je Suis Quark"),
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
		accent: "#45bff2",
		images: projectImages(["/MaVille.png", "/map.png", "/map2.png"], "MaVille"),
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
		alt: {
			en: "Interactive map of the Echoes fictional universe",
			fr: "Carte interactive de l'univers fictif Echoes",
		},
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
	summary: {
		en: "Echoes is the fictional universe I am building to connect my stories. Its interactive map invites you to discover its places and stories within an ever-evolving world.",
		fr: "Echoes est l’univers fictif que je construis pour relier mes récits. Sa carte interactive invite à découvrir les lieux et les histoires qui y sont dans un monde en permanente évolution.",
	},
	transmedia: {
		en: "My world, designed to bring together interactive films, books, and games set in the Echoes universe.",
		fr: "Mon monde destiné à réunir des films interactifs, livres, oneshots D&D et des jeux à embranchements se déroulant dans l'univers d'Echoes.",
	},
	linksTitle: {
		en: "Explore the universe",
		fr: "Explorer l'univers",
	},
	presentation: {
		fr: {
			tagline: "L'Univers de mes histoires.",
			exploreMap: "Explorer la carte",
			newTab: "",
			transmediaTitle: "Un univers avec plusieurs formes de récit.",
			mediums: ["", "", ""],
		},
		en: {
			tagline: "The universe of my stories.",
			exploreMap: "Explore the map",
			newTab: "",
			transmediaTitle: "One universe, many ways to tell a story.",
			mediums: ["", "", ""],
		},
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
		alt: {
			en: "Fracture Interactive studio logo",
			fr: "Logo du studio Fracture Interactive",
		},
	},
	primaryImage: {
		src: "/TheLucidMask.png",
		alt: {
			en: "The Lucid fractured mask artwork",
			fr: "Illustration du masque fracturé de The Lucid",
		},
		position: "center",
		label: "The Lucid / Key art",
	},
	imageFit: "contain",
	title: "The Lucid",
	format: { en: "FMV narrative game", fr: "Jeu narratif FMV" },
	status: { en: "Q4 2026 on Steam", fr: "Q4 2026 sur Steam" },
	summary: {
		en: "Fracture Interactive's flagship project: a branching Unity FMV film where choices fracture the story, scenes, and endings. Planned for release on Steam in Q4 2026.",
		fr: "Le projet phare de Fracture Interactive : un film FMV Unity à embranchements où les choix fracturent l'histoire, les scènes et les fins. Date de sortie prévue sur Steam en Q4 2026.",
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
		identity: {
			name: "Andrei Bituleanu",
		},
		navigation: {
			work: "Projects",
			studio: "Studio",
			experience: "Experience",
			education: "Education",
			contact: "Contact",
			home: "Home",
			primaryLabel: "Primary navigation",
			switchLanguage: "Switch language",
			skipToContent: "Skip to content",
		},
		hero: {
			eyebrow: "Creative developer",
			lead: "I create worlds",
			accent: "that are interactive and narrative",
			description:
				"I am Andrei Bituleanu, a narrative game designer and a developer of web, audiovisual, digital, interactive, and narrative experiences. I combine these skills with UI/UX through my experience in design and frontend web development, and I continue to broaden them so I can share my passion for moving people and making them think through my stories.",
			primaryAction: "Explore the projects",
			secondaryAction: "Contact me",
			status: "Yes, that is the Belledonne mountain range",
			focus: "Current focus",
			focusValue: "Narrative systems, Unity FMV projects, UE5 3D worlds and interactive web experiences.",
			profileAlt: "Portrait of Andrei Bituleanu",
		},
		projectSection: {
			eyebrow: "Selected projects / 2024-2026",
			title: "Projects",
			introduction: "A collection of fullstack tools, data products, and interactive experiences. Explore at your own pace.",
			scrollCue: "Scroll to explore",
			previousProject: "Previous project",
			nextProject: "Next project",
			viewProject: "View project",
			opensInNewTab: "Opens in a new tab",
			comingSoon: "Coming soon",
			imagePending: "Image ready for replacement",
			categoryLabel: "Category",
			roleLabel: "Role",
			yearLabel: "Year",
			technologiesLabel: "Technologies",
			workInProgress: "Work in Progress",
		},
		studio: {
			eyebrow: "Independent studio",
			title: "Fracture Interactive",
			description: "My narrative game studio begins with The Lucid, its first project: a Unity FMV experience shaped by atmosphere, branching stories, and meaningful player choice.",
			featuredProject: "First studio project",
			productionStatus: "In development",
			formatLabel: "Format",
			studioLabel: "Studio",
			releaseLabel: "Release",
			linksTitle: "Watch, follow, or wishlist",
			linkComingSoon: "Coming soon",
			discoverProject: "Discover The Lucid",
			returnToStudio: "Return to the studio",
		},
		experience: {
			eyebrow: "Experience",
			title: "My Experience",
			introduction: "Three connected roles at the intersection of teaching, product development, and visual interfaces.",
		},
		about: {
			eyebrow: "Capabilities",
			title: "Two creative disciplines",
			introduction: "From interface systems to playable narratives, I use two complementary toolsets to create complete interactive experiences.",
			webLabel: "Web development",
			gameLabel: "Game development",
			education: "Education",
		},
		educationSection: {
			eyebrow: "Education",
			title: "An international journey",
			introduction: "",
		},
		relevantCourses: {
			eyebrow: "Education",
			title: "Relevant coursework",
			introduction: "Two Université de Montréal courses connecting video games, cinema, visualization, and collaborative production.",
		},
		shortFilm: {
			eyebrow: "Film project",
			title: "Hostile",
			status: "Work in Progress",
			description: "A short-film project currently in development. More information to come.",
			confidential: "In development",
		},
		contact: {
			eyebrow: "Contact",
			title: "Join my Universe.",
			subtitle: "Let's tell its story.",
			email: "Email me",
			emailAddress: "andrei.bituleanu@umontreal.ca",
			github: "GitHub",
			githubHandle: "@StarPlatinumSan",
			githubUrl: "https://github.com/StarPlatinumSan",
			linkedin: "LinkedIn",
			linkedinName: "Andrei Bituleanu",
			linkedinUrl: "https://www.linkedin.com/in/andrei-bituleanu-65b1832aa/",
			location: "Montréal, QC",
			year: "2026",
			backToTop: "Back to top",
		},
		footer: "Andrei Bituleanu / Creative development",
	},
	fr: {
		languageName: "Français",
		identity: {
			name: "Andrei Bituleanu",
		},
		navigation: {
			work: "Projets",
			studio: "Studio",
			experience: "Expérience",
			education: "Formation",
			contact: "Contact",
			home: "Accueil",
			primaryLabel: "Navigation principale",
			switchLanguage: "Changer de langue",
			skipToContent: "Aller au contenu",
		},
		hero: {
			eyebrow: "Développeur créatif",
			lead: "Je crée des mondes",
			accent: "interactifs et narratifs",
			description:
				"Je suis Andrei Bituleanu, un game designer narratif, développeur web et d'expériences audiovisuelles, numériques, interactives et narratives. Je combine ces compétences avec le UI/UX de par mon expérience en design et frontend web dev et continue de les élargir afin de pouvoir partager ma passion de faire vibrer et réfléchir l'humanité à travers mes histoires.",
			primaryAction: "Explorer les projets",
			secondaryAction: "Contacte-moi",
			status: "C'est bien la chaîne de Belledonne",
			focus: "Focus actuel",
			focusValue: "Systèmes narratifs, projets FMV Unity, mondes UE5 3D et expériences web interactives.",
			profileAlt: "Portrait de Andrei Bituleanu",
		},
		projectSection: {
			eyebrow: "Projets choisis / 2024-2026",
			title: "Projets",
			introduction: "Une collection d'outils fullstack, de produits de données et d'expériences interactives. Explorez à votre rythme.",
			scrollCue: "Défiler pour explorer",
			previousProject: "Projet précédent",
			nextProject: "Projet suivant",
			viewProject: "Voir le projet",
			opensInNewTab: "S’ouvre dans un nouvel onglet",
			comingSoon: "Projet de cegep",
			imagePending: "Image prête à être remplacée",
			categoryLabel: "Catégorie",
			roleLabel: "Rôle",
			yearLabel: "Année",
			technologiesLabel: "Technologies",
			workInProgress: "Work in Progress",
		},
		studio: {
			eyebrow: "Studio indépendant",
			title: "Fracture Interactive",
			description: "Mon studio de jeux narratifs débute avec The Lucid, son premier projet : une expérience FMV sous Unity façonnée par l'atmosphère, les récits à embranchements et les choix du joueur.",
			featuredProject: "Premier projet du studio",
			productionStatus: "En développement",
			formatLabel: "Format",
			studioLabel: "Studio",
			releaseLabel: "Sortie",
			linksTitle: "Voir, suivre ou ajouter à la liste",
			linkComingSoon: "Bientôt",
			discoverProject: "Découvrir The Lucid",
			returnToStudio: "Revenir au studio",
		},
		experience: {
			eyebrow: "Expérience",
			title: "Mon Expérience",
			introduction: "Trois rôles reliés, à la croisée de l'enseignement, du développement produit et des interfaces visuelles.",
		},
		about: {
			eyebrow: "Compétences",
			title: "Deux disciplines créatives",
			introduction: "Des systèmes d'interface aux récits jouables, je combine deux ensembles d'outils complémentaires pour créer des expériences interactives complètes.",
			webLabel: "Développement web",
			gameLabel: "Développement jeu",
			education: "Formation",
		},
		educationSection: {
			eyebrow: "Formation",
			title: "Un parcours international",
			introduction: "",
		},
		relevantCourses: {
			eyebrow: "Formation",
			title: "Cours pertinents",
			introduction: "Deux cours de l’Université de Montréal à la croisée du jeu vidéo, du cinéma, de la visualisation et de la production en équipe.",
		},
		shortFilm: {
			eyebrow: "Projet cinématographique",
			title: "Hostile",
			status: "Work in Progress",
			description: "Un projet de court-métrage actuellement en développement. Plus d'informations à venir.",
			confidential: "En développement",
		},
		contact: {
			eyebrow: "Contact",
			title: "Rejoins mon Univers.",
			subtitle: "Racontons son histoire.",
			email: "Me contacter",
			emailAddress: "andrei.bituleanu@umontreal.ca",
			github: "GitHub",
			githubHandle: "@StarPlatinumSan",
			githubUrl: "https://github.com/StarPlatinumSan",
			linkedin: "LinkedIn",
			linkedinName: "Andrei Bituleanu",
			linkedinUrl: "https://www.linkedin.com/in/andrei-bituleanu-65b1832aa/",
			location: "Montréal, QC",
			year: "2026",
			backToTop: "Retour en haut",
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
			en: "Completed a four-month internship with a professor at Université de Montréal, developing a React interface for visual story manipulation with AI-assisted generation and editing.",
			fr: "Stage de 4 mois réalisé avec un professeur de l'Université de Montréal : développement d'une interface React pour manipuler des récits visuellement, avec assistance IA pour la génération et l'édition.",
		},
	},
	{
		period: { en: "Semesters 3 & 4", fr: "Trimestres 3 et 4" },
		place: { en: "2 teaching contracts", fr: "2 contrats d'enseignement" },
		role: { en: "Teaching Assistant", fr: "Auxiliaire d'enseignement" },
		summary: {
			en: "Held two teaching-assistant contracts across two semesters, totaling eight months, teaching web development to Université de Montréal students in IFT1005.",
			fr: "Deux contrats d'auxiliaire d'enseignement sur deux trimestres, soit 8 mois, pour enseigner le développement web aux étudiants de l'Université de Montréal dans le cours IFT1005.",
		},
	},
	{
		period: "2024-2025",
		place: { en: "Volunteer", fr: "Bénévolat" },
		role: { en: "Frontend Developer", fr: "Développeur frontend" },
		summary: {
			en: "Designed and developed the frontend for the UDEM 2025 Hackathon web app and the physics department's journal.",
			fr: "Design et développement frontend de l'application web du Hackathon UDEM 2025 et au journal du département de physique.",
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
			en: "University studies combining computer science and operations research.",
			fr: "Parcours universitaire combinant informatique et recherche opérationnelle.",
		},
	},
	{
		period: "M2",
		degree: {
			en: "Master 2-level academic exchange",
			fr: "Échange universitaire de niveau Master 2",
		},
		institution: {
			en: "Université Grenoble Alpes",
			fr: "Université Grenoble Alpes",
		},
		note: {
			en: "An international component of my academic path at Master 2 level.",
			fr: "Un volet international de mon parcours universitaire au niveau M2.",
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

export const relevantCourseItems = [
	{
		code: "JEU1003",
		title: {
			en: "Video Games and Cinema",
			fr: "Jeu vidéo et Cinéma",
		},
		institution: "Université de Montréal",
		description: {
			en: "I learned the theoretical foundations of developing narratological video game products that unite the worlds of cinema and video games.",
			fr: "J’y ai appris les fondations théoriques du développement de produits vidéoludiques narratologiques qui unissent les univers du cinéma et du jeu vidéo.",
		},
	},
	{
		code: "DIN3140",
		title: {
			en: "Design and Visualization Tools",
			fr: "Outils de conception et visualisation",
		},
		institution: "Université de Montréal",
		description: {
			en: "I designed and produced a short film within a supervised team.",
			fr: "J’y ai conçu et produit un court-métrage au sein d’une équipe encadrée.",
		},
	},
];

export const webTools = ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Node.js", "Express", "Java", "Spring Boot", "MongoDB", "PostgreSQL", "Git/GitHub", "Figma"];

export const gameTools = ["Unity", "C#", "Narrative Design", "Game Design", "Cinemachine", "Scriptable Objects", "2D Prototyping", "Level Design", "FMV Workflow", "Version Control"];

const localize = (value, language) => (typeof value === "object" && value !== null && !Array.isArray(value) ? value[language] : value);

const localizeFeature = (feature, language) => ({
	...feature,
	logo: feature.logo
		? {
				...feature.logo,
				alt: localize(feature.logo.alt, language),
			}
		: undefined,
	primaryImage: {
		...feature.primaryImage,
		alt: localize(feature.primaryImage.alt, language),
	},
	format: localize(feature.format, language),
	status: localize(feature.status, language),
	summary: localize(feature.summary, language),
	presentation: feature.presentation ? localize(feature.presentation, language) : undefined,
	transmedia: feature.transmedia ? localize(feature.transmedia, language) : null,
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
		yearLabel: project.yearLabel ? localize(project.yearLabel, language) : undefined,
		images: project.images.map((image) => ({
			...image,
			alt: localize(image.alt, language),
		})),
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
			images: project.images.map((image) => ({
				...image,
				alt: localize(image.alt, language),
			})),
		})),
	}));

export const getEchoesFeature = (language) => localizeFeature(echoesFeature, language);

export const getStudioFeature = (language) => localizeFeature(studioFeature, language);

export const getExperience = (language) =>
	experienceItems.map((item) => ({
		...item,
		period: localize(item.period, language),
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

export const getRelevantCourses = (language) =>
	relevantCourseItems.map((item) => ({
		...item,
		title: localize(item.title, language),
		description: localize(item.description, language),
	}));
