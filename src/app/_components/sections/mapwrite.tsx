import Image from "next/image";
import { Button } from "~/components/ui/button";
import ImageCarousel from "../image-carousel";
import Link from "next/link";

export default function MapWriteIntro() {
  return (
    <section className="w-full bg-white dark:bg-black text-black dark:text-white py-12 px-4 md:px-6 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
        <Image
          src="/cursoricon.png"
          width={50}
          height={50}
          alt="MapWrite Logo"
          className="object-contain shrink-0 dark:invert"
        />

        <div className="flex flex-col gap-3 w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            Introducing <span className="font-extrabold">Laminor MapWrite</span>
          </h1>

          <p className="text-muted-foreground max-w-2xl">
            Connect your brand to high-impact physical ad spaces through real-time spatial intelligence.
            MapWrite surfaces real-world advertising opportunities—from billboards and storefronts to graffiti zones—
            and automates placement at scale.
          </p>

          <p className="text-xs text-muted-foreground italic">
            Currently supporting outdoor placements including billboards, murals, posters, and more.
          </p>
          <ImageCarousel/>

          <div className="mt-2">
            <Button className="rounded-full w-40"><Link href={"/u/mapwrite/"}>Get Started</Link> </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
