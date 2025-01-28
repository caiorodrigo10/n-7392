import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, PieChart, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Navbar = ({ isCollapsed, setIsCollapsed }: NavbarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className={cn(
      "fixed left-0 top-0 h-full flex transition-all duration-300 z-50",
      isCollapsed ? "w-[60px]" : "w-full sm:w-64"
    )}>
      <nav className="w-full bg-secondary p-4 relative">
        <div className={cn(
          "mb-8 flex items-center",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && <h1 className="text-2xl font-bold text-white">CRM</h1>}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-primary/20"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <div className="space-y-2">
          <Link
            to="/"
            className={cn(
              "flex items-center p-3 rounded-lg transition-colors text-white/80",
              isCollapsed ? "justify-center" : "space-x-3",
              isActive("/") ? "bg-primary text-white" : "hover:bg-white/10"
            )}
          >
            <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          
          <Link
            to="/contacts"
            className={cn(
              "flex items-center p-3 rounded-lg transition-colors text-white/80",
              isCollapsed ? "justify-center" : "space-x-3",
              isActive("/contacts") ? "bg-primary text-white" : "hover:bg-white/10"
            )}
          >
            <Users className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Contacts</span>}
          </Link>
          
          <Link
            to="/deals"
            className={cn(
              "flex items-center p-3 rounded-lg transition-colors text-white/80",
              isCollapsed ? "justify-center" : "space-x-3",
              isActive("/deals") ? "bg-primary text-white" : "hover:bg-white/10"
            )}
          >
            <PieChart className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Deals</span>}
          </Link>

          <Link
            to="/calendar"
            className={cn(
              "flex items-center p-3 rounded-lg transition-colors text-white/80",
              isCollapsed ? "justify-center" : "space-x-3",
              isActive("/calendar") ? "bg-primary text-white" : "hover:bg-white/10"
            )}
          >
            <Calendar className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Calendar</span>}
          </Link>
        </div>
      </nav>
      <Separator orientation="vertical" className="h-full bg-white/10" />
    </div>
  );
};

export default Navbar;