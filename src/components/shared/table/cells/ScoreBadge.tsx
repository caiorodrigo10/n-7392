
import React from 'react';
import { ChartBar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScoreBadgeProps {
  score: number;
  maxScore?: number;
  showIcon?: boolean;
}

export function ScoreBadge({ score, maxScore = 10, showIcon = true }: ScoreBadgeProps) {
  const percentage = (score / maxScore) * 100;
  
  const getScoreColor = () => {
    if (percentage >= 70) return 'text-green-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex items-center gap-1">
      {showIcon && <ChartBar className="h-3 w-3" />}
      <div className={cn('font-medium text-xs', getScoreColor())}>
        {score}/{maxScore}
      </div>
    </div>
  );
}
