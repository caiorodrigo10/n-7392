import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export const Layout = ({ children, isCollapsed, setIsCollapsed }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F1F3FA]">
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`transition-all duration-300 h-full ${isCollapsed ? "ml-[60px]" : "ml-0 sm:ml-64"}`}>
        <div className="container mx-auto p-6 h-full">
          {children}
        </div>
      </main>
    </div>
  );
};