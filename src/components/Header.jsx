const primaryFloorIds = ["studio", "visual-story-writing", "experience", "education", "contact"];

const projectFloorIds = new Set(["visual-story-writing", "je-suis-quark", "maville", "short-film", "prop-hunt", "other-projects"]);

export default function Header({ copy, floors, activeFloorId, language, onLanguageChange }) {
	const primaryLabels = {
		studio: copy.navigation.studio,
		"visual-story-writing": copy.navigation.work,
		experience: copy.navigation.experience,
		education: copy.navigation.education,
		contact: copy.navigation.contact,
	};
	const primaryFloors = primaryFloorIds.map((id) => floors.find((floor) => floor.id === id)).filter(Boolean);

	const isPrimaryActive = (floorId) => {
		if (floorId === "visual-story-writing") {
			return projectFloorIds.has(activeFloorId);
		}

		if (floorId === "studio") {
			return activeFloorId === "studio" || activeFloorId === "the-lucid";
		}

		if (floorId === "education") {
			return activeFloorId === "education" || activeFloorId === "relevant-courses";
		}

		return activeFloorId === floorId;
	};

	return (
		<header className="site-header" data-header-reveal>
			<a className="brand" href="#top" aria-label={`Andrei Bituleanu, ${floors[0]?.label}`}>
				<span className="brand-name">
					Andrei Bituleanu
					<small>{copy.hero.eyebrow}</small>
				</span>
			</a>

			<nav className="desktop-nav" aria-label={copy.navigation.primaryLabel}>
				{primaryFloors.map((floor) => (
					<a key={floor.id} href={`#${floor.id}`} aria-current={isPrimaryActive(floor.id) ? "location" : undefined}>
						{primaryLabels[floor.id]}
					</a>
				))}
			</nav>

			<div className="header-actions">
				<button className="language-toggle" type="button" aria-label={`${copy.languageName}. ${copy.navigation.switchLanguage}`} onClick={onLanguageChange}>
					<span>{language === "en" ? "EN" : "FR"}</span>
					<span aria-hidden="true">/{language === "en" ? "FR" : "EN"}</span>
				</button>
			</div>
		</header>
	);
}
