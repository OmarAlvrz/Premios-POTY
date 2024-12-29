import React from 'react';

interface ImageLinkProps {
  imageUrl: string;
  altText: string;
}

const ImageLink: React.FC<ImageLinkProps> = ({ imageUrl, altText }) => {
  if (!imageUrl) return null;

  return (
    <div className="mt-2">
      <img 
        src={imageUrl} 
        alt={altText} 
        className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
      />
    </div>
  );
};

export default ImageLink;