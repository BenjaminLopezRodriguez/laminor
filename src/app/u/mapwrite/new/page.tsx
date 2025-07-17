

// app/mapwrite/create/page.tsx

import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Create a New Ad Placement</h1>
      <form className="space-y-4 max-w-lg">
        <div>
          <label className="block mb-1 font-medium" htmlFor="title">
            Ad Title
          </label>
          <Input id="title" placeholder="e.g., City Billboard Launch" />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="location">
            Target Location
          </label>
          <Input id="location" placeholder="e.g., Sunset Blvd, Los Angeles" />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="description">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Briefly describe what this ad is promoting and any targeting preferences."
          />
        </div>

        <Button type="submit">Submit Placement</Button>
      </form>
    </main>
  );
}
