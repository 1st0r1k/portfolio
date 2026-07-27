export function ProjectThumbnail({ title, image }: { title: string; image?: string }) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt={`${title} screenshot`} className="aspect-video w-full rounded-md object-cover" />
  }

  return (
    <div
      role="img"
      aria-label={`${title} screenshot coming soon`}
      className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-text-secondary/40 bg-background text-center"
    >
      <span className="px-4 font-mono text-xs text-text-secondary">{title}</span>
    </div>
  )
}
