import { type NextPage } from "next";
import {
  Button,
} from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import {
  ScrollArea,
  ScrollBar,
} from "~/components/ui/scroll-area";
import { FeatureCard } from "./_components/featured-card";
import {
  Layers,
  BrainCircuit,
  RefreshCw,
  Globe,
  Cpu,
  Database,
  Lock,
  Code,
  Play,
  Globe2,
  Radar,
  Camera,
  ShieldCheck,
} from "lucide-react";
import { Separator } from "~/components/ui/separator";

const features = [
  {
    iconName: "Radar",
    title: "EdgeMap",
    summary: "Real-time mapping with edge inference.",
    description:
      "EdgeMap uses edge-deployed compute to continuously track and localize road condition changes, enabling rapid geofencing and detour automation.",
  },
  {
    iconName: "Globe2",
    title: "EcoRoute",
    summary: "Smart routing for low emissions.",
    description:
      "EcoRoute calculates optimal travel paths that minimize carbon output and fuel usage by combining traffic, topography, and vehicle type data.",
  },
  {
    iconName: "Camera",
    title: "Sightline",
    summary: "Computer vision for autonomy.",
    description:
      "Sightline combines LIDAR and camera input into a fused perception stream to detect hazards, navigate, and classify real-time infrastructure context.",
  },
  {
    iconName: "ShieldCheck",
    title: "Guardian",
    summary: "Edge AI for threat detection.",
    description:
      "Guardian identifies security anomalies and threat patterns from camera, acoustic, and environmental sensors across smart infrastructure grids.",
  },
];

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-slate-200 selection:bg-blue-600 selection:text-white">
      {/* Navigation Hero */}
      <section className="w-full bg-gray-950 text-white py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight mb-10 select-text">
            Laminor
          </h1>

          {/* Horizontal Ribbon with scroll snap */}
          <ScrollArea className="w-full whitespace-nowrap" type="hover">
            <div
              className="flex space-x-6 px-2 pb-3 scroll-pl-6 snap-x snap-mandatory"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {features.map((feature) => (
                <div key={feature.title} className="snap-start">
                  <FeatureCard {...feature} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Industrial-Grade Spatial Mapping for Modern Infrastructure
        </h1>
        <p className="text-white/70 text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
          Power your systems with actionable geospatial intelligence, layered
          data, and secure real-time updates.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg shadow-md transition">
            Request Demo
          </Button>
          <Button
            variant="outline"
            className="border-neutral-700 text-white px-8 py-3 rounded-lg text-lg shadow-sm hover:bg-neutral-800 transition"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="container mx-auto px-6 py-20 max-w-6xl"
        aria-label="Key Features"
      >
        <h2 className="text-4xl font-extrabold mb-6 text-center tracking-tight">
          Key Features
        </h2>
        <p className="text-center text-white/60 max-w-3xl mx-auto mb-16 leading-relaxed">
          Robust features designed to scale and evolve with your enterprise
          needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <Layers className="h-6 w-6 text-blue-500" />,
              title: "Dynamic Layers",
              desc: "Merge and visualize multiple data feeds in real-time maps.",
            },
            {
              icon: <BrainCircuit className="h-6 w-6 text-blue-500" />,
              title: "AI Insights",
              desc: "Identify system patterns with intelligent recommendations.",
            },
            {
              icon: <RefreshCw className="h-6 w-6 text-blue-500" />,
              title: "Live Sync",
              desc: "Seamless data refresh across distributed systems.",
            },
          ].map(({ icon, title, desc }) => (
            <Card
              key={title}
              className="bg-neutral-800 border border-neutral-700 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardHeader className="flex gap-4 items-center">
                <div className="p-3 bg-blue-900 rounded-lg">{icon}</div>
                <div>
                  <CardTitle className="text-lg text-white">{title}</CardTitle>
                  <CardDescription className="text-white/70 mt-1 text-sm">
                    {desc}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Highlights */}
      <section className="bg-neutral-800 py-24 border-t border-b border-neutral-700">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-extrabold mb-6 tracking-tight">
                Engineered for Scale & Security
              </h2>
              <p className="text-white/70 mb-10 leading-relaxed max-w-lg">
                Built on a modern stack to ensure performance, compliance, and
                interoperability.
              </p>
              <div className="grid grid-cols-2 gap-8 max-w-md">
                {[
                  {
                    icon: <Cpu className="h-5 w-5 text-blue-400" />,
                    title: "High Performance",
                    desc: "Designed for real-time rendering of large data sets.",
                  },
                  {
                    icon: <Database className="h-5 w-5 text-purple-400" />,
                    title: "Multi-Cloud Ready",
                    desc: "Flexible deployment across cloud providers.",
                  },
                  {
                    icon: <Lock className="h-5 w-5 text-blue-400" />,
                    title: "Encryption",
                    desc: "Secure communications with 256-bit encryption.",
                  },
                  {
                    icon: <Code className="h-5 w-5 text-purple-400" />,
                    title: "Developer Tools",
                    desc: "Comprehensive SDKs and API documentation.",
                  },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <div className="mt-1">{icon}</div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">
                        {title}
                      </h4>
                      <p className="text-white/60 text-xs leading-snug">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-neutral-900 p-10 rounded-xl border border-neutral-700 shadow-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-700 rounded-lg flex items-center justify-center mb-5">
                <Play className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">System Architecture</h3>
              <p className="text-white/70 text-sm mb-6 max-w-xs leading-relaxed">
                Explore how it all fits together
              </p>
              <Button
                variant="outline"
                className="border-blue-600 hover:bg-blue-700 hover:text-white text-blue-400 px-6 py-2 rounded-lg text-sm transition"
              >
                View Tech Specs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24 max-w-4xl text-center">
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-14 shadow-lg">
          <h2 className="text-4xl font-extrabold mb-5 tracking-tight">
            Start building with Laminor
          </h2>
          <p className="text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join innovative teams transforming operations with our geospatial
            intelligence tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg shadow-lg transition">
              Contact Sales
            </Button>
            <Button
              variant="outline"
              className="border-neutral-700 text-white px-8 py-4 rounded-lg text-lg shadow-sm hover:bg-neutral-800 transition"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 text-sm text-white/60">
        <div className="container mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-14">
          <div>
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" /> Laminor
            </h3>
            <p className="max-w-xs leading-relaxed">
              Modern infrastructure deserves modern intelligence.
            </p>
          </div>
          <nav>
            <h4 className="text-white mb-3 font-semibold">Product</h4>
            <ul className="space-y-2">
              {["Features", "Solutions", "Pricing", "Demo"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav>
            <h4 className="text-white mb-3 font-semibold">Resources</h4>
            <ul className="space-y-2">
              {["Docs", "API", "Blog", "Case Studies"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav>
            <h4 className="text-white mb-3 font-semibold">Company</h4>
            <ul className="space-y-2">
              {["About", "Careers", "Contact", "Press"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Separator className="bg-neutral-800" />
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white/70 text-sm select-none">
          <p>© {new Date().getFullYear()} Laminor Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Security"].map((item) => (
              <a
                href="#"
                key={item}
                className="hover:text-white transition cursor-pointer"
              >
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
