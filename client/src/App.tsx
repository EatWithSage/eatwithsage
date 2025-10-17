import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useHubSpotTracking } from "@/hooks/use-hubspot-tracking";
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
import ShopRite from "@/pages/ShopRite";
import Gelsons from "@/pages/Gelsons";
import SmartAndFinal from "@/pages/SmartAndFinal";
import StaterBros from "@/pages/StaterBros";
import WeisMarkets from "@/pages/WeisMarkets";
import Publix from "@/pages/Publix";
import GiantEagle from "@/pages/GiantEagle";
import HyVee from "@/pages/Hy-Vee";
import Cronin from "@/pages/Cronin";
import FreshThymeMarket from "@/pages/FreshThymeMarket";
import Sprouts from "@/pages/Sprouts";
import IndexPage from "@/pages/index";

function Router() {
  // Track HubSpot page views on route changes
  useHubSpotTracking();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product" component={Product} />
      <Route path="/about" component={About} />
      <Route path="/index" component={IndexPage} />
      <Route path="/industry/food-retailers" component={FoodRetailersIndustry} />
      <Route path="/industry/food-brands" component={FoodBrandsIndustry} />
      <Route path="/industry/chronic-disease-foundations" component={ChronicDiseaseFoundationsIndustry} />
      <Route path="/industry/self-insured-employers" component={SelfInsuredEmployersIndustry} />
      <Route path="/industry/kitchen-appliance-manufacturers" component={KitchenApplianceManufacturersIndustry} />
      <Route path="/industry/food-health-media" component={FoodHealthMediaIndustry} />
      <Route path="/industry/tech-companies" component={TechCompaniesIndustry} />
      <Route path="/ShopRite" component={ShopRite} />
      <Route path="/Gelsons" component={Gelsons} />
      <Route path="/SmartAndFinal" component={SmartAndFinal} />
      <Route path="/StaterBros" component={StaterBros} />
      <Route path="/WeisMarkets" component={WeisMarkets} />
      <Route path="/Publix" component={Publix} />
      <Route path="/GiantEagle" component={GiantEagle} />
      <Route path="/Hy-Vee" component={HyVee} />
      <Route path="/cronin" component={Cronin} />
      <Route path="/freshthymemarket" component={FreshThymeMarket} />
      <Route path="/sprouts" component={Sprouts} />
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
