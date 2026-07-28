const BASE_PATH = '/portfolio'

export function ProjectGallery({ title, images }: { title: string; images: string[] }) {
  if (images.length === 0) {
    return null
  }

  return (
    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {images.map((image, index) => (
        <a
          key={image}
          href={`${BASE_PATH}${image}`}
          target="_blank"
          rel="noreferrer"
          className="block overflow-hidden rounded-md"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE_PATH}${image}`}
            alt={`${title} screenshot ${index + 2}`}
            className="aspect-video w-full object-cover transition-opacity hover:opacity-80"
          />
        </a>
      ))}
    </div>
  )
}
