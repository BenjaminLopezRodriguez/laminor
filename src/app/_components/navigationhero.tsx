
"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { FeatureCard } from "~/app/_components/featured-card";
import { useTheme } from "next-themes";
import clsx from "clsx";
import Link from "next/link";
import { LiquidGlass } from '@specy/liquid-glass-react';

const features = [
  {
    iconName: "Radar",
    title: "EdgeMap",
    summary: "Real-time mapping with edge inference.",
    description:
      "EdgeMap uses edge-deployed compute to continuously track and localize road condition changes.",
  },
  {
    iconName: "Globe2",
    title: "EcoRoute",
    summary: "Smart routing for low emissions.",
    description:
      "EcoRoute calculates optimal travel paths that minimize carbon output and fuel usage.",
  },
  {
    iconName: "Camera",
    title: "Sightline",
    summary: "Computer vision for autonomy.",
    description:
      "Sightline combines LIDAR and camera input into a fused perception stream.",
  },
  {
    iconName: "ShieldCheck",
    title: "Guardian",
    summary: "Edge AI for threat detection.",
    description:
      "Guardian identifies security anomalies from camera and environmental sensors.",
  },
];

export default function NavigationHero() {

  const glassStyle = {
    depth: 30,
    segments: 14,
    radius: 3,
    tint: 0xedfdfd,
    reflectivity: 1,
    thickness: 10,
    dispersion: 10,
    roughness: 0.38,
  }
  



    const { theme, setTheme } = useTheme();
    const [showServices, setShowServices] = useState(false);
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
  
    // Track when component has mounted to prevent hydration mismatch
    useEffect(() => {
      setMounted(true);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
      function handleClickOutside(e: MouseEvent) {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setShowServices(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    return (


      <header
        ref={containerRef}
        className="  "
      >
  

  
        <div 
        className="mx-auto pt-12 flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 
        backdrop-blur-[12px] 
        backdrop-contrast-125 
        backdrop-brightness-110 
        backdrop-saturate-150 
        bg-white/30 
        border-b border-white/20 
        dark:bg-black/30  
        dark:border-black/20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src="/icon.png"
              width={32}
              height={32}
              alt="Laminor Logo"
              className="object-contain dark:invert"
            />
            <span className="text-xl font-bold tracking-tight">Laminor</span>
          </div>
  
          {/* Buttons */}
          <div className="flex items-center gap-2">
            {/* Services toggle */}
            <Button
              size="sm"
              variant="ghost"
              className={clsx(
                "group flex items-center gap-1 transition-colors rounded-full bg-black text-white dark:bg-white dark:text-black",
                showServices && "bg-muted/70 dark:bg-muted/70"
              )}
            >
                <Link href={"/auth"}>
                Get Started

                </Link>
              </Button>
            <Button
              size="sm"
              variant="ghost"
              className={clsx(
                "group flex items-center gap-1 transition-colors rounded-full bg-black text-white dark:bg-white dark:text-black",
                showServices && "bg-muted/70 dark:bg-muted/70"
              )}
              onClick={() => setShowServices(!showServices)}
            >
              Services
              <ChevronDown
                className={clsx(
                  "h-4 w-4 transition-transform duration-200",
                  showServices && "rotate-180"
                )}
              />
            </Button>
  
            {/* Theme toggle */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-muted-foreground"
              suppressHydrationWarning
            >
              {!mounted ? (
                <Sun className="h-4 w-4" />
              ) : theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle Theme</span>
            </Button>
          </div>
        </div>


  
        {/* Dropdown - absolutely positioned */}
        <AnimatePresence>
          {showServices && (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-full w-full border-t 
    backdrop-blur-[5px] 
    backdrop-contrast-110 
    backdrop-brightness-105 
    backdrop-saturate-120 
    bg-white/40 
    border-b border-white/15 
    dark:bg-black/40  
    dark:border-black/15"
            >
           
           


           <ScrollArea type="hover" className="mt-4 w-full">
                <div className="flex snap-x snap-mandatory scroll-pl-6 gap-4 px-1 pb-3  ">
                  {features.map((feature) => ( 
                    <div key={feature.title} className="shrink-0 snap-start">
                      <FeatureCardForRibbonMenu
                        iconName={feature.iconName}
                        title={feature.title}
                        summary={feature.summary}
                        description={feature.description}
                      />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

            </motion.div>
          )}
        </AnimatePresence>
      </header>

    );
  }




import * as LucideIcons from "lucide-react";
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
        "  w-56 shrink-0 snap-start px-1 transition-all duration-200 "
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
