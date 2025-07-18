"use client";

import { useState } from "react";
import * as LucideIcons from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

export const FeatureCardForRibbonMenu = ({
  iconName,
  title,
  summary,
  description,
}: {
  iconName: keyof typeof LucideIcons;
  title: string;
  summary: string;
  description: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = LucideIcons[iconName] ?? LucideIcons.CircleAlert;

  return (
    <article
      className={cn(
        "w-72 shrink-0 snap-start px-1 transition-all duration-200 hover:scale-[1.02] hover:saturate-150"
      )}
    >
      <div className="flex flex-col gap-2">
        {/* Icon + Title Row */}
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium tracking-tight">{title}</h3>
        </div>

        <Separator />

        {/* Text */}
        <p
          className={cn(
            "text-xs leading-snug text-muted-foreground transition-all duration-150",
            expanded ? "line-clamp-none" : "line-clamp-3"
          )}
        >
          {expanded ? description : summary}
        </p>

        {/* Toggle */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="px-0 text-[11px] text-muted-foreground underline underline-offset-2 hover:text-primary"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show less" : "Read more"}
          </Button>
        </div>
      </div>
    </article>
  );
};
