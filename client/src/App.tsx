import React from "react";
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
import { FoodBrandsPage } from "@/pages/industry/food-brands";
import { ChronicDiseasePage } from "@/pages/industry/chronic-disease";
import { EmployersPage } from "@/pages/industry/employers";
import { KitchenAppliancesPage } from "@/pages/industry/kitchen-appliances";
import { MediaTechPage } from "@/pages/industry/media-tech";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product" component={Product} />
      <Route path="/about" component={About} />
      <Route path="/industry/grocery" component={GroceryIndustry} />
      <Route path="/industry/restaurants" component={RestaurantsIndustry} />
      <Route path="/industry/meal-kits" component={MealKitsIndustry} />
      <Route path="/industry/food-brands" component={FoodBrandsPage} />
      <Route path="/industry/chronic-disease" component={ChronicDiseasePage} />
      <Route path="/industry/employers" component={EmployersPage} />
      <Route path="/industry/kitchen-appliances" component={KitchenAppliancesPage} />
      <Route path="/industry/media-tech" component={MediaTechPage} />
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
