import { type NextPage } from "next";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { FeatureCard } from "./_components/featured-card";
import { Separator } from "~/components/ui/separator";
import Image from "next/image";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ThemeToggle } from "./_components/theme-toggle";
import NavigationHero from "./_components/navigation-hero";
import MapWriteIntro from "./_components/sections/mapwrite";

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
import Link from "next/link";
import { getSignUpUrl, withAuth } from "@workos-inc/authkit-nextjs";

export async function Home() {
  // Retrieves the user from the session or returns `null` if no user is signed in
  const { user } = await withAuth();

  // Get the URL to redirect the user to AuthKit to sign up
  const signUpUrl = await getSignUpUrl();

  if (!user) {
    return (
      <>
        <a href="/login">Sign in</a>
        <Link href={signUpUrl}>Sign up</Link>
      </>
    );
  }
  return (
    <div className="flex min-h-screen flex-col bg-white text-black dark:bg-black dark:text-white">
      {/* Navigation Hero */}
      <NavigationHero />

      <p>Welcome back{user.firstName && `, ${user.firstName}`}</p>

      {/* Hero Section */}
      <MapWriteIntro />

      {/* Features Grid */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="mb-4 text-center text-2xl font-bold">Key Features</h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-black/70 dark:text-white/70">
          Robust features designed to scale with your enterprise needs.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
            <Card
              key={title}
              className="border border-gray-200 bg-white dark:border-gray-800 dark:bg-black"
            >
              <CardHeader className="flex items-center gap-3">
                <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-900">
                  {icon}
                </div>
                <div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription className="text-sm text-black/70 dark:text-white/70">
                    {desc}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Highlights */}
      <section className="border-t border-b border-gray-200 bg-gray-100 py-12 dark:border-gray-800 dark:bg-gray-900">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Engineered for Scale</h2>
              <p className="mb-6 leading-relaxed text-black/70 dark:text-white/70">
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
                      <h4 className="text-sm font-medium">{title}</h4>
                      <p className="text-xs text-black/70 dark:text-white/70">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-black">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-black dark:bg-white">
                <Play className="h-5 w-5 text-white dark:text-black" />
              </div>
              <h3 className="mb-1 font-medium">System Architecture</h3>
              <p className="mb-3 text-sm text-black/70 dark:text-white/70">
                Explore how it all fits together
              </p>
              <Button
                variant="outline"
                className="rounded-md border-black px-4 py-1 text-sm dark:border-white"
              >
                View Tech Specs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-black">
          <h2 className="mb-3 text-2xl font-bold">
            Start building with Laminor
          </h2>
          <p className="mb-6 text-black/70 dark:text-white/70">
            Join teams transforming operations with our geospatial tools.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button className="rounded-md bg-black px-6 py-2 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Contact Sales
            </Button>
            <Button
              variant="outline"
              className="rounded-md border-black px-6 py-2 text-black dark:border-white dark:text-white"
            >
              View Pricing
            </Button>
          </div>
        </div>
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
