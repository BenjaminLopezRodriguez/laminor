// src/app/page.tsx
import NavigationHero from "./_components/navigationhero";
import { FeatureCard } from "./_components/featured-card";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { 
  Camera, 
  Video, 
  Brain, 
  Package, 
  Zap, 
  Database, 
  Settings, 
  Share2,
  Shield,
  Globe,
  BarChart3,
  Code,
  Cloud,
  Smartphone,
  Users,
  MapPin,
  Car,
  Building2,
  Factory,
  ShoppingCart,
  Truck,
  Eye,
  Lock,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

type FeatureItem = {
  iconName: string;
  title: string;
  summary: string;
  description: string;
  href: string;
};

export default function Home() {
  const customFeatures: FeatureItem[] = [
    {
      iconName: "Cloud",
      title: "CloudScale",
      summary: "Scalable cloud infrastructure",
      description: "Elastic cloud solutions that grow with your business needs.",
      href: "/cloud"
    },
    {
      iconName: "Smartphone",
      title: "MobileFirst",
      summary: "Cross-platform apps",
      description: "Build once and deploy everywhere with our unified mobile framework.",
      href: "/mobile"
    },
    {
      iconName: "Database",
      title: "DataForge",
      summary: "Big data solutions",
      description: "Process and analyze massive datasets with our distributed systems.",
      href: "/data"
    },
    {
      iconName: "Users",
      title: "TeamSync",
      summary: "Collaboration tools",
      description: "Keep your distributed teams aligned with our productivity suite.",
      href: "/collaboration"
    }
  ];

  const coreOfferings = [
    {
      icon: Camera,
      title: "Image Analysis",
      description: "AI-powered image segmentation and object detection with Segment Anything technology.",
      features: ["Product detection", "Object counting", "Cropped image extraction", "Bounding box generation"],
      status: "available"
    },
    {
      icon: Video,
      title: "Video Processing",
      description: "Frame-by-frame analysis of video content for surveillance and monitoring.",
      features: ["Frame extraction", "Temporal analysis", "Motion detection", "Real-time processing"],
      status: "beta"
    },
    {
      icon: Brain,
      title: "AI Descriptions",
      description: "LLM-powered intelligent descriptions using GPT-OSS and Llama models.",
      features: ["Natural language descriptions", "Context understanding", "Relationship detection", "Multi-language support"],
      status: "beta"
    },
    {
      icon: Package,
      title: "Product Detection",
      description: "Advanced product detection with classification and inventory management.",
      features: ["Product classification", "Inventory counting", "SKU recognition", "Price detection"],
      status: "in-development"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Live analysis of streaming content with instant notifications.",
      features: ["WebSocket streaming", "Live alerts", "Edge processing", "Low latency"],
      status: "coming-soon"
    },
    {
      icon: Database,
      title: "Batch Processing",
      description: "Process hundreds of images or videos simultaneously with distributed systems.",
      features: ["Parallel processing", "Queue management", "Progress tracking", "Bulk exports"],
      status: "coming-soon"
    },
    {
      icon: Settings,
      title: "Custom Models",
      description: "Train and deploy custom segmentation models for your specific use case.",
      features: ["Model training", "Fine-tuning", "Custom datasets", "Model deployment"],
      status: "coming-soon"
    },
    {
      icon: Share2,
      title: "API Access",
      description: "RESTful API and webhooks for seamless integration with your applications.",
      features: ["REST API", "Webhooks", "SDKs", "Documentation"],
      status: "in-development"
    },
  ];

  const industrySolutions = [
    {
      icon: ShoppingCart,
      title: "Retail & E-commerce",
      description: "Inventory management, shelf monitoring, and product recognition for retail operations.",
      useCases: ["Stock counting", "Shelf analysis", "Product placement", "Loss prevention"]
    },
    {
      icon: Factory,
      title: "Manufacturing",
      description: "Quality control, defect detection, and production line monitoring.",
      useCases: ["Quality inspection", "Defect detection", "Assembly verification", "Packaging validation"]
    },
    {
      icon: Truck,
      title: "Logistics & Warehousing",
      description: "Automated inventory tracking, package detection, and warehouse management.",
      useCases: ["Package tracking", "Inventory audits", "Loading verification", "Space optimization"]
    },
    {
      icon: Car,
      title: "Autonomous Vehicles",
      description: "Road segmentation, obstacle detection, and navigation assistance.",
      useCases: ["Road mapping", "Obstacle detection", "Lane detection", "Traffic analysis"]
    },
    {
      icon: Building2,
      title: "Smart Cities",
      description: "Infrastructure monitoring, traffic analysis, and urban planning.",
      useCases: ["Traffic monitoring", "Infrastructure mapping", "Parking management", "Urban analytics"]
    },
    {
      icon: Eye,
      title: "Security & Surveillance",
      description: "Real-time monitoring, object tracking, and anomaly detection.",
      useCases: ["Intrusion detection", "People counting", "Vehicle tracking", "Event detection"]
    },
  ];

  const integrationOptions = [
    {
      icon: Code,
      title: "Developer SDKs",
      description: "Python, JavaScript, and Go SDKs for easy integration.",
      link: "/docs/sdks"
    },
    {
      icon: Share2,
      title: "REST API",
      description: "Comprehensive REST API with OpenAPI documentation.",
      link: "/docs/api"
    },
    {
      icon: Zap,
      title: "Webhooks",
      description: "Real-time notifications for processing completion.",
      link: "/docs/webhooks"
    },
    {
      icon: Cloud,
      title: "Cloud Integrations",
      description: "AWS, GCP, and Azure integrations available.",
      link: "/docs/integrations"
    },
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "Perfect for small projects and testing",
      features: [
        "1,000 images/month",
        "100 videos/month",
        "Basic segmentation",
        "Email support",
        "API access"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      price: "$499",
      period: "/month",
      description: "For growing businesses and teams",
      features: [
        "10,000 images/month",
        "1,000 videos/month",
        "Advanced AI models",
        "Priority support",
        "Custom integrations",
        "Batch processing",
        "Webhook access"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large-scale deployments",
      features: [
        "Unlimited processing",
        "Custom model training",
        "Dedicated support",
        "SLA guarantees",
        "On-premise deployment",
        "Custom integrations",
        "Training & onboarding"
      ],
      cta: "Contact Sales",
      popular: false
    },
  ];

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/20 dark:via-black dark:to-purple-950/20" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />

      {/* Fixed Navigation */}
      <nav className="fixed z-50 w-full start-0 left-0">
        <NavigationHero />
      </nav>

      {/* Hero Section */}

       {/* CREATING THE MANTRA SECTION */}
       <section className="px-4 sm:px-6 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-4xl text-center relative">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-50 mt-52">
            Turning data into useful insights
          </h1>
          <h2 className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Laminor ingests and converts data, evaluating & transforming data for governments, institutions, and business operations.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-black shadow-xl shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300">
              <Link href="/demo">
                Book a demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 hover:bg-background/50 backdrop-blur-sm transition-all duration-300">
              <Link href="/analyze">Try out our tools</Link>
            </Button>
          </div>
        </div>
      </section>


      <section className="pt-32 md:pt-40 px-4 sm:px-6 py-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="relative rounded-3xl overflow-hidden border border-border/50 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl p-6 md:p-8 lg:p-10 shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative">
              <img
                src="/demo.png"
                alt="Demo"
                className="mb-8 w-full rounded-2xl border border-white/10 dark:border-white/5 object-cover shadow-xl"
              />
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Introducing Laminar Roads
                </h1>
                <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-700 dark:text-yellow-300 border border-yellow-400/30 dark:border-yellow-500/30 backdrop-blur-sm w-fit">
              Beta
            </span>
              </div>
              <p className="mb-3 text-lg md:text-xl text-foreground/90 font-medium">
                Segmenting on-demand road data for autonomous systems and real-time infrastructure intelligence.
              </p>
              <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-3xl">
                A unified geospatial intelligence layer powered by adaptive AI segmentation and federated edge data.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300">
                  <Link href="/analyze">Try Image Analysis</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 hover:bg-background/50 backdrop-blur-sm transition-all duration-300">
                  <Link href="/auth">Sign Up Free</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Offerings Section */}
      <section className="px-4 sm:px-6 py-16 md:py-24 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Core Offerings
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful AI-powered tools for image and video analysis
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {coreOfferings.map((offering) => {
              const Icon = offering.icon;
              return (
                <div
                  key={offering.title}
                  className="group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/5 group-hover:to-primary/5 transition-all duration-300 -z-10" />
                  <div className="flex items-start gap-4 mb-4">
                    <div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-3 text-primary group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{offering.title}</h3>
                      <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${
                        offering.status === "available" ? "bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/30" :
                        offering.status === "beta" ? "bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-500/30" :
                        offering.status === "in-development" ? "bg-orange-500/20 text-orange-700 dark:text-orange-400 border border-orange-500/30" :
                        "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border border-yellow-500/30"
                      }`}>
                        {offering.status === "available" ? "Available" :
                         offering.status === "beta" ? "Beta" :
                         offering.status === "in-development" ? "In Development" : "Coming Soon"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{offering.description}</p>
                  <ul className="space-y-2.5">
                    {offering.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="px-4 sm:px-6 py-16 md:py-20 relative border-t border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-3 relative">
          <div className="group p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Real-Time Segmentation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Dynamically parse road types, lanes, and terrain conditions using edge AI models trained on diverse geographies.
            </p>
          </div>
          <div className="group p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Infrastructure Mapping</h3>
            <p className="text-muted-foreground leading-relaxed">
              Fuse satellite, LiDAR, and ground data to produce high-confidence map overlays for cities and private networks.
            </p>
          </div>
          <div className="group p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-indigo-500/20 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Brain className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Federated Intelligence</h3>
            <p className="text-muted-foreground leading-relaxed">
              Learn continuously across fleets without compromising data locality, ensuring speed, safety, and compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section className="px-4 sm:px-6 py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Industry Solutions
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tailored solutions for your industry needs
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industrySolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div
                  key={solution.title}
                  className="group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/5 group-hover:to-primary/5 transition-all duration-300 -z-10" />
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-3 text-primary group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{solution.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{solution.description}</p>
                  <div className="space-y-3 pt-4 border-t border-border/50">
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Use Cases</p>
                    <ul className="space-y-2">
                      {solution.useCases.map((useCase) => (
                        <li key={useCase} className="text-xs text-muted-foreground flex items-center gap-2.5 group/item">
                          <ArrowRight className="h-3 w-3 text-primary group-hover/item:translate-x-1 transition-transform" />
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Options */}
      <section className="px-4 sm:px-6 py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
        <div className="mx-auto max-w-6xl relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Easy Integration
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get started quickly with our developer-friendly tools
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {integrationOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Link
                  key={option.title}
                  href={option.link}
                  className="group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/5 group-hover:to-primary/5 transition-all duration-300 -z-10" />
                  <div className="flex flex-col items-start gap-4">
                    <div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-3 text-primary group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{option.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{option.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 sm:px-6 py-16 md:py-24 bg-background border-t border-border/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Simple Pricing
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the plan that fits your needs
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-8 transition-all duration-300 ${
                  tier.popular
                    ? "border-primary shadow-2xl shadow-primary/20 scale-105 bg-gradient-to-br from-primary/5 via-card to-card"
                    : "border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`w-full ${
                    tier.popular
                      ? "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-lg shadow-primary/50"
                      : "variant-outline hover:bg-primary/5"
                  }`}
                  size="lg"
                >
                  <Link href="/auth">{tier.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="px-4 sm:px-6 py-16 md:py-24 relative border-t border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2 relative">
          <div className="group p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-3 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">Security First</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Your data security is our top priority. We implement industry-leading security practices.
            </p>
            <ul className="space-y-3">
              {["End-to-end encryption", "SOC 2 compliant", "GDPR compliant", "Regular security audits", "Data residency options"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="group p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">Global Infrastructure</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Deploy anywhere with our global edge network for low-latency processing.
            </p>
            <ul className="space-y-3">
              {["99.9% uptime SLA", "Multi-region deployment", "Edge computing", "CDN integration", "Auto-scaling"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-20 md:py-28 border-t border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
        <div className="mx-auto max-w-4xl text-center relative">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers and businesses using Laminor for AI-powered image and video analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300">
              <Link href="/analyze">Try Image Analysis</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 hover:bg-background/50 backdrop-blur-sm transition-all duration-300">
              <Link href="/auth">Sign Up for Free</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="hover:bg-muted/50 transition-all duration-300">
              <Link href="/docs">View Documentation</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}