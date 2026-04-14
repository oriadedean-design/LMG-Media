import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

interface SanityImageProps {
  image: any;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function SanityImage({
  image,
  alt,
  className = '',
  fill = false,
  width,
  height,
  priority = false,
}: SanityImageProps) {
  if (!image?.asset) return null;

  const imageUrl = urlForImage(image)?.url();

  if (!imageUrl) return null;

  return (
    <div className={`relative overflow-hidden ${className} ${fill ? 'w-full h-full' : ''}`}>
      <Image
        src={imageUrl}
        alt={alt}
        fill={fill}
        width={!fill ? width || 800 : undefined}
        height={!fill ? height || 600 : undefined}
        className="object-cover transition-transform duration-700 hover:scale-105"
        priority={priority}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
