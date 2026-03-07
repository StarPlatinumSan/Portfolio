import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Menu, ArrowRight, Globe, Briefcase, Github, ExternalLink } from "lucide-react";
import HexNeonOverlay from "./components/HexNeonOverlay";
import "./App.css";

const TRAIL_LIFETIME_MS = 700;
const TRAIL_EMIT_GAP_MS = 14;
const TRAIL_MAX_POINTS = 40;

const content = {
	fr: {
		brandName: "Andrei Bituleanu",
		brandSub: "Jeux • Web • Creative Tech",
		nav: { intro: "Introduction", projects: "Projets", experience: "Expérience", about: "À propos", contact: "Contact" },
		langToggleLabel: "Langue",
		openMenuLabel: "Ouvrir le menu",
		toolsAria: "Catégorie des outils",
		profileCardAria: "Espace photo de profil",
		profileAlt: "Photo de profil Andrei Bituleanu",
		brandAlt: "Fracture Interactive",
		studioLogoAlt: "Logo Fracture Interactive",
		hero: {
			kicker: "> Chargement complété",
			titleLines: ["Bonjour!", "Je suis Andrei", "Bituleanu"],
			description: "Avec 1 an d'expérience en développement web et un niveau junior en Unity narratif.",
			discover: "Découvrir",
			contact: "Contact",
			currentFocus: "Focus actuel",
			focusTitle: "Game Dev, Design et Systèmes Narratifs.",
			focusDescription: "Je suis un designer/développeur junior en jeu et narration. J'aime créer des récits à embranchements et des systèmes de jeu sur Unity et sur le web.",
			metrics: [
				["10", "Projets"],
				["02", "Jeux"],
				["100%", "Ambitieux"],
			],
		},
		featured: { kicker: "Featured", title: "Développeur Web", lines: ["Frontend", "Fullstack", "React + Springboot/Express"] },
		intro: {
			section: "Introduction",
			title: "Créateur d'Expériences Interactives Narratives et d'Applications Fullstack",
			p1: "Salut! Je suis Andrei Bituleanu, développeur créatif axé sur les systèmes de jeu, le design narratif et les expériences web. Je combine exécution technique, direction visuelle et storytelling.",
			p2: "Avec mon studio indé, je construis des projets originaux qui mélangent gameplay, atmosphère et narration. Mon objectif est de créer des histoires qui captivent les joueurs.",
		},
		studio: {
			section: "Studio Indé",
			title: "Fracture Interactive",
			copy:
				"Fracture Interactive est mon studio indé pour le développement de jeux narratifs. Le focus est sur les choix du joueur, l'atmosphère et les systèmes narratifs à embranchements. Principalement sous Unity, avec l'objectif d'explorer aussi Unreal.",
			button: "Site du Studio",
		},
		webSection: { section: "Projets", title: "Projets Notables", groupTitle: "Projets Web" },
		experienceSection: { section: "Expérience", title: "Mon Apport" },
		about: {
			section: "À propos",
			title: "Mon Stack",
			webButton: "Outils Web",
			gameButton: "Outils Game Dev",
			webStackTitle: "Stack Développement Web",
			gameStackTitle: "Stack Développement Jeu",
			educationTitle: "Formation",
			educationItems: [
				{
					degree: "Informatique et recherche opérationnelle",
					period: "Août 2023 - Avril 2027",
					institution: "Université de Montréal",
					highlights: ["Parcours universitaire international", "Échange universitaire à l'Université Grenoble Alpes - niveau Master 2 validé"],
				},
				{
					degree: "DEC - Sciences informatiques et mathématiques",
					period: "Août 2021 - Mai 2023",
					institution: "CÉGEP Maisonneuve",
					highlights: [],
				},
			],
		},
		contactSection: { section: "Contact", title: "Rejoignez-moi!", github: "GitHub", linkedin: "LinkedIn" },
		viewLabel: "Voir",
		projectImagePlaceholder: "Ajouter une image",
		studioImagePlaceholder: "Ajouter une image du projet",
		webProjects: [
			{
				title: "Visual Story-Writing",
				type: "Application Web Fullstack",
				year: "2026",
				description: "Interface React d'écriture narrative où les histoires sont manipulées visuellement via entités, actions et lieux, avec réécriture assistée par IA.",
				stack: ["React", "TypeScript", "Express", "Proxy", "OpenAI API", "Local AI Integration"],
				image: "./demo.gif",
				imageAlt: "Aperçu Visual Story-Writing",
				link: "https://github.com/StarPlatinumSan/VisualStoryWriting-Andrei",
			},
			{
				title: "MaVille",
				type: "Application Web Fullstack",
				year: "2025",
				description: "Plateforme d'information urbaine pour Montréal avec authentification, API de chantiers en cours, carte Leaflet interactive et notifications.",
				stack: ["React", "Spring Boot", "Java", "JSON API", "Docker", "Leaflet", "Authentication"],
				image: "./maville.png",
				imageAlt: "Aperçu MaVille",
				link: "https://github.com/StarPlatinumSan/MaVille",
			},
			{
				title: "FootballDB",
				type: "Application Web Fullstack",
				year: "2025",
				description: "Plateforme de statistiques football pour interroger matchs, équipes et joueurs via API REST et base SQL. Backend Kotlin conteneurisé avec Docker.",
				stack: ["React", "TypeScript", "Ktor", "PostgreSQL", "Exposed ORM", "Docker", "REST API"],
				image: "./footballdb.png",
				imageAlt: "Aperçu FootballDB",
				link: "https://github.com/StarPlatinumSan/Projet-Groupe32",
			},
			{
				title: "Heartbeat QTE Reflex Game",
				type: "Jeu Web Interactif",
				year: "2025",
				description: "Jeu réflexe QTE où il faut appuyer exactement quand le battement passe dans la zone cible, avec feedback visuel très réactif.",
				stack: ["React", "JavaScript", "CSS Animations", "Game Logic"],
				image: "./heartbeat.png",
				imageAlt: "Aperçu Heartbeat QTE",
				link: "https://heartbeat-qte-stay-calm.vercel.app/",
			},
			{
				title: "QTE Reflex Trainer",
				type: "Jeu Web Interactif",
				year: "2025",
				description: "Application navigateur pour entraîner la précision de timing inspirée des systèmes QTE des jeux.",
				stack: ["React", "JavaScript", "Animation Timing", "UI Interaction"],
				image: "./qte.png",
				imageAlt: "Aperçu QTE Reflex Trainer",
				link: "https://qte-roan.vercel.app/",
			},
			{
				title: "Responsive Course Website",
				type: "Site Frontend",
				year: "2024",
				description: "Site web responsive et interactif pour des cours universitaires, avec mise en page moderne et UX mobile.",
				stack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
				image: "./designresp.png",
				imageAlt: "Aperçu site de cours responsive",
				link: "https://starplatinumsan.github.io/Design-Responsive/",
			},
			{
				title: "D3.js Boxplot Graph",
				type: "Outil de Data Visualization",
				year: "2025",
				description: "Application D3.js pour analyser des données de joueurs d'échecs et produire des graphes interactifs de classement.",
				stack: ["D3.js", "JavaScript", "SVG", "Data Visualization"],
				image: "./d3.png",
				imageAlt: "Aperçu graphe D3",
				link: "https://github.com/StarPlatinumSan/AndreiBituleanu-FIDE",
			},
			{
				title: "D&D Character Creator",
				type: "Application Web Serverless",
				year: "2026",
				description: "Plateforme de création de personnages avec authentification, sauvegarde cloud et architecture serverless.",
				stack: ["React", "Authentication", "Serverless Functions", "Database"],
				image: "./dnd.png",
				imageAlt: "Aperçu créateur D&D",
				link: "https://github.com/StarPlatinumSan/DND_Builder_App",
			},
		],
		studioProjects: [
			{
				title: "The Lucid",
				format: "Jeu Narratif FMV",
				status: "Prototype",
				summary: "Expérience à embranchements avec acteurs réels, où les choix du joueur modifient scènes et fins via système de variables.",
				image: "/lucid.jpg",
				imageAlt: "Aperçu The Lucid",
				link: "#",
			},
			{
				title: "Forgotten Gods Protocol",
				format: "Projet RPG top-down",
				status: "Conception",
				summary: "RPG 2D top-down centré sur la narration et les systèmes de combat, construit en équipe de 2.",
				image: "/forgottengods.png",
				imageAlt: "Aperçu Forgotten Gods Protocol",
				link: "#",
			},
		],
		experience: [
			{ role: "Stage Projet Uni - Visual StoryWriting App", place: "Stage", period: "2026", summary: "Développement d'une interface React pour manipuler des récits visuellement, avec IA pour assister génération et amélioration narrative." },
			{ role: "Assistant d'Enseignement", place: "Contrat", period: "Semestre 3 & Semestre 4", summary: "Mentorat et enseignement du développement web aux étudiants de l'Université de Montréal." },
			{ role: "Développeur Frontend", place: "Bénévolat", period: "2024 - 2025", summary: "Contribution à des apps web comme le Hackathon UDEM 2025 et le journal du département de physique UDEM." },
		],
		webDevTools: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Node.js", "Express", "Java", "Spring Boot", "MongoDB", "PostgreSQL", "Git/GitHub", "Figma"],
		gameDevTools: ["Unity", "C#", "Narrative Design", "Game Design", "Cinemachine", "Scriptable Objects", "2D Prototyping", "Level/Technical Design", "FMV Editing Workflow", "Version Control"],
	},
	en: {
		brandName: "Andrei Bituleanu",
		brandSub: "Game Dev • Web • Creative Tech",
		nav: { intro: "Introduction", projects: "Projects", experience: "Experience", about: "About", contact: "Contact" },
		langToggleLabel: "Language",
		openMenuLabel: "Open menu",
		toolsAria: "Tools category",
		profileCardAria: "Profile picture placeholder",
		profileAlt: "Andrei Bituleanu profile picture",
		brandAlt: "Fracture Interactive",
		studioLogoAlt: "Fracture Interactive logo",
		hero: {
			kicker: "> Fetched data",
			titleLines: ["Greetings!", "I'm Andrei", "Bituleanu"],
			description: "With 1 year of experience in web development and a junior level in narrative Unity game development.",
			discover: "Discover",
			contact: "Contact",
			currentFocus: "Current Focus",
			focusTitle: "Game Dev, Design and Narrative Systems.",
			focusDescription: "I'm a junior Game/Narrative Designer and Developer that loves creating compelling branching narratives and game systems alongside Unity and web projects.",
			metrics: [
				["10", "Projects"],
				["02", "Games"],
				["100%", "Ambitious"],
			],
		},
		featured: { kicker: "Featured", title: "Web Developer", lines: ["Frontend", "Fullstack", "React + Springboot/Express"] },
		intro: {
			section: "Introduction",
			title: "Builder of Story-Driven Interactive Experiences AND Fullstack Applications",
			p1: "Hi! I'm Andrei Bituleanu, a creative developer focused on game systems, narrative design, and web experiences. I combine technical execution with a strong creative, visual, and storytelling mindset.",
			p2: "Through my indie studio, I develop original projects that merge gameplay, atmosphere, and narrative design. My goal is to create stories that excite, inspire, and captivate players.",
		},
		studio: {
			section: "Indie Studio",
			title: "Fracture Interactive",
			copy: "Fracture Interactive is my indie studio for narrative-first game development. The focus is on meaningful player choice, atmosphere, and branching story systems. Mainly built with Unity, with the goal of exploring Unreal as well.",
			button: "Studio Website",
		},
		webSection: { section: "Projects", title: "Selected Work", groupTitle: "Web Projects" },
		experienceSection: { section: "Experience", title: "What I Bring" },
		about: {
			section: "About",
			title: "My Stack",
			webButton: "Web Dev Tools",
			gameButton: "Game Dev Tools",
			webStackTitle: "Web Development Stack",
			gameStackTitle: "Game Development Stack",
			educationTitle: "Education",
			educationItems: [
				{
					degree: "Computer Science and Operations Research",
					period: "August 2023 - April 2027",
					institution: "University of Montreal",
					highlights: ["5-year international university track", "Exchange semester at Université Grenoble Alpes - validated at Master 2 level"],
				},
				{
					degree: "DEC - Computer Science and Mathematics",
					period: "August 2021 - May 2023",
					institution: "CÉGEP Maisonneuve",
					highlights: [],
				},
			],
		},
		contactSection: { section: "Contact", title: "Let's build together.", github: "GitHub", linkedin: "LinkedIn" },
		viewLabel: "View",
		projectImagePlaceholder: "Add project image",
		studioImagePlaceholder: "Add project image",
		webProjects: [
			{
				title: "Visual Story-Writing",
				type: "Fullstack Web App",
				year: "2026",
				description: "A React-based writing interface where stories can be manipulated visually through entities, actions, and locations, combining text editing with interactive narrative structures and AI-assisted rewriting.",
				stack: ["React", "TypeScript", "Express", "Proxy", "OpenAI API", "Local AI Integration"],
				image: "./demo.gif",
				imageAlt: "Visual Story-Writing preview",
				link: "https://github.com/StarPlatinumSan/VisualStoryWriting-Andrei",
			},
			{
				title: "MaVille",
				type: "Fullstack Web App",
				year: "2025",
				description: "A city information platform for Montreal featuring authentication, API-driven data about current construction work, interactive Leaflet maps, and notification systems to track urban updates.",
				stack: ["React", "Spring Boot", "Java", "JSON API", "Docker", "Leaflet", "Authentication"],
				image: "./maville.png",
				imageAlt: "MaVille app preview",
				link: "https://github.com/StarPlatinumSan/MaVille",
			},
			{
				title: "FootballDB",
				type: "Fullstack Web App",
				year: "2025",
				description: "A football statistics platform allowing users to query matches, teams, and players from a relational SQL database through a REST API. Built with a Kotlin backend and containerized with Docker for reproducible development.",
				stack: ["React", "TypeScript", "Ktor", "PostgreSQL", "Exposed ORM", "Docker", "REST API"],
				image: "./footballdb.png",
				imageAlt: "FootballDB application preview",
				link: "https://github.com/StarPlatinumSan/Projet-Groupe32",
			},
			{
				title: "Heartbeat QTE Reflex Game",
				type: "Interactive Web Game",
				year: "2025",
				description: "A reflex-based quick-time event game where players must press inputs at the exact moment a moving beat crosses a target zone, emphasizing timing precision and responsive UI feedback.",
				stack: ["React", "JavaScript", "CSS Animations", "Game Logic"],
				image: "./heartbeat.png",
				imageAlt: "Heartbeat QTE reflex game preview",
				link: "https://heartbeat-qte-stay-calm.vercel.app/",
			},
			{
				title: "QTE Reflex Trainer",
				type: "Interactive Web Game",
				year: "2025",
				description: "A browser-based reflex training application inspired by quick-time event systems used in games, allowing players to practice timing accuracy through dynamic visual cues.",
				stack: ["React", "JavaScript", "Animation Timing", "UI Interaction"],
				image: "./qte.png",
				imageAlt: "QTE reflex trainer preview",
				link: "https://qte-roan.vercel.app/",
			},
			{
				title: "Responsive Course Website",
				type: "Frontend Website",
				year: "2024",
				description: "A responsive and interactive website created for university courses, showcasing modern layout design, mobile responsiveness, and interactive UI elements for educational content.",
				stack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
				image: "./designresp.png",
				imageAlt: "Responsive course website preview",
				link: "https://starplatinumsan.github.io/Design-Responsive/",
			},
			{
				title: "D3.js Boxplot Graph",
				type: "Data Visualization Tool",
				year: "2025",
				description: "A D3.js web app that allows users to analyse data from the Chess FDA database and generate interactive ranking graphs for chess players.",
				stack: ["D3.js", "JavaScript", "SVG", "Data Visualization"],
				image: "./d3.png",
				imageAlt: "D3 ranking graph preview",
				link: "https://github.com/StarPlatinumSan/AndreiBituleanu-FIDE",
			},
			{
				title: "D&D Character Creator",
				type: "Serverless Web App",
				year: "2026",
				description: "A character creation platform where users can authenticate, build role-playing characters, and save them online using a serverless architecture.",
				stack: ["React", "Authentication", "Serverless Functions", "Database"],
				image: "./dnd.png",
				imageAlt: "D&D character creator preview",
				link: "https://github.com/StarPlatinumSan/DND_Builder_App",
			},
		],
		studioProjects: [
			{
				title: "The Lucid",
				format: "FMV Narrative Game",
				status: "Prototype",
				summary: "A branching story experience, recorded and edited with real actors in a live production environment. The game lasts around 1 hour where player choices affect scenes and endings.",
				image: "/lucid.jpg",
				imageAlt: "The Lucid preview",
				link: "#",
			},
			{
				title: "Forgotten Gods Protocol",
				format: "Top-down RPG Project",
				status: "Conception",
				summary: "A 2D top-down RPG focused on storytelling and combat systems, built by a team of two.",
				image: "/forgottengods.png",
				imageAlt: "Forgotten Gods Protocol preview",
				link: "#",
			},
		],
		experience: [
			{
				role: "Uni Project Internship - Visual StoryWriting App",
				place: "Internship",
				period: "2026",
				summary: "Building a React-based writing interface where stories can be manipulated visually through entities, actions, and locations. It includes AI support for generation and editing.",
			},
			{ role: "Teaching Assistant", place: "Contract", period: "Semester 3 & Semester 4", summary: "Teaching and mentoring university students in web development at University of Montreal." },
			{ role: "Frontend Developer", place: "Volunteer", period: "2024 - 2025", summary: "Volunteer work on web apps such as UDEM's 2025 Hackathon and UDEM's physics department journal." },
		],
		webDevTools: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Node.js", "Express", "Java", "Spring Boot", "MongoDB", "PostgreSQL", "Git/GitHub", "Figma"],
		gameDevTools: ["Unity", "C#", "Narrative Design", "Game Design", "Cinemachine", "Scriptable Objects", "2D Prototyping", "Level/Technical Design", "FMV Editing Workflow", "Version Control"],
	},
};

