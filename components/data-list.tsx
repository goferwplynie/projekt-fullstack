// ── Generic DataList component ───────────────────────────────────────────────
// This is a generic component that renders a list of any typed items.
// Satisfies: "Utworzenie generycznego komponentu*"

import { cn } from "@/lib/utils";
import type { DataListProps } from "@/types/portfolio";

export function DataList<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = "No items to display.",
  className,
}: DataListProps<T>) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4", className)}>
      {items.map((item, index) => (
        <div key={keyExtractor(item)}>{renderItem(item, index)}</div>
      ))}
    </div>
  );
}
