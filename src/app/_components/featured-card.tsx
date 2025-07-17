"use client"

import { useState } from "react"
import * as LucideIcons from "lucide-react"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils" // Optional: className merging utility if you use one

export const FeatureCard = ({
  iconName,
  title,
  summary,
  description,
}: {
  iconName: keyof typeof LucideIcons
  title: string
  summary: string
  description: string
}) => {
  const [expanded, setExpanded] = useState(false)
  const Icon = LucideIcons[iconName] ?? LucideIcons.CircleAlert

  return (
    <div
      className={cn(
        "shrink-0 w-72 bg-gray-850 border border-gray-700 rounded-2xl p-6",
        "hover:border-gray-600 hover:shadow-md hover:shadow-black/20 transition-all duration-200",
        "flex flex-col justify-between"
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gray-700 rounded-md">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-white tracking-tight">
          {title}
        </h3>
      </div>

      <p
        className={cn(
          "text-sm text-white/80 leading-relaxed transition-all duration-150",
          expanded ? "line-clamp-none" : "line-clamp-3"
        )}
      >
        {expanded ? description : summary}
      </p>

      <div className="mt-4">
        <Button
          variant="link"
          size="sm"
          className="text-xs text-white/60 px-0 hover:text-white"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show less" : "Read more"}
        </Button>
      </div>
    </div>
  )
}
