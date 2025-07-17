// app/dashboard/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <main className="space-y-6 p-8">
      <Image alt="target" width={50} height={50} src={"/target.png"} />
      <h1 className="text-3xl font-bold">Welcome to Laminor MapWrite</h1>
      <p className="text-muted-foreground max-w-xl">
        View your current ad placements, monitor impressions, and create new
        campaigns across real-world locations.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="mapwrite/new">Create New Placement</Link>
        </Button>
        <Button variant="secondary">View Analytics</Button>
      </div>
      {/* Placeholder for list of ads */}
      <div className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Your Active Placements</h2>
        <div className="text-muted-foreground rounded-md border p-4">
          No active placements yet. Create one to get started.
        </div>
      </div>
    </main>
  );
}
