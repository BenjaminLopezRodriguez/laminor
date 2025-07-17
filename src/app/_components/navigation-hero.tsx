"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { FeatureCard } from "~/app/_components/featured-card";
import { useTheme } from "next-themes";

const features = [
  {
    iconName: "Radar",
    title: "EdgeMap",
    summary: "Real-time mapping with edge inference.",
    description: "EdgeMap uses edge-deployed compute to continuously track and localize road condition changes.",
  },
  {
    iconName: "Globe2",
    title: "EcoRoute",
    summary: "Smart routing for low emissions.",
    description: "EcoRoute calculates optimal travel paths that minimize carbon output and fuel usage.",
  },
  {
    iconName: "Camera",
    title: "Sightline",
    summary: "Computer vision for autonomy.",
    description: "Sightline combines LIDAR and camera input into a fused perception stream.",
  },
  {
    iconName: "ShieldCheck",
    title: "Guardian",
    summary: "Edge AI for threat detection.",
    description: "Guardian identifies security anomalies from camera and environmental sensors.",
  },
];

export default function NavigationHero() {
  const { theme, setTheme } = useTheme();
  const [showServices, setShowServices] = useState(false);

  return (
    <section className="w-full bg-white dark:bg-black text-black dark:text-white py-12 px-4 md:px-6 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col gap-4">
        {/* Top nav row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="/icon.png"
              width={50}
              height={25}
              alt="Laminor Logo"
              className="object-contain dark:invert"
            />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Laminor
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Dropdown Toggle */}
            <Button
              variant="ghost"
              className="text-black dark:text-white flex items-center gap-1"
              onClick={() => setShowServices((prev) => !prev)}
            >
              Services <ChevronDown className="w-4 h-4" />
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              className="text-black dark:text-white"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="sr-only">Toggle Theme</span>
            </Button>
          </div>
        </div>

        {/* Animated dropdown area under navbar */}
        <AnimatePresence>
          {showServices && (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full"
            >
              <ScrollArea type="hover" className="mt-4 w-full">
                <div className="flex gap-4 pb-3 px-1 scroll-pl-6 snap-x snap-mandatory">
                  {features.map((feature) => (
                    <div key={feature.title} className="snap-start shrink-0">
                      <FeatureCard
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
      </div>
    </section>
  );
}
