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
      ) : (
        <div className="media-placeholder" aria-hidden="true">
          <span className="media-placeholder__index">{image.label}</span>
          <span className="media-placeholder__mark">AB</span>
          <span className="media-placeholder__path">{image.src}</span>
        </div>
      )}
    </figure>
  )
}
