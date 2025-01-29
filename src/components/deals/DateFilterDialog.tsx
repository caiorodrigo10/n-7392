import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DateFilterDialogProps {
  children: React.ReactNode;
}

const DateFilterDialog = ({ children }: DateFilterDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-[280px]">
        <DialogHeader>
          <DialogTitle>Select Period</DialogTitle>
          <DialogDescription>
            Choose a time period to filter your deals
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Quick Access</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md">This Month</button>
              <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md">Last Month</button>
              <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md">This Quarter</button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Past</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md">Last 30 days</button>
              <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md">Last 60 days</button>
              <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md">Last 90 days</button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Future</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md">Next 30 days</button>
              <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md">Next 60 days</button>
              <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md">Next 90 days</button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DateFilterDialog;