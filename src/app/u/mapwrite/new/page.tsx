// app/mapwrite/create/page.tsx

import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <main className="space-y-6 p-8">
      <h1 className="text-3xl font-bold">Create a New Ad Placement</h1>
      <form className="max-w-lg space-y-4">
        <div>
          <label className="mb-1 block font-medium" htmlFor="title">
            Ad Title
          </label>
          <Input id="title" placeholder="e.g., City Billboard Launch" />
        </div>

        <div>
          <label className="mb-1 block font-medium" htmlFor="location">
            Target Location
          </label>
          <Input id="location" placeholder="e.g., Sunset Blvd, Los Angeles" />
        </div>

        <div>
          <label className="mb-1 block font-medium" htmlFor="description">
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
