import { Link, useLocation } from "react-router-dom";
import { 
  Bell, 
  CheckSquare, 
  Mail, 
  BarChart2, 
  Play,
  Users,
  Building2,
  DollarSign,
  Share2,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Workflow,
  Calendar,
  Target,
  LayoutDashboard
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

interface NavbarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Navbar = ({ isCollapsed, setIsCollapsed }: NavbarProps) => {
  const location = useLocation();
  const [automationsOpen, setAutomationsOpen] = useState(true);
  const [recordsOpen, setRecordsOpen] = useState(true);
  const [listsOpen, setListsOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const NavLink = ({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) => {
    const link = (
      <Link
        to={to}
        className={cn(
          "flex items-center py-1.5 rounded-lg transition-colors text-neutral-600 text-sm",
          isCollapsed ? "justify-center w-full px-0 mx-0" : "space-x-3 px-2",
          isActive(to) ? "bg-[#E5DEFF] text-[#9b87f5]" : "hover:bg-[#F1F0FB]"
        )}
      >
        <Icon className="h-4 w-4 flex-shrink-0" />
        {!isCollapsed && <span>{children}</span>}
      </Link>
    );

    if (isCollapsed) {
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              {link}
            </TooltipTrigger>
            <TooltipContent side="right">
              {children}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return link;
  };

  const NavSection = ({ 
    title, 
    isOpen, 
    onToggle, 
    children 
  }: { 
    title: string; 
    isOpen: boolean; 
    onToggle: (value: boolean) => void; 
    children: React.ReactNode 
  }) => (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger className={cn(
        "flex items-center w-full py-1.5 px-2 text-neutral-500 hover:bg-[#F1F0FB] rounded-lg text-sm",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && <span>{title}</span>}
        {!isCollapsed && <ChevronDown className={cn(
          "h-3 w-3 transition-transform",
          isOpen ? "transform rotate-180" : ""
        )} />}
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-0.5">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full flex flex-col transition-all duration-300 z-50 bg-white shadow-sm",
      isCollapsed ? "w-[60px]" : "w-full sm:w-64"
    )}>
      <nav className="w-full p-3 bg-white">
        <div className={cn(
          "mb-6 flex items-center",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && (
            <div className="flex items-center gap-2 pl-1">
              <div className="w-8 h-8 bg-primary rounded-lg overflow-hidden flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div className="font-semibold text-xl text-neutral-800">Avantto</div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-neutral-600 hover:bg-[#F1F0FB]"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <div className={cn(
          "space-y-0.5",
          !isCollapsed && "pl-2"
        )}>
          <NavLink to="/" icon={LayoutDashboard}>Dashboard</NavLink>
          <NavLink to="/notifications" icon={Bell}>Notifications</NavLink>
          <NavLink to="/tasks" icon={CheckSquare}>Tasks</NavLink>
          <NavLink to="/calendar" icon={Calendar}>Calendar</NavLink>
          <NavLink to="/emails" icon={Mail}>Conversations</NavLink>
          <NavLink to="/goals" icon={Target}>Goals</NavLink>
          <NavLink to="/reports" icon={BarChart2}>Reports</NavLink>

          <NavSection title="Automations" isOpen={automationsOpen} onToggle={setAutomationsOpen}>
            <NavLink to="/workflows" icon={Workflow}>Workflows</NavLink>
            <NavLink to="/sequences" icon={Play}>Sequences</NavLink>
          </NavSection>

          <NavSection title="Records" isOpen={recordsOpen} onToggle={setRecordsOpen}>
            <NavLink to="/companies" icon={Building2}>Companies</NavLink>
            <NavLink to="/contacts" icon={Users}>People</NavLink>
            <NavLink to="/deals" icon={DollarSign}>Deals</NavLink>
          </NavSection>

          <NavSection title="Lists" isOpen={listsOpen} onToggle={setListsOpen}>
            <NavLink to="/strategic-accounts" icon={Share2}>Strategic accounts</NavLink>
          </NavSection>

          <NavLink to="/help" icon={HelpCircle}>Help and first steps</NavLink>
        </div>
      </nav>
      
      <div className="mt-auto bg-white">
        <div className={cn(
          "p-3 border-t border-neutral-200 w-full",
          isCollapsed ? "text-center" : ""
        )}>
          <div className={cn(
            "flex items-center gap-2 text-sm text-neutral-600",
            isCollapsed ? "justify-center" : "justify-between"
          )}>
            {!isCollapsed ? (
              <>
                <div className="flex items-center gap-2">
                  <span>14 days left on trial!</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary/90 hover:bg-primary/10 px-3 py-1 h-auto"
                >
                  Add billing
                </Button>
              </>
            ) : (
              <span className="text-xs">14d</span>
            )}
          </div>
        </div>
        <Separator orientation="vertical" className="h-full" />
      </div>
    </div>
  );
};

export default Navbar;