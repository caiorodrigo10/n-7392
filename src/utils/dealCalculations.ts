import { Deal } from "@/types/deals";

export const calculateColumnTotal = (deals: Deal[]) => {
  return deals.reduce((total, deal) => {
    const value = parseFloat(deal.value.replace(/[$,]/g, ''));
    return total + value;
  }, 0);
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};