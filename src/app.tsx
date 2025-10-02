import { Link, Route, Switch } from "wouter";

import { Button } from "@/components/ui/button";
import HealthRoute from "@/routes/health";
import HomeRoute from "@/routes/home";

const App = () => (
  <Switch>
    <Route path="/">
      <HomeRoute />
    </Route>

    <Route path="/health">
      <HealthRoute />
    </Route>

    <Route>
      <NotFoundRoute />
    </Route>
  </Switch>
);

const NotFoundRoute = () => (
  <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-4 px-6 text-center">
    <h2 className="text-3xl font-semibold">Route not found</h2>
    <p className="text-muted-foreground max-w-md">
      Use the link below to return to the example routes bundled with this starter.
    </p>
    <Link href="/" asChild>
      <Button variant="outline">Go home</Button>
    </Link>
  </div>
);

export default App;
