import React from "react";
import { clsx } from "clsx";

interface AdminCardProps {
  title?: React.ReactNode;
  subtitle?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  headerClassName?: string;
  noPadding?: boolean;
}

export const AdminCard: React.FC<AdminCardProps> = ({
  title,
  subtitle,
  badge,
  action,
  children,
  className,
  bodyClassName,
  headerClassName,
  noPadding = false,
}) => {
  const hasHeader = Boolean(title || subtitle || action || badge);

  return (
    <div
      className={clsx(
        "bg-[#121212] border border-[#222222] rounded-2xl shadow-xl transition-all duration-200",
        className
      )}
    >
      {hasHeader && (
        <div
          className={clsx(
            "px-6 py-4 border-b border-[#1F1F1F] flex items-center justify-between gap-4",
            headerClassName
          )}
        >
          <div>
            <div className="flex items-center gap-2.5">
              {typeof title === "string" ? (
                <h3 className="text-sm font-semibold tracking-wide text-neutral-100 font-display">
                  {title}
                </h3>
              ) : (
                title
              )}
              {badge}
            </div>
            {subtitle && (
              <p className="text-xs text-neutral-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={clsx(!noPadding && "p-6", bodyClassName)}>{children}</div>
    </div>
  );
};
