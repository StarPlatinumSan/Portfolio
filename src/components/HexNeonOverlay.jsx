import { useEffect, useRef, useState } from "react";
import "./HexNeonOverlay.css";

const BUTTERFLY_LIFETIME_MS = 3800;
const BUTTERFLY_SPAWN_INTERVAL_MS = 720;
const BUTTERFLY_MAX_ACTIVE = 12;

function createButterfly(id) {
	const size = 28 + Math.random() * 42;
	return {
		id,
		top: 6 + Math.random() * 88,
		left: 4 + Math.random() * 92,
		size,
		rotation: -10 + Math.random() * 20,
		alpha: 0.35 + Math.random() * 0.32,
		driftX: -9 + Math.random() * 18,
		driftY: -8 + Math.random() * 8,
	};
}

export default function HexNeonOverlay() {
	const [butterflies, setButterflies] = useState([]);
	const idRef = useRef(0);
	const timeoutIdsRef = useRef([]);

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			const burstCount = Math.random() > 0.65 ? 2 : 1;
			const newButterflies = Array.from({ length: burstCount }, () => {
				const butterfly = createButterfly(idRef.current);
				idRef.current += 1;
				return butterfly;
			});

			setButterflies((previous) => {
				const next = [...previous, ...newButterflies];
				return next.length > BUTTERFLY_MAX_ACTIVE ? next.slice(next.length - BUTTERFLY_MAX_ACTIVE) : next;
			});

			newButterflies.forEach((butterfly) => {
				const timeoutId = window.setTimeout(() => {
					setButterflies((previous) => previous.filter((item) => item.id !== butterfly.id));
				}, BUTTERFLY_LIFETIME_MS);
				timeoutIdsRef.current.push(timeoutId);
			});
		}, BUTTERFLY_SPAWN_INTERVAL_MS);

		return () => {
			window.clearInterval(intervalId);
			timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
		};
	}, []);

	return (
		<div className="butterfly-neon-layer" aria-hidden="true">
			{butterflies.map((butterfly) => (
				<span
					key={butterfly.id}
					className="butterfly-neon butterfly-neon-red"
					style={{
						top: `${butterfly.top}%`,
						left: `${butterfly.left}%`,
						width: `${butterfly.size}px`,
						height: `${butterfly.size}px`,
						"--butterfly-rotate": `${butterfly.rotation}deg`,
						"--butterfly-alpha": butterfly.alpha,
						"--butterfly-drift-x": `${butterfly.driftX}px`,
						"--butterfly-drift-y": `${butterfly.driftY}px`,
					}}
				>
					<svg className="butterfly-neon-shape" viewBox="0 0 100 100" aria-hidden="true">
						<g className="butterfly-wings">
							<ellipse cx="32" cy="34" rx="18" ry="14" />
							<ellipse cx="68" cy="34" rx="18" ry="14" />
							<ellipse cx="34" cy="66" rx="14" ry="18" />
							<ellipse cx="66" cy="66" rx="14" ry="18" />
						</g>
						<line x1="50" y1="22" x2="50" y2="78" />
						<path d="M50 24 Q44 16 40 14" />
						<path d="M50 24 Q56 16 60 14" />
					</svg>
				</span>
			))}
		</div>
	);
}
