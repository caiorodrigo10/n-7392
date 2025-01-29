import { Deal, DealsState } from "@/types/deals";

export interface DataPoint {
  label: string;
  value: number;
  count?: number;
  additionalData?: Record<string, any>;
}

export function processDealsData(
  deals: DealsState,
  dimension?: string,
  timeFrame?: string
): DataPoint[] {
  const allDeals = Object.values(deals).flat();
  
  if (dimension === 'assignee') {
    return processDataByAssignee(allDeals);
  }
  
  if (dimension === 'company') {
    return processDataByCompany(allDeals);
  }
  
  if (timeFrame) {
    return processDataByTime(allDeals, timeFrame);
  }
  
  return processDataByStage(deals);
}

function processDataByAssignee(deals: Deal[]): DataPoint[] {
  const byAssignee = deals.reduce((acc, deal) => {
    const name = deal.assignee.name;
    if (!acc[name]) {
      acc[name] = { label: name, value: 0, count: 0 };
    }
    acc[name].value += parseFloat(deal.value.replace(/[^0-9.-]+/g, ""));
    acc[name].count! += 1;
    return acc;
  }, {} as Record<string, DataPoint>);

  return Object.values(byAssignee);
}

function processDataByCompany(deals: Deal[]): DataPoint[] {
  const byCompany = deals.reduce((acc, deal) => {
    if (!acc[deal.company]) {
      acc[deal.company] = { label: deal.company, value: 0, count: 0 };
    }
    acc[deal.company].value += parseFloat(deal.value.replace(/[^0-9.-]+/g, ""));
    acc[deal.company].count! += 1;
    return acc;
  }, {} as Record<string, DataPoint>);

  return Object.values(byCompany);
}

function processDataByTime(deals: Deal[], timeFrame: string): DataPoint[] {
  const byTime = deals.reduce((acc, deal) => {
    const date = new Date(deal.stageEnteredAt);
    const key = getTimeKey(date, timeFrame);
    
    if (!acc[key]) {
      acc[key] = { label: key, value: 0, count: 0 };
    }
    
    acc[key].value += parseFloat(deal.value.replace(/[^0-9.-]+/g, ""));
    acc[key].count! += 1;
    return acc;
  }, {} as Record<string, DataPoint>);

  return Object.values(byTime)
    .sort((a, b) => a.label.localeCompare(b.label));
}

function processDataByStage(deals: DealsState): DataPoint[] {
  return Object.entries(deals).map(([stage, dealsInStage]) => ({
    label: stage.charAt(0).toUpperCase() + stage.slice(1),
    value: dealsInStage.reduce((sum, deal) => {
      const value = parseFloat(deal.value.replace(/[^0-9.-]+/g, ""));
      return sum + value;
    }, 0),
    count: dealsInStage.length
  }));
}

function getTimeKey(date: Date, timeFrame: string): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric'
  };
  
  if (timeFrame === 'day') {
    options.day = 'numeric';
  }
  
  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}