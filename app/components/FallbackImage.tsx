"use client";

import React, { useState } from 'react';

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc: string;
}

export default function FallbackImage({ src, alt, fallbackSrc, className, ...props }: FallbackImageProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <img
      src={imgError || !src ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={() => setImgError(true)}
      {...props}
    />
  );
}
