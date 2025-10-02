import { useState } from "react";

import { Link } from "wouter";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HealthRoute = () => {
  const [healthStatus, setHealthStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkHealth = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/health");
      const data = await response.json();
      setHealthStatus(
        `Status: ${data.status}, Time: ${new Date(data.timestamp).toLocaleString()}`,
      );
    } catch {
      setHealthStatus("API request failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-10 px-6 py-12 text-center">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Routing Demo
        </p>
        <h1 className="text-4xl font-bold text-primary">API Health Check</h1>
        <p className="text-muted-foreground max-w-2xl">
          This page fetches the Express `/api/health` endpoint to verify that the server is reachable
          from the client. Try triggering the request with the button below.
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Check the API</CardTitle>
          <CardDescription>
            The example uses the native fetch API and is safe to reuse in your own route components.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={checkHealth} disabled={isLoading} variant="secondary">
            {isLoading ? "Checking..." : "Test API Health"}
          </Button>
          {healthStatus && (
            <div className="bg-muted border border-border rounded-md p-4">
              <p className="text-muted-foreground text-sm">
                {healthStatus}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Link href="/" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
        Back to the home demo
      </Link>
    </div>
  );
};

export default HealthRoute;
