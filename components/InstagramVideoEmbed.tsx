type InstagramVideoEmbedProps = {
  url: string;
  title: string;
  className?: string;
};

function getInstagramEmbedUrl(url: string) {
  const match = url.match(/instagram\.com\/reels?\/([^/?#]+)/i);
  if (!match) {
    return url;
  }

  return `https://www.instagram.com/reel/${match[1]}/embed`;
}

export function InstagramVideoEmbed({
  url,
  title,
  className = '',
}: InstagramVideoEmbedProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-white ${className}`}>
      <iframe
        src={getInstagramEmbedUrl(url)}
        title={title}
        className="h-full w-full"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        scrolling="no"
        style={{ overflow: 'hidden' }}
      />
    </div>
  );
}
