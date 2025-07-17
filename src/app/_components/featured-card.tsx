"use client"

import { useState } from "react"
import * as LucideIcons from "lucide-react"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"

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
    <article
      className={cn(
        "shrink-0 w-72 rounded-2xl border transition-all duration-200",
        "bg-white text-black border-gray-200 shadow-sm hover:shadow-md",
        "dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
      )}
    >
      <div className="p-6 flex flex-col justify-between h-full">
        {/* Icon and Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-md bg-gray-100 text-primary dark:bg-zinc-800 dark:text-white">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        </div>

        {/* Description */}
        <p
          className={cn(
            "text-sm leading-relaxed transition-all duration-150",
            "text-gray-700 dark:text-gray-300",
            expanded ? "line-clamp-none" : "line-clamp-3"
          )}
        >
          {expanded ? description : summary}
        </p>

        {/* Toggle Button */}
        <div className="mt-4">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "text-xs px-0 underline underline-offset-2",
              "text-black hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
            )}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show less" : "Read more"}
          </Button>
        </div>
      </div>
    </article>
  )
}
