
import React from 'react';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AddCalculationButtonProps {
  onClick: () => void;
}

export const AddCalculationButton = ({ onClick }: AddCalculationButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 text-muted-foreground hover:text-foreground"
            onClick={onClick}
          >
            <Calculator className="h-3 w-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent align="center" side="top">
          <p className="text-xs">Add calculation</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
