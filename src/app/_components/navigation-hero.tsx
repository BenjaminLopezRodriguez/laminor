// "use client";
// OLD
// import { useState } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown, Sun, Moon } from "lucide-react";
// import { Button } from "~/components/ui/button";
// import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
// import { FeatureCard } from "~/app/_components/featured-card";
// import { useTheme } from "next-themes";

// const features = [
//   {
//     iconName: "Radar",
//     title: "EdgeMap",
//     summary: "Real-time mapping with edge inference.",
//     description:
//       "EdgeMap uses edge-deployed compute to continuously track and localize road condition changes.",
//   },
//   {
//     iconName: "Globe2",
//     title: "EcoRoute",
//     summary: "Smart routing for low emissions.",
//     description:
//       "EcoRoute calculates optimal travel paths that minimize carbon output and fuel usage.",
//   },
//   {
//     iconName: "Camera",
//     title: "Sightline",
//     summary: "Computer vision for autonomy.",
//     description:
//       "Sightline combines LIDAR and camera input into a fused perception stream.",
//   },
//   {
//     iconName: "ShieldCheck",
//     title: "Guardian",
//     summary: "Edge AI for threat detection.",
//     description:
//       "Guardian identifies security anomalies from camera and environmental sensors.",
//   },
// ];

// export default function NavigationHero() {
//   const { theme, setTheme } = useTheme();
//   const [showServices, setShowServices] = useState(false);

//   return (
//     <section className="w-full border-b border-gray-200 bg-white/50 px-4 py-3 pt-12 text-black md:px-6 dark:border-gray-800 dark:bg-black/50 dark:text-white backdrop-blur-3xl">
//       <div className="mx-auto flex max-w-6xl flex-col gap-4">
//         {/* Top nav row */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <Image
//               src="/icon.png"
//               width={50}
//               height={25}
//               alt="Laminor Logo"
//               className="object-contain dark:invert"
//             />
//             <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-white">
//               Laminor
//             </h1>
//           </div>

//           <div className="flex items-center gap-4">
//             {/* Dropdown Toggle */}
//             <Button
//               variant="outline"
//               className="flex items-center gap-1  rounded-full dark:bg-white dark:text-black bg-black text-white"
//               onClick={() => setShowServices((prev) => !prev)}
//             >
//               Services <ChevronDown className="h-4 w-4" />
//             </Button>

//             {/* Theme toggle */}
//             <Button
//               variant="ghost"
//               className="text-black dark:text-white"
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             >
//               {theme === "dark" ? (
//                 <Sun className="h-4 w-4" />
//               ) : (
//                 <Moon className="h-4 w-4" />
//               )}
//               <span className="sr-only">Toggle Theme</span>
//             </Button>
//           </div>
//         </div>

//         {/* Animated dropdown area under navbar */}
//         <AnimatePresence>
//           {showServices && (
//             <motion.div
//               key="dropdown"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.25, ease: "easeOut" }}
//               className="w-full"
//             >
//               <ScrollArea type="hover" className="mt-4 w-full">
//                 <div className="flex snap-x snap-mandatory scroll-pl-6 gap-4 px-1 pb-3">
//                   {features.map((feature) => (
//                     <div key={feature.title} className="shrink-0 snap-start">
//                       <FeatureCard
//                         iconName={feature.iconName}
//                         title={feature.title}
//                         summary={feature.summary}
//                         description={feature.description}
//                       />
//                     </div>
//                   ))}
//                 </div>
//                 <ScrollBar orientation="horizontal" />
//               </ScrollArea>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// }



"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { FeatureCard } from "~/app/_components/featured-card";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { FeatureCardForRibbonMenu } from "./feature-card-ribbonmenu";

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
    const { theme, setTheme } = useTheme();
    const [showServices, setShowServices] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
  
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
        className="relative z-50 pt-8 border-b border-border/40 bg-background/30 backdrop-blur-3xl "
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
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
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
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
              className="absolute left-0 top-full w-full border-t border-border bg-background/30 backdrop-blur-3xl shadow-xl"
            >
           
           


           <ScrollArea type="hover" className="mt-4 w-full">
                <div className="flex snap-x snap-mandatory scroll-pl-6 gap-4 px-1 pb-3">
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