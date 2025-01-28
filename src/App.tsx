import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Contacts from "./pages/Contacts";
import ContactDetails from "./pages/ContactDetails";
import Companies from "./pages/Companies";
import Deals from "./pages/Deals";
import Calendar from "./pages/Calendar";
import Goals from "./pages/Goals";
import FunnelGoalsOverview from "./pages/FunnelGoalsOverview";
import { AiChat } from "./components/AiChat";

const queryClient = new QueryClient();

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
            <Route path="/contacts" element={<Contacts isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
            <Route path="/contacts/:id" element={<ContactDetails isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
            <Route path="/companies" element={<Companies isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
            <Route path="/deals" element={<Deals isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
            <Route path="/calendar" element={<Calendar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
            <Route path="/goals" element={<Goals isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
            <Route path="/funnel-goals-overview" element={<FunnelGoalsOverview isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
          </Routes>
          <AiChat />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;