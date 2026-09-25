import MediaFrame from "./MediaFrame";
import { ArrowDown, ArrowUpRight } from "./Icons";

const profileImage = {
	src: "/Andrei.jpg",
	alt: "Portrait of Andrei Bituleanu",
	position: "center",
	label: "Portrait / 01",
};

export default function Hero({ copy }) {
	return (
		<section className="page-section hero-section" id="top" aria-labelledby="hero-title">

			<div className="hero-copy">
				<p className="eyebrow" data-hero-kicker>
					<span />
					{copy.hero.eyebrow}
				</p>
				<h1 id="hero-title" tabIndex="-1">
					<span className="hero-title-line">
						<span data-hero-line>{copy.hero.lead}</span>
					</span>
					<span className="hero-title-line">
						<em data-hero-line>{copy.hero.accent}</em>
					</span>
				</h1>
				<p className="hero-description" data-hero-fade>
					{copy.hero.description}
				</p>
				<div className="hero-actions" data-hero-fade>
					<a className="button button--primary" href="#choose">
						{copy.hero.primaryAction}
						<ArrowDown className="button-icon" />
					</a>
					<a className="text-link" href="#contact">
						{copy.hero.secondaryAction}
						<ArrowUpRight className="text-link-icon" />
					</a>
				</div>

				<aside className="hero-focus" data-hero-focus>
					<p>{copy.hero.focus}</p>
					<strong>{copy.hero.focusValue}</strong>
				</aside>
			</div>

			<div className="hero-visual" data-hero-visual>
				<MediaFrame image={{ ...profileImage, alt: copy.hero.profileAlt }} className="hero-portrait" accent="#e82bb7" eager fit="contain" />
				<div className="hero-status-card" data-hero-status>
					<span className="status-light" aria-hidden="true" />
					<p>{copy.hero.status}</p>
				</div>
			</div>

			<a className="hero-scroll" href="#choose" data-hero-scroll>
				<span>{copy.projectSection.scrollCue}</span>
				<ArrowDown />
			</a>
		</section>
	);
}
