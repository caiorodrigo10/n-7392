
import React from 'react';
import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

interface DateCellProps {
  date: Date | string;
  formatType?: 'absolute' | 'relative' | 'short';
  showTime?: boolean;
}

export function DateCell({ 
  date, 
  formatType = 'absolute',
  showTime = false 
}: DateCellProps) {
  let dateObj: Date;

  if (typeof date === 'string') {
    dateObj = parseISO(date);
  } else {
    dateObj = date;
  }

  if (!isValid(dateObj)) {
    return <span className="text-muted-foreground">Invalid date</span>;
  }

  const formatDate = () => {
    switch (formatType) {
      case 'relative':
        return formatDistanceToNow(dateObj, { addSuffix: true });
      case 'short':
        return format(dateObj, showTime ? 'MMM d, HH:mm' : 'MMM d, yyyy');
      case 'absolute':
      default:
        return format(dateObj, showTime ? 'MMM d, yyyy HH:mm' : 'MMM d, yyyy');
    }
  };

  return (
    <span className="text-sm" title={format(dateObj, 'PPpp')}>
      {formatDate()}
    </span>
  );
}
