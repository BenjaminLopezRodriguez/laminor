import { type NextPage } from "next";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { FeatureCard } from "./_components/featured-card";
import { Separator } from "~/components/ui/separator";
import Image from "next/image";
import { 
  Layers, BrainCircuit, RefreshCw, Cpu, 
  Database, Lock, Code, Play, 
  ChevronDown
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ThemeToggle } from "./_components/theme-toggle";
import NavigationHero from "./_components/navigation-hero";
import MapWriteIntro from "./_components/sections/mapwrite";

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

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {/* Navigation Hero */}
      <NavigationHero/>



      {/* Hero Section */}
      <MapWriteIntro/>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Key Features</h2>
        <p className="text-center text-black/70 dark:text-white/70 max-w-2xl mx-auto mb-8">
          Robust features designed to scale with your enterprise needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Layers className="h-5 w-5" />,
              title: "Dynamic Layers",
              desc: "Merge and visualize multiple data feeds in real-time maps.",
            },
            {
              icon: <BrainCircuit className="h-5 w-5" />,
              title: "AI Insights",
              desc: "Identify system patterns with intelligent recommendations.",
            },
            {
              icon: <RefreshCw className="h-5 w-5" />,
              title: "Live Sync",
              desc: "Seamless data refresh across distributed systems.",
            },
          ].map(({ icon, title, desc }) => (
            <Card key={title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <CardHeader className="flex gap-3 items-center">
                <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded-md">{icon}</div>
                <div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription className="text-black/70 dark:text-white/70 text-sm">
                    {desc}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Highlights */}
      <section className="bg-gray-100 dark:bg-gray-900 py-12 border-t border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Engineered for Scale</h2>
              <p className="text-black/70 dark:text-white/70 mb-6 leading-relaxed">
                Built on a modern stack for performance and interoperability.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: <Cpu className="h-4 w-4" />,
                    title: "High Performance",
                    desc: "Real-time rendering of large data sets.",
                  },
                  {
                    icon: <Database className="h-4 w-4" />,
                    title: "Multi-Cloud",
                    desc: "Flexible deployment across providers.",
                  },
                  {
                    icon: <Lock className="h-4 w-4" />,
                    title: "Encryption",
                    desc: "Secure 256-bit encryption.",
                  },
                  {
                    icon: <Code className="h-4 w-4" />,
                    title: "Developer Tools",
                    desc: "SDKs and API documentation.",
                  },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-2">
                    <div className="mt-0.5">{icon}</div>
                    <div>
                      <h4 className="font-medium text-sm">{title}</h4>
                      <p className="text-black/70 dark:text-white/70 text-xs">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-black dark:bg-white rounded-md flex items-center justify-center mb-3">
                <Play className="h-5 w-5 text-white dark:text-black" />
              </div>
              <h3 className="font-medium mb-1">System Architecture</h3>
              <p className="text-black/70 dark:text-white/70 text-sm mb-3">
                Explore how it all fits together
              </p>
              <Button
                variant="outline"
                className="border-black dark:border-white px-4 py-1 rounded-md text-sm"
              >
                View Tech Specs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-3">Start building with Laminor</h2>
          <p className="text-black/70 dark:text-white/70 mb-6">
            Join teams transforming operations with our geospatial tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200">
              Contact Sales
            </Button>
            <Button variant="outline" className="border-black dark:border-white text-black dark:text-white px-6 py-2 rounded-md">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 text-sm">
        <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-medium mb-2">Laminor</h3>
            <p className="text-black/70 dark:text-white/70">Modern infrastructure intelligence.</p>
          </div>
          {["Product", "Resources", "Company"].map((section) => (
            <nav key={section}>
              <h4 className="font-medium mb-2">{section}</h4>
              <ul className="space-y-1">
                {Array(4).fill(0).map((_, i) => (
                  <li key={i}>
                    <a href="#" className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white">
                      {section} {i+1}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <Separator className="bg-gray-200 dark:bg-gray-800" />
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-black/70 dark:text-white/70">© {new Date().getFullYear()} Laminor Technologies.</p>
          <div className="flex gap-4">
            {["Privacy", "Terms", "Security"].map((item) => (
              <a href="#" key={item} className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;