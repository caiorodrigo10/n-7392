import React from "react";

interface TableContainerProps {
  children: React.ReactNode;
}

export const TableContainer = ({ children }: TableContainerProps) => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm flex flex-col">
      <div className="w-full overflow-auto flex-1">
        {children}
      </div>
    </div>
  );
};