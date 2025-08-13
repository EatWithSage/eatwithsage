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
import FoodRetailersIndustry from "@/pages/industry/food-retailers";
import FoodBrandsIndustry from "@/pages/industry/food-brands";
import ChronicDiseaseFoundationsIndustry from "@/pages/industry/chronic-disease-foundations";
import SelfInsuredEmployersIndustry from "@/pages/industry/self-insured-employers";
import KitchenApplianceManufacturersIndustry from "@/pages/industry/kitchen-appliance-manufacturers";
import FoodHealthMediaIndustry from "@/pages/industry/food-health-media";
import TechCompaniesIndustry from "@/pages/industry/tech-companies";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product" component={Product} />
      <Route path="/about" component={About} />
      <Route path="/industry/food-retailers" component={FoodRetailersIndustry} />
      <Route path="/industry/food-brands" component={FoodBrandsIndustry} />
      <Route path="/industry/chronic-disease-foundations" component={ChronicDiseaseFoundationsIndustry} />
      <Route path="/industry/self-insured-employers" component={SelfInsuredEmployersIndustry} />
      <Route path="/industry/kitchen-appliance-manufacturers" component={KitchenApplianceManufacturersIndustry} />
      <Route path="/industry/food-health-media" component={FoodHealthMediaIndustry} />
      <Route path="/industry/tech-companies" component={TechCompaniesIndustry} />
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
