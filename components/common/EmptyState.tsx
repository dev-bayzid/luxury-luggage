import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LucideIcon } from "lucide-react";
import { clsx } from "clsx";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  actionHref,
  onAction,
  className,
}) => {
  return (
    <div
      className={clsx(
        "py-16 sm:py-24 px-6 text-center rounded-3xl bg-neutral-50 border border-neutral-200/60 max-w-md mx-auto my-8",
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto mb-4">
        <Icon className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-neutral-500 mb-6 leading-relaxed">
        {description}
      </p>

      {actionText && (
        <>
          {actionHref ? (
            <Link href={actionHref}>
              <Button variant="primary" size="md">
                {actionText}
              </Button>
            </Link>
          ) : (
            <Button variant="primary" size="md" onClick={onAction}>
              {actionText}
            </Button>
          )}
        </>
      )}
    </div>
  );
};
