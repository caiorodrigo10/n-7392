import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  selectedCount?: number;
  onAddClick: () => void;
}

export function PageHeader({ 
  title, 
  subtitle, 
  buttonLabel, 
  selectedCount, 
  onAddClick 
}: PageHeaderProps) {
  return (
    <div className="px-6 pt-4 pb-4 w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {title} {selectedCount !== undefined && selectedCount > 0 && 
              `(${selectedCount} selected)`}
          </h1>
          <p className="text-gray-600 mt-1">{subtitle}</p>
        </div>
        <Button 
          onClick={onAddClick}
          className="flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          <span>{buttonLabel}</span>
        </Button>
      </div>
    </div>
  );
}