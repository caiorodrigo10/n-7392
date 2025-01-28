import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export const Layout = ({ children, isCollapsed, setIsCollapsed }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`transition-all duration-300 ${isCollapsed ? "ml-[60px]" : "ml-0 sm:ml-64"}`}>
        {children}
      </main>
    </div>
  );
};