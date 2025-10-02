import { useState } from "react";

import { Link } from "wouter";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";

const HomeRoute = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-12 px-6 py-12 text-center">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Routing Demo
        </p>
        <h1 className="text-4xl font-bold text-primary">Vite + React + Wouter</h1>
        <p className="text-muted-foreground max-w-xl">
          This starter now mounts a lightweight router. Try the navigation below to load the API
          health check route without a full page refresh.
        </p>
      </div>

      <nav className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className={(active) => getNavLinkClasses(active)}>
          Home
        </Link>
        <Link href="/health" className={(active) => getNavLinkClasses(active)}>
          API Health
        </Link>
      </nav>

      <div className="flex items-center justify-center gap-6">
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

      <Card>
        <CardContent className="pt-6 text-center">
          <Button onClick={() => setCount((value) => value + 1)} className="mb-4">
            count is {count}
          </Button>
          <CardDescription>
            Edit <code className="bg-muted px-2 py-1 rounded text-sm font-mono">src/routes/home.tsx</code>{" "}
            and save to test HMR
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

const getNavLinkClasses = (isActive: boolean) =>
  `rounded-full border border-border px-4 py-2 text-sm font-medium transition-all hover:border-primary ${isActive ? "bg-primary text-primary-foreground" : "bg-background"}`;

export default HomeRoute;