const sectionTitle = "section-title";
const profileImg = "/Andrei_12.jpg";
const brandIcon = "/fracture_interactive_png.png";
const getInViewTextProps = (delay = 0) => ({
	initial: { opacity: 0, y: 16 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.2 },
	transition: { duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] },
});

const getInViewCardProps = (delay = 0) => ({
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.14 },
	transition: { duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] },
});

const getInViewTitleProps = (delay = 0) => ({
	initial: { opacity: 0, y: 34 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.2 },
	transition: { duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] },
});

function ProjectCard({ item, icon: Icon, viewLabel, imagePlaceholder }) {
	return (
		<motion.a {...getInViewCardProps(0.05)} whileHover={{ y: -4 }} href={item.link} className="project-card">
			<div className="project-card-bg" />
			<div className="project-card-ring" />
			<div className="project-card-media" aria-label={item.imageAlt || `${item.title} preview`}>
				{item.image ? <img src={item.image} alt={item.imageAlt || `${item.title} preview`} className="project-card-image" loading="lazy" /> : <span>{imagePlaceholder}</span>}
			</div>

			<div className="project-card-content">
				<div className="project-card-head">
					<div>
						<motion.p {...getInViewTextProps(0.08)} className="project-card-type">
							{item.type}
						</motion.p>
						<motion.h3 {...getInViewTitleProps(0.12)} className="project-card-title">
							{item.title}
						</motion.h3>
					</div>
					<div className="project-card-icon">
						<Icon className="icon-md" />
					</div>
				</div>

				<motion.p {...getInViewTextProps(0.16)} className="project-card-description">
					{item.description}
				</motion.p>

				<div className="stack-list">
					{item.stack.map((tech) => (
						<span key={tech} className="stack-chip">
							{tech}
						</span>
					))}
				</div>

				<div className="project-card-footer">
					<span className="project-year">{item.year}</span>
					<span className="project-view">
						{viewLabel} <ExternalLink className="icon-sm" />
					</span>
				</div>
			</div>
		</motion.a>
	);
}

