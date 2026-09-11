export default function FloorProgress({ floors, activeIndex, progress, copy }) {
  const currentFloor = floors[activeIndex] ?? floors[0]

  return (
    <aside className="floor-progress" aria-label={copy.progressLabel}>
      <div className="floor-progress-counter" aria-hidden="true">
        <span>{String(activeIndex + 1).padStart(2, '0')}</span>
        <i />
        <span>{String(floors.length).padStart(2, '0')}</span>
      </div>
      <div
        className="floor-progress-track"
        role="progressbar"
        aria-label={copy.progressLabel}
        aria-valuemin="1"
        aria-valuemax={Math.max(floors.length, 1)}
        aria-valuenow={activeIndex + 1}
        aria-valuetext={`${copy.floorLabel} ${activeIndex + 1} ${copy.ofLabel} ${floors.length}: ${currentFloor?.label}`}
      >
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <p aria-live="polite">
        <span>{copy.floorLabel}</span>
        {currentFloor?.label}
      </p>
    </aside>
  )
}
