import Image from "next/image";

type SeriesCoverProps = {
  src: string | null;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackText?: string;
};

export default function SeriesCover({
  src,
  alt,
  className = "aspect-[3/4] w-full",
  width = 200,
  height = 300,
  fallbackText = "No cover",
}: SeriesCoverProps) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-zinc-300 px-3 text-center text-sm font-medium text-zinc-600 ${className}`}
      >
        {fallbackText}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover ${className}`}
      priority={false}
    />
  );
}