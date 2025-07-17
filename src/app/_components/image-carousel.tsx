"use client";

import Image from "next/image";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

const imageUrls = Array.from(
  { length: 10 },
  (_, i) => `https://picsum.photos/seed/${i + 1}/300/300`,
);

export default function ImageCarousel() {
  return (
    <section className="w-full bg-white px-6 py-10 dark:bg-black">
      <h2 className="mb-4 text-2xl font-semibold text-black dark:text-white">
        Explore Environments
      </h2>

      <ScrollArea type="hover" className="w-full overflow-x-auto">
        <div className="flex gap-4 pb-3">
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="min-w-[200px] overflow-hidden rounded-2xl border border-gray-200 shadow-md dark:border-gray-700"
            >
              <Image
                src={url}
                alt={`Carousel ${index + 1}`}
                width={300}
                height={300}
                className="h-auto w-full rounded-2xl object-cover"
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