function FeaturedCard({ featured }) {
	const ref = useRef(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const rotateX = useTransform(y, [-100, 100], [10, -10]);
	const rotateY = useTransform(x, [-100, 100], [-10, 10]);

	function handleMouseMove(event) {
		if (!ref.current) {
			return;
		}

		const rect = ref.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		x.set(event.clientX - centerX);
		y.set(event.clientY - centerY);
	}

	function handleMouseLeave() {
		x.set(0);
		y.set(0);
	}

	return (
		<motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ rotateX, rotateY, transformPerspective: 800 }} whileHover={{ scale: 1.05, x: -40, y: -18 }} className="hero-card-left">
			<div className="hero-card-left-inner">
				<div>
					<p className="hero-card-kicker">{featured.kicker}</p>
					<h3>{featured.title}</h3>
				</div>
				<div className="hero-card-list">
					{featured.lines.map((line) => (
						<p key={line}>{line}</p>
					))}
				</div>
			</div>
		</motion.div>
	);
}

function MouseTrailLayer() {
	const [trailPoints, setTrailPoints] = useState([]);
	const trailPointIdRef = useRef(0);
	const trailEmitTsRef = useRef(0);
	const trailTimeoutsRef = useRef([]);

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
		if (prefersReducedMotion || !hasFinePointer) {
			return undefined;
		}

		function handlePointerMove(event) {
			const now = performance.now();
			if (now - trailEmitTsRef.current < TRAIL_EMIT_GAP_MS) {
				return;
			}

			trailEmitTsRef.current = now;

			const point = {
				id: trailPointIdRef.current,
				x: event.clientX,
				y: event.clientY,
				size: 8 + Math.random() * 8,
			};
			trailPointIdRef.current += 1;

			setTrailPoints((previous) => {
				const next = [...previous, point];
				return next.length > TRAIL_MAX_POINTS ? next.slice(next.length - TRAIL_MAX_POINTS) : next;
			});

			const timeoutId = window.setTimeout(() => {
				setTrailPoints((previous) => previous.filter((item) => item.id !== point.id));
			}, TRAIL_LIFETIME_MS);
			trailTimeoutsRef.current.push(timeoutId);
		}

		window.addEventListener("pointermove", handlePointerMove, { passive: true });

		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			trailTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
		};
	}, []);

	return (
		<div className="mouse-draw-layer" aria-hidden="true">
			{trailPoints.map((point) => (
				<span key={point.id} className="mouse-trail-point" style={{ left: `${point.x}px`, top: `${point.y}px`, width: `${point.size}px`, height: `${point.size}px` }} />
			))}
		</div>
	);
}

