import NavigationHero from "./_components/navigation-hero";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Fixed Navigation */}
      <nav className="fixed z-50 w-full start-0 left-0">
        <NavigationHero />
      </nav>

      {/* Hero Section */}
      <section className="pt-42 px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/20 bg-indigo-500/40 backdrop-blur-md p-6 shadow-xl">
          <img
            src="/demo.png"
            alt="Demo"
            className="mb-6 w-full rounded-2xl border border-white/10 object-cover"
          />
          <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">
            Introducing Laminar Roads
          </h1>
          <p className="mb-4 text-lg text-white/85">
            Segmenting on-demand road data for autonomous systems and real-time infrastructure intelligence.
          </p>
          <p className="text-sm text-white/60">
            A unified geospatial intelligence layer powered by adaptive AI segmentation and federated edge data.
          </p>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="px-6 py-14 bg-muted/10 border-t border-white/10">
        <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Segmentation</h3>
            <p className="text-muted-foreground text-sm">
              Dynamically parse road types, lanes, and terrain conditions using edge AI models trained on diverse geographies.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Infrastructure Mapping</h3>
            <p className="text-muted-foreground text-sm">
              Fuse satellite, LiDAR, and ground data to produce high-confidence map overlays for cities and private networks.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Federated Intelligence</h3>
            <p className="text-muted-foreground text-sm">
              Learn continuously across fleets without compromising data locality, ensuring speed, safety, and compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Overview Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">How It Works</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-sm leading-relaxed">
            Laminar Roads leverages a distributed inference network across participating sensors, vehicles, and edge compute infrastructure.
            Each route segment is analyzed, classified, and uploaded to the Laminar core, where updates are versioned and indexed for downstream access.
          </p>
        </div>
      </section>

      {/* CTA / Footer */}
      <section className="px-6 py-20 border-t border-white/10 bg-background/70 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-3">Try the Demo</h3>
          <p className="text-muted-foreground text-sm mb-6">
            Explore a live inference overlay or connect your infrastructure for tailored deployment.
          </p>
          <a
            href="/demo"
            className="inline-block rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 transition-colors"
          >
            Launch Demo
          </a>
        </div>
      </section>
    </main>
  );
}
