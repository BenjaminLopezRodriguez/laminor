import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Layers,
  BrainCircuit,
  RefreshCw,
  Cpu,
  Database,
  Lock,
  Code,
  Play,
  ChevronDown,
} from "lucide-react";

import NavigationHero from "~/app/_components/navigation-hero";
import MapWriteIntro from "~/app/_components/sections/mapwrite";

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

export async function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black dark:bg-black dark:text-white">
      {/* Navigation Hero */}
      <NavigationHero />

      {/* Hero Background + CTA */}
      <section className="relative w-full overflow-hidden py-20">
        <div className=" inset-0 -z-10 m-auto ">
          <Image src={"/herobg.png"} alt="Hero background" layout="fill" objectFit="contain" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <h2 className="mb-6 text-3xl font-semibold md:text-5xl">Experience Infrastructure Intelligence</h2>
          <Button size="lg" className="text-lg">
            PLAY DEMO
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto grid gap-8 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card key={index} className="bg-white/5 p-6 shadow-md backdrop-blur-md dark:bg-white/10">
            <CardHeader className="mb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                {/* TODO: Replace with dynamic icon mapping */}
                <Layers size={20} />
                {feature.title}
              </CardTitle>
              <CardDescription className="text-sm text-white/70 dark:text-white/60">
                {feature.summary}
              </CardDescription>
            </CardHeader>
            <p className="text-white/80 dark:text-white/70 text-sm">
              {feature.description}
            </p>
          </Card>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white text-sm dark:border-gray-800 dark:bg-black">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4">
          <div>
            <h3 className="mb-2 font-medium">Laminor</h3>
            <p className="text-black/70 dark:text-white/70">
              Modern infrastructure intelligence.
            </p>
          </div>
          {["Product", "Resources", "Company"].map((section) => (
            <nav key={section}>
              <h4 className="mb-2 font-medium">{section}</h4>
              <ul className="space-y-1">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
                      >
                        {section} {i + 1}
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
          ))}
        </div>
        <Separator className="bg-gray-200 dark:bg-gray-800" />
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 md:flex-row">
          <p className="text-black/70 dark:text-white/70">
            © {new Date().getFullYear()} Laminor Technologies.
          </p>
          <div className="flex gap-4">
            {["Privacy", "Terms", "Security"].map((item) => (
              <a
                href="#"
                key={item}
                className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
