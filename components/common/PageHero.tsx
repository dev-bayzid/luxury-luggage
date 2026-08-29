import React from "react";
import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { clsx } from "clsx";

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  variant?: "dark" | "light";
  className?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  title,
  subtitle,
  breadcrumbs,
  variant = "light",
  className,
}) => {
  const isDark = variant === "dark";

  return (
    <div
      className={clsx(
        "relative pt-32 pb-14 sm:pt-40 sm:pb-20 border-b",
        isDark
          ? "bg-primary-dark text-white border-neutral-800"
          : "bg-neutral-50/80 text-primary border-neutral-200/80",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} className="mb-6" />}

        <div className="max-w-3xl">
          {badge && (
            <div className="mb-3">
              <Badge variant={isDark ? "gold" : "gold"}>{badge}</Badge>
            </div>
          )}

          <h1
            className={clsx(
              "text-3xl sm:text-5xl font-display font-extrabold tracking-tight",
              isDark ? "text-white" : "text-primary"
            )}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={clsx(
                "text-sm sm:text-base mt-3 leading-relaxed font-light",
                isDark ? "text-neutral-300" : "text-neutral-600"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
