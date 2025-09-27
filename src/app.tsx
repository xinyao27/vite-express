import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);
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
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
      <div className="flex items-center gap-6 mb-8">
        <a
          href="https://vite.dev"
          target="_blank"
          rel="noopener"
          className="transition-transform hover:scale-110"
        >
          <img
            src={viteLogo}
            className="h-16 w-16 drop-shadow-lg hover:drop-shadow-xl transition-all"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noopener"
          className="transition-transform hover:scale-110"
        >
          <img
            src={reactLogo}
            className="h-16 w-16 animate-spin-slow drop-shadow-lg hover:drop-shadow-xl transition-all"
            alt="React logo"
          />
        </a>
      </div>

      <h1 className="text-4xl font-bold text-primary mb-12">Vite + React</h1>

      <Card className="mb-6">
        <CardContent className="text-center">
          <Button onClick={() => setCount((count) => count + 1)} className="mb-4">
            count is {count}
          </Button>
          <CardDescription>
            Edit <code className="bg-muted px-2 py-1 rounded text-sm font-mono">src/App.tsx</code> and save to test HMR
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md mb-8">
        <CardHeader>
          <CardTitle>API Health Check</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={checkHealth}
            disabled={isLoading}
            variant="secondary"
            className="w-full mb-4"
          >
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

      <p className="text-muted-foreground text-center max-w-md">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
