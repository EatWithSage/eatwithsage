import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Product from "@/pages/product";
import About from "@/pages/about";
import GroceryIndustry from "@/pages/industry/grocery";
import RestaurantsIndustry from "@/pages/industry/restaurants";
import MealKitsIndustry from "@/pages/industry/meal-kits";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product" component={Product} />
      <Route path="/about" component={About} />
      <Route path="/industry/grocery" component={GroceryIndustry} />
      <Route path="/industry/restaurants" component={RestaurantsIndustry} />
      <Route path="/industry/meal-kits" component={MealKitsIndustry} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
