"use client";

import { api } from "~/trpc/react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Camera,
  Video,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Eye,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function DashboardPage() {
  const { data: jobs, isLoading } = api.analysis.getJobs.useQuery({
    limit: 50,
    offset: 0,
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "processing":
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-600 dark:text-green-400";
      case "failed":
        return "bg-destructive/20 text-destructive";
      case "processing":
        return "bg-blue-500/20 text-blue-600 dark:text-blue-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Analysis Dashboard</h1>
        <p className="text-muted-foreground">
          View all your image and video analysis jobs
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mb-6">
        <Button asChild>
          <Link href="/analyze">
            <Camera className="mr-2 h-4 w-4" />
            New Image Analysis
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/analyze">
            <Video className="mr-2 h-4 w-4" />
            New Video Analysis
          </Link>
        </Button>
      </div>

      {/* Jobs List */}
      {isLoading ? (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Loading analyses...</p>
          </div>
        </Card>
      ) : !jobs || jobs.length === 0 ? (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No analyses yet</h3>
            <p className="text-muted-foreground mb-4">
              Get started by analyzing an image or video
            </p>
            <Button asChild>
              <Link href="/analyze">Start Analysis</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {job.type === "image" ? (
                      <Camera className="h-5 w-5 text-primary" />
                    ) : (
                      <Video className="h-5 w-5 text-primary" />
                    )}
                    <h3 className="text-lg font-semibold">
                      {job.originalFileName || `Analysis #${job.id}`}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>
                      {formatDistanceToNow(new Date(job.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                    {job.metadata &&
                      typeof job.metadata === "object" &&
                      "totalDetections" in job.metadata && (
                        <span>
                          {job.metadata.totalDetections as number} detections
                        </span>
                      )}
                    {job.metadata &&
                      typeof job.metadata === "object" &&
                      "counts" in job.metadata &&
                      job.metadata.counts &&
                      typeof job.metadata.counts === "object" && (
                        <span>
                          {Object.keys(job.metadata.counts as Record<string, unknown>).length}{" "}
                          object types
                        </span>
                      )}
                  </div>
                  {job.metadata &&
                    typeof job.metadata === "object" &&
                    "counts" in job.metadata &&
                    job.metadata.counts &&
                    typeof job.metadata.counts === "object" && (
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(
                          job.metadata.counts as Record<string, number>
                        ).map(([type, count]) => (
                          <span
                            key={type}
                            className="px-2 py-1 text-xs rounded bg-muted"
                          >
                            {type}: {count}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(job.status)}
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/dashboard/job/${job.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Back Link */}
      <div className="mt-8">
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}

