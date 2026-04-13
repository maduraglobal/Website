"use client";

import React, { useState, useEffect } from 'react';

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop";

export default function FallbackImage({ src, alt, fallbackSrc = DEFAULT_FALLBACK, className, ...props }: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState<string | undefined>((src as string) || fallbackSrc);

  useEffect(() => {
    setImgSrc((src as string) || fallbackSrc);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else {
      // SVG data URI for a generic travel placeholder if both images fail
      const safeText = (alt || 'Image Not Available').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const rawSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'><rect width='1200' height='800' fill='#f3f4f6'/><path d='M0 800 L0 500 L300 200 L500 400 L800 150 L1200 450 L1200 800 Z' fill='#e5e7eb'/><circle cx='900' cy='200' r='60' fill='#fcd34d'/><text x='600' y='650' font-family='sans-serif' font-size='32' font-weight='bold' fill='#9ca3af' text-anchor='middle'>${safeText}</text></svg>`;
      setImgSrc(`data:image/svg+xml,${encodeURIComponent(rawSvg)}`);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}
