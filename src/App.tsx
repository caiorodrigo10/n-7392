import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Contacts from "./pages/Contacts";
import ContactDetails from "./pages/ContactDetails";
import Companies from "./pages/Companies";
import Deals from "./pages/Deals";
import Calendar from "./pages/Calendar";
import { AiChat } from "./components/AiChat";

const queryClient = new QueryClient();

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
            <Route path="/contacts" element={<Contacts isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
            <Route path="/contacts/:id" element={<ContactDetails isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
            <Route path="/companies" element={<Companies isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
            <Route path="/deals" element={<Deals isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
            <Route path="/calendar" element={<Calendar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
          </Routes>
          <AiChat />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;