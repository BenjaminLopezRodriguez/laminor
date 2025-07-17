import Image from "next/image";
import { Button } from "~/components/ui/button";
import ImageCarousel from "../image-carousel";
import Link from "next/link";

export default function MapWriteIntro() {
  return (
    <section className="w-full border-b border-gray-200 bg-white px-4 py-12 text-black md:px-6 dark:border-gray-800 dark:bg-black dark:text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
        <Image
          src="/cursoricon.png"
          width={50}
          height={50}
          alt="MapWrite Logo"
          className="shrink-0 object-contain dark:invert"
        />

        <div className="flex w-full flex-col gap-3">
          <h1 className="text-2xl leading-tight font-bold tracking-tight sm:text-3xl md:text-4xl">
            Introducing <span className="font-extrabold">Laminor MapWrite</span>
          </h1>

          <p className="text-muted-foreground max-w-2xl">
            Connect your brand to high-impact physical ad spaces through
            real-time spatial intelligence. MapWrite surfaces real-world
            advertising opportunities—from billboards and storefronts to
            graffiti zones— and automates placement at scale.
          </p>

          <p className="text-muted-foreground text-xs italic">
            Currently supporting outdoor placements including billboards,
            murals, posters, and more.
          </p>
          <ImageCarousel />

          <div className="mt-2">
            <Button className="w-40 rounded-full">
              <Link href={"/u/mapwrite/"}>Get Started</Link>{" "}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
