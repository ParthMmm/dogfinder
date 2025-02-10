import { X } from "lucide-react";
import { Badge } from "./ui/badge";

export function FilterBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      className="gap-1 border-orange-600/20 bg-orange-50 text-orange-800 dark:border-orange-400/20 dark:bg-orange-400/10 dark:text-orange-500"
      variant={"none"}
    >
      {children}
    </Badge>
  );
}

export function FilterBadgeXButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-sm text-stone-400 transition-colors hover:text-stone-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-orange-500 focus-visible:ring-0 dark:text-stone-700"
    >
      <X className="h-4 w-4" />
    </button>
  );
}