export default function App() {
	const [language, setLanguage] = useState("fr");
	const [aboutToolsTab, setAboutToolsTab] = useState("web");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const t = content[language];
	const webProjects = t.webProjects;
	const studioProjects = t.studioProjects;
	const experience = t.experience;
	const webDevTools = t.webDevTools;
	const gameDevTools = t.gameDevTools;

	useEffect(() => {
		if ("scrollRestoration" in window.history) {
			window.history.scrollRestoration = "manual";
		}
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, []);

	useEffect(() => {
		if (!isMobileMenuOpen) {
			document.body.style.overflow = "";
			return;
		}
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	return (
		<div className="portfolio-root">
			<MouseTrailLayer />

			<HexNeonOverlay />

			<div className="hero-shell">
				<div className="hero-grid-overlay" />
				<div className="hero-radial-overlay" />
				<div className="hero-vertical-overlay" />

				<header className={`site-header ${isMobileMenuOpen ? "is-menu-open" : ""}`}>
					<div className="brand-wrap">
						<div>
							<p className="brand-top">{t.brandName}</p>
							<p className="brand-sub">{t.brandSub}</p>
						</div>
					</div>

					<nav className="main-nav">
						<a href="#intro">{t.nav.intro}</a>
						<a href="#studio">{t.nav.projects}</a>
						<a href="#experience">{t.nav.experience}</a>
						<a href="#about">{t.nav.about}</a>
						<a href="#contact">{t.nav.contact}</a>
					</nav>

					<button className="lang-toggle-btn" type="button" aria-label={t.langToggleLabel} onClick={() => setLanguage((prev) => (prev === "fr" ? "en" : "fr"))}>
						{language === "fr" ? "EN" : "FR"}
					</button>

					<button className="mobile-menu-btn" type="button" aria-label={t.openMenuLabel} aria-expanded={isMobileMenuOpen} aria-controls="mobile-sidebar-nav" onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
						<Menu className="icon-md" />
					</button>
				</header>

				{isMobileMenuOpen ? <button className="mobile-nav-overlay" type="button" aria-label="Close mobile menu" onClick={() => setIsMobileMenuOpen(false)} /> : null}
				<aside id="mobile-sidebar-nav" className={`mobile-sidebar ${isMobileMenuOpen ? "is-open" : ""}`} aria-hidden={!isMobileMenuOpen}>
					<nav className="mobile-nav-links">
						<a href="#intro" onClick={() => setIsMobileMenuOpen(false)}>
							{t.nav.intro}
						</a>
						<a href="#studio" onClick={() => setIsMobileMenuOpen(false)}>
							{t.nav.projects}
						</a>
						<a href="#experience" onClick={() => setIsMobileMenuOpen(false)}>
							{t.nav.experience}
						</a>
						<a href="#about" onClick={() => setIsMobileMenuOpen(false)}>
							{t.nav.about}
						</a>
						<a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
							{t.nav.contact}
						</a>
					</nav>
				</aside>
				<section className="hero-section">
					<div>
						<p className="hero-kicker">{t.hero.kicker}</p>
						<h1 className="hero-title">
							{t.hero.titleLines[0]}
							<br />
							{t.hero.titleLines[1]}
							<br />
							{t.hero.titleLines[2]}
						</h1>

						<motion.p {...getInViewTextProps(0.08)} className="hero-description">
							{t.hero.description}
						</motion.p>

						<div className="hero-actions">
							<motion.a {...getInViewTextProps(0.12)} href="#intro" className="btn btn-primary">
								{t.hero.discover} <ArrowRight className="icon-sm" />
							</motion.a>
							<motion.a {...getInViewTextProps(0.16)} href="#contact" className="btn btn-secondary">
								{t.hero.contact}
							</motion.a>
						</div>
					</div>

					<div className="hero-visual">
						<div className="hero-glow-red" />
						<div className="hero-glow-cyan" />

						<FeaturedCard featured={t.featured} />

						<div className="hero-card-right">
							<div className="hero-card-right-top">
								<p className="hero-card-kicker">{t.hero.currentFocus}</p>
								<div className="status-dot" />
							</div>

							<h3>{t.hero.focusTitle}</h3>

							<p>{t.hero.focusDescription}</p>

							<div className="hero-metrics">
								{t.hero.metrics.map(([value, label]) => (
									<div key={label} className="metric-box">
										<p>{value}</p>
										<p>{label}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>
			</div>

			<main className="content-shell">
				<section id="intro" className="page-section intro-section">
					<motion.div {...getInViewCardProps(0.02)} className="intro-photo-card" aria-label={t.profileCardAria}>
						<div className="intro-photo-placeholder">
							<img src={profileImg} alt={t.profileAlt} className="intro-photo" loading="lazy" />
						</div>
					</motion.div>

					<div className="intro-copy">
						<motion.p {...getInViewTextProps(0.04)} className={sectionTitle}>
							{t.intro.section}
						</motion.p>
						<motion.h2 {...getInViewTitleProps(0.08)}>{t.intro.title}</motion.h2>
						<motion.p {...getInViewTextProps(0.12)}>{t.intro.p1}</motion.p>
						<motion.p {...getInViewTextProps(0.16)}>{t.intro.p2}</motion.p>
					</div>
				</section>

				<section id="studio" className="page-section studio-section">
					<motion.div {...getInViewCardProps(0.04)} className="studio-head">
						<div className="studio-brand">
							<div className="studio-logo-wrap">
								<img src={brandIcon} alt={t.studioLogoAlt} className="studio-logo" />
							</div>
							<div>
								<motion.p {...getInViewTextProps(0.08)} className={sectionTitle}>
									{t.studio.section}
								</motion.p>
								<motion.h2 {...getInViewTitleProps(0.12)}>{t.studio.title}</motion.h2>
							</div>
						</div>
						<motion.p {...getInViewTextProps(0.16)} className="studio-copy">
							{t.studio.copy}
						</motion.p>
						<motion.a {...getInViewTextProps(0.2)} href="#" className="studio-link-btn">
							{t.studio.button} <ExternalLink className="icon-sm" />
						</motion.a>
					</motion.div>

					<div className="studio-grid">
						{studioProjects.map((project) => (
							<motion.a {...getInViewCardProps(0.06)} key={project.title} whileHover={{ y: -3 }} href={project.link} target="_blank" rel="noreferrer" className="studio-card">
								<div className="studio-card-image" aria-label={project.imageAlt || `${project.title} preview`}>
									{project.image ? <img src={project.image} alt={project.imageAlt || `${project.title} preview`} className="project-card-image" loading="lazy" /> : <span>{t.studioImagePlaceholder}</span>}
								</div>
								<div className="studio-card-body">
									<p className="studio-card-meta">
										{project.format} • {project.status}
									</p>
									<h3>{project.title}</h3>
									<p>{project.summary}</p>
								</div>
							</motion.a>
						))}
					</div>
				</section>

				<section className="page-section">
					<div className="section-head">
						<div>
							<motion.p {...getInViewTextProps(0.04)} className={sectionTitle}>
								{t.webSection.section}
							</motion.p>
							<motion.h2 {...getInViewTitleProps(0.08)}>{t.webSection.title}</motion.h2>
						</div>
					</div>

					<div className="project-group">
						<motion.div {...getInViewTextProps(0.1)} className="project-group-title">
							<Globe className="icon-md icon-cyan" />
							<h3>{t.webSection.groupTitle}</h3>
						</motion.div>
						<div className="project-grid">
							{webProjects.map((project) => (
								<ProjectCard key={project.title} item={project} icon={Globe} viewLabel={t.viewLabel} imagePlaceholder={t.projectImagePlaceholder} />
							))}
						</div>
					</div>
				</section>

				<section id="experience" className="page-section">
					<div className="section-top">
						<motion.p {...getInViewTextProps(0.04)} className={sectionTitle}>
							{t.experienceSection.section}
						</motion.p>
						<motion.h2 {...getInViewTitleProps(0.08)}>{t.experienceSection.title}</motion.h2>
					</div>

					<div className="experience-list">
						{experience.map((item) => (
							<motion.div {...getInViewCardProps(0.06)} key={item.role} whileHover={{ y: -3 }} className="experience-card">
								<div className="experience-line" />
								<div className="experience-content">
									<div className="experience-main">
										<div className="experience-place">
											<Briefcase className="icon-sm icon-red" />
											<p>{item.place}</p>
										</div>
										<h3>{item.role}</h3>
										<p className="experience-summary">{item.summary}</p>
									</div>
									<p className="experience-period">{item.period}</p>
								</div>
							</motion.div>
						))}
					</div>
				</section>

				<section id="about" className="page-section">
					<div className="about-grid">
						<div>
							<motion.p {...getInViewTextProps(0.04)} className={sectionTitle}>
								{t.about.section}
							</motion.p>
							<motion.h2 {...getInViewTitleProps(0.08)}>{t.about.title}</motion.h2>
						</div>
						<motion.div {...getInViewCardProps(0.12)} className="about-card">
							<div className={`about-tools-toggle ${aboutToolsTab === "game" ? "is-game" : "is-web"}`} role="tablist" aria-label={t.toolsAria}>
								<span className="about-tools-indicator" aria-hidden="true" />
								<button type="button" role="tab" aria-selected={aboutToolsTab === "web"} className={`about-tools-btn ${aboutToolsTab === "web" ? "is-active" : ""}`} onClick={() => setAboutToolsTab("web")}>
									{t.about.webButton}
								</button>
								<button type="button" role="tab" aria-selected={aboutToolsTab === "game"} className={`about-tools-btn ${aboutToolsTab === "game" ? "is-active" : ""}`} onClick={() => setAboutToolsTab("game")}>
									{t.about.gameButton}
								</button>
							</div>

							<div className="about-tools-panel" role="tabpanel">
								<motion.p {...getInViewTextProps(0.14)} className="about-tools-title">
									{aboutToolsTab === "web" ? t.about.webStackTitle : t.about.gameStackTitle}
								</motion.p>
								<div className="about-tools-list">
									{(aboutToolsTab === "web" ? webDevTools : gameDevTools).map((tool) => (
										<span key={tool} className="about-tool-chip">
											{tool}
										</span>
									))}
								</div>
							</div>
						</motion.div>

						<motion.div {...getInViewCardProps(0.16)} className="about-card about-education-card">
							<p className="about-tools-title">{t.about.educationTitle}</p>
							<div className="about-education-list">
								{t.about.educationItems.map((item) => (
									<article key={item.degree} className="about-education-item">
										<div className="about-education-head">
											<h3>{item.degree}</h3>
											<p>{item.period}</p>
										</div>
										<p className="about-education-school">{item.institution}</p>
										{item.highlights.length > 0 ? (
											<ul className="about-education-highlights">
												{item.highlights.map((highlight) => (
													<li key={highlight}>{highlight}</li>
												))}
											</ul>
										) : null}
									</article>
								))}
							</div>
						</motion.div>
					</div>
				</section>

				<section id="contact" className="page-section">
					<motion.div {...getInViewCardProps(0.08)} className="contact-card">
						<div className="contact-content">
							<div>
								<motion.p {...getInViewTextProps(0.12)} className={sectionTitle}>
									{t.contactSection.section}
								</motion.p>
								<motion.h2 {...getInViewTitleProps(0.16)}>{t.contactSection.title}</motion.h2>
								<motion.p {...getInViewTextProps(0.2)} className="contact-copy">
									<a href="mailto:andrei.bituleanu@umontreal.ca">andrei.bituleanu@umontreal.ca</a>
								</motion.p>
							</div>

							<div className="contact-actions">
								<motion.a {...getInViewTextProps(0.24)} href="https://github.com/StarPlatinumSan" target="_blank" rel="noreferrer" className="btn btn-plain">
									<Github className="icon-sm" /> {t.contactSection.github}
								</motion.a>
								<motion.a {...getInViewTextProps(0.28)} href="https://www.linkedin.com/in/andrei-bituleanu-65b1832aa/" target="_blank" rel="noreferrer" className="btn btn-primary">
									<ExternalLink className="icon-sm" /> {t.contactSection.linkedin}
								</motion.a>
							</div>
						</div>
					</motion.div>
				</section>
			</main>
		</div>
	);
}
