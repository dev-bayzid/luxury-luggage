import React from "react";
import { Star } from "lucide-react";
import { clsx } from "clsx";

interface RatingProps {
  rating: number; // e.g. 4.9
  reviewCount?: number;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  reviewCount,
  showText = true,
  size = "md",
  className,
}) => {
  const sizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-sm",
  };

  return (
    <div className={clsx("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5 text-accent">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= Math.floor(rating);
          const isHalf = !isFilled && star - rating <= 0.5;

          return (
            <span key={star} className="relative">
              <Star
                className={clsx(
                  sizes[size],
                  isFilled
                    ? "fill-accent text-accent"
                    : isHalf
                    ? "fill-accent/50 text-accent"
                    : "fill-neutral-200 text-neutral-300"
                )}
              />
            </span>
          );
        })}
      </div>
      {showText && (
        <span className={clsx("text-neutral-500 font-medium", textSizes[size])}>
          <span className="font-semibold text-primary">{rating.toFixed(1)}</span>
          {reviewCount !== undefined && <span> ({reviewCount})</span>}
        </span>
      )}
    </div>
  );
};
