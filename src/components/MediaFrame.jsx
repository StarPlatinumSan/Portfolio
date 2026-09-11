import { resolvePublicAsset } from '../data/assets'

export default function MediaFrame({
  image,
  className = '',
  accent = '#e82bb7',
  eager = false,
  fit = 'cover',
}) {
  const imageSource = resolvePublicAsset(image.src)
  const centeredCropStyle = image.centeredCrop
    ? {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: 'auto',
        transform: 'translate(-50%, -50%)',
      }
    : null

  return (
    <figure
      className={`media-frame ${className}`}
      style={{ '--media-accent': accent }}
      data-image-path={image.src}
    >
      {imageSource ? (
        <picture>
          {image.motionFallback && (
            <source
              media="(prefers-reduced-motion: reduce)"
              srcSet={resolvePublicAsset(image.motionFallback)}
            />
          )}
          <img
            src={imageSource}
            alt={image.alt}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'auto'}
            decoding="async"
            style={{
              objectFit: image.fit ?? fit,
              objectPosition: image.position ?? 'center',
              ...centeredCropStyle,
            }}
          />
        </picture>
      ) : (
        <div className="media-placeholder" aria-hidden="true">
          <span className="media-placeholder-index">{image.label}</span>
          <span className="media-placeholder-mark">AB</span>
          <span className="media-placeholder-path">{image.src}</span>
        </div>
      )}
    </figure>
  )
}
