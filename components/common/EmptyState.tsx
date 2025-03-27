import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  message,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {Icon && <Icon className="h-12 w-12 text-muted-foreground/60 mb-4" />}
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <p className="text-muted-foreground">{message}</p>
      {(actionLabel && actionHref) || onAction ? (
        <Button className="mt-4" onClick={onAction} asChild={!!actionHref}>
          {actionHref ? <a href={actionHref}>{actionLabel}</a> : actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
