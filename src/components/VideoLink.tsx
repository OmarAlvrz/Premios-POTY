import React from 'react';

interface VideoLinkProps {
  url: string;
  title: string;
}

const VideoLink: React.FC<VideoLinkProps> = ({ url, title }) => {
  if (!url) return null;

  // Extraer el ID del video de YouTube si es un enlace de YouTube
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(url);

  return (
    <div className="mt-2">
      {videoId ? (
        <div className="relative aspect-video w-full max-w-2xl mx-auto">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg shadow-lg"
          />
        </div>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-[#F2A366] hover:text-[#e89255] transition-colors"
        >
          Ver clip
        </a>
      )}
    </div>
  );
};

export default VideoLink;