
import React from 'react';

interface CurrencyCellProps {
  amount: number | string;
  currency?: string;
  locale?: string;
  showSign?: boolean;
}

export function CurrencyCell({ 
  amount, 
  currency = 'USD', 
  locale = 'en-US',
  showSign = true 
}: CurrencyCellProps) {
  const numericAmount = typeof amount === 'string' 
    ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) 
    : amount;

  if (isNaN(numericAmount)) {
    return <span className="text-muted-foreground">-</span>;
  }

  const formatted = new Intl.NumberFormat(locale, {
    style: showSign ? 'currency' : 'decimal',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(numericAmount);

  const isNegative = numericAmount < 0;
  const isPositive = numericAmount > 0;

  return (
    <span className={`font-medium ${
      isNegative ? 'text-red-600' : 
      isPositive ? 'text-green-600' : 
      'text-gray-900'
    }`}>
      {formatted}
    </span>
  );
}
