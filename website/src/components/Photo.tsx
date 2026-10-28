import Image from "next/image";
import { isStock } from "@/content/site";

// Shows a small "Placeholder photo" tag on stock imagery so reviewers never
// mistake it for FFS premises or projects. Set NEXT_PUBLIC_HIDE_PLACEHOLDER_TAGS=1 to hide.
const showTags = process.env.NEXT_PUBLIC_HIDE_PLACEHOLDER_TAGS !== "1";

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  preload?: boolean;
  position?: string;
};

export function Photo({ src, alt, sizes, className, preload, position }: PhotoProps) {
  return (
    <div className={`photo${className ? ` ${className}` : ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        style={position ? { objectPosition: position } : undefined}
      />
      {showTags && isStock(src) ? <span className="photo-tag">Placeholder photo</span> : null}
    </div>
  );
}
