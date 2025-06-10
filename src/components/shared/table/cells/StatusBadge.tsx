
import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export function StatusBadge({ status, variant = 'default' }: StatusBadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      default:
        // Auto-detect based on status text
        const lowerStatus = status.toLowerCase();
        if (lowerStatus.includes('active') || lowerStatus.includes('completed') || lowerStatus.includes('excellent')) {
          return 'bg-green-100 text-green-700';
        } else if (lowerStatus.includes('pending') || lowerStatus.includes('average')) {
          return 'bg-yellow-100 text-yellow-700';
        } else if (lowerStatus.includes('inactive') || lowerStatus.includes('failed') || lowerStatus.includes('poor')) {
          return 'bg-red-100 text-red-700';
        } else if (lowerStatus.includes('good')) {
          return 'bg-blue-100 text-blue-700';
        }
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className={cn(
      'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
      getVariantStyles()
    )}>
      {status}
    </div>
  );
}
