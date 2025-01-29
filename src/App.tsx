import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";
import Contacts from "./pages/Contacts";
import Companies from "./pages/Companies";
import Deals from "./pages/Deals";
import Goals from "./pages/Goals";
import FunnelGoalsOverview from "./pages/FunnelGoalsOverview";
import ContactDetails from "./pages/ContactDetails";
import { AiChat } from "./components/AiChat";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
        <Route path="/calendar" element={<Calendar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
        <Route path="/contacts" element={<Contacts isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
        <Route path="/companies" element={<Companies isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
        <Route path="/deals" element={<Deals isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
        <Route path="/goals" element={<Goals isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
        <Route path="/funnel-goals-overview" element={<FunnelGoalsOverview isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
        <Route path="/contact/:id" element={<ContactDetails isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
      </Routes>
      <AiChat />
    </Router>
  );
}

export default App;