"use client";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  ArrowLeft,
  Loader2,
  Download,
  Eye,
  Package,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

export default function JobDetailPage() {
  const params = useParams();
  const jobId = Number(params.id);

  const { data: job, isLoading: jobLoading } = api.analysis.getJob.useQuery({
    jobId,
  });
  const { data: results, isLoading: resultsLoading } =
    api.analysis.getJobResults.useQuery({ jobId });
  const { data: counts, isLoading: countsLoading } =
    api.analysis.getJobCounts.useQuery({ jobId });

  if (jobLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Loading job details...</p>
          </div>
        </Card>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Card className="p-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The analysis job you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2">
          {job.originalFileName || `Analysis #${job.id}`}
        </h1>
        <p className="text-muted-foreground">
          Created {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          {job.completedAt &&
            ` • Completed ${formatDistanceToNow(new Date(job.completedAt), {
              addSuffix: true,
            })}`}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold">
                {results?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Total Detections</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold">
                {counts?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Object Types</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Eye className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold capitalize">{job.status}</div>
              <div className="text-sm text-muted-foreground">Status</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Counts Summary */}
      {counts && counts.length > 0 && (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Object Counts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {counts.map((count) => (
              <div key={count.id} className="p-4 rounded-lg border bg-card">
                <div className="text-2xl font-bold">{count.count}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {count.objectType}
                </div>
                {count.frameNumber !== null && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Frame {count.frameNumber}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Results Grid */}
      {resultsLoading ? (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Loading results...</p>
          </div>
        </Card>
      ) : results && results.length > 0 ? (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Detected Objects ({results.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((result) => (
              <Card key={result.id} className="p-4">
                {result.croppedImageUrl && (
                  <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={result.croppedImageUrl}
                      alt={`${result.objectType} ${result.id}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold capitalize">
                      {result.objectType}
                    </span>
                    {result.confidence && (
                      <span className="text-xs text-muted-foreground">
                        {(result.confidence * 100).toFixed(1)}%
                      </span>
                    )}
                  </div>
                  {result.description && (
                    <p className="text-sm text-muted-foreground">
                      {result.description}
                    </p>
                  )}
                  {result.frameNumber !== null && (
                    <p className="text-xs text-muted-foreground">
                      Frame: {result.frameNumber}
                    </p>
                  )}
                  {result.boundingBox &&
                    typeof result.boundingBox === "object" && (
                      <div className="text-xs text-muted-foreground">
                        BBox: ({Math.round((result.boundingBox as any).x)},{" "}
                        {Math.round((result.boundingBox as any).y)}) -{" "}
                        {Math.round((result.boundingBox as any).width)}x
                        {Math.round((result.boundingBox as any).height)}
                      </div>
                    )}
                </div>
              </Card>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="p-12">
          <div className="text-center">
            <p className="text-muted-foreground">No results found for this job.</p>
          </div>
        </Card>
      )}
    </main>
  );
}

