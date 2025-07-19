import NavigationHero from "./_components/navigationhero";

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


    </main>
  );
}
