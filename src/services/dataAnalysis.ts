import { Deal, DealsState } from "@/types/deals";

type DataType = 'comparison' | 'trend' | 'distribution' | 'relationship' | 'hierarchy' | 'flow';
type TimeFrame = 'day' | 'week' | 'month' | 'quarter' | 'year';

interface AnalysisContext {
  metric: string;
  timeFrame?: TimeFrame;
  dimension?: string;
  filters?: Record<string, any>;
  comparisonType?: string;
}

export function analyzeIntent(query: string): AnalysisContext {
  const context: AnalysisContext = {
    metric: 'value'
  };

  // Análise temporal
  if (query.toLowerCase().includes('evolução') || 
      query.toLowerCase().includes('tendência') ||
      query.toLowerCase().includes('ao longo do tempo')) {
    context.timeFrame = 'month';
  }

  // Análise dimensional
  if (query.toLowerCase().includes('por região')) {
    context.dimension = 'region';
  } else if (query.toLowerCase().includes('por vendedor') || 
             query.toLowerCase().includes('por responsável')) {
    context.dimension = 'assignee';
  }

  // Análise de relacionamento
  if (query.toLowerCase().includes('relação') || 
      query.toLowerCase().includes('correlação')) {
    context.comparisonType = 'relationship';
  }

  // Análise de distribuição
  if (query.toLowerCase().includes('distribuição') || 
      query.toLowerCase().includes('proporção')) {
    context.comparisonType = 'distribution';
  }

  console.log('Análise de contexto:', context);
  return context;
}

export function determineVisualizationType(context: AnalysisContext, data: any[]): DataType {
  if (context.comparisonType === 'relationship') {
    return 'relationship';
  }
  
  if (context.timeFrame) {
    return 'trend';
  }
  
  if (context.comparisonType === 'distribution' || 
      (context.dimension && data.length > 5)) {
    return 'distribution';
  }

  return 'comparison';
}

export function processDealsData(deals: DealsState, context: AnalysisContext) {
  const allDeals = Object.values(deals).flat();
  
  if (context.comparisonType === 'relationship') {
    return processRelationshipData(allDeals);
  }
  
  if (context.dimension === 'assignee') {
    return processDataByAssignee(allDeals);
  }
  
  if (context.timeFrame) {
    return processDataByTime(allDeals, context.timeFrame);
  }

  return processDefaultView(allDeals);
}

function processRelationshipData(deals: Deal[]) {
  return deals.map(deal => ({
    x: parseFloat(deal.value.replace(/[^0-9.-]+/g, "")),
    y: 1,
    name: deal.title
  }));
}

function processDataByAssignee(deals: Deal[]) {
  const byAssignee = deals.reduce((acc, deal) => {
    const name = deal.assignee.name;
    if (!acc[name]) {
      acc[name] = {
        name,
        value: 0,
        count: 0
      };
    }
    acc[name].value += parseFloat(deal.value.replace(/[^0-9.-]+/g, ""));
    acc[name].count += 1;
    return acc;
  }, {} as Record<string, { name: string; value: number; count: number }>);

  return Object.values(byAssignee);
}

function processDataByTime(deals: Deal[], timeFrame: TimeFrame) {
  const byTime = deals.reduce((acc, deal) => {
    const date = new Date(deal.stageEnteredAt);
    const key = getTimeKey(date, timeFrame);
    
    if (!acc[key]) {
      acc[key] = {
        date: key,
        value: 0,
        count: 0
      };
    }
    
    acc[key].value += parseFloat(deal.value.replace(/[^0-9.-]+/g, ""));
    acc[key].count += 1;
    return acc;
  }, {} as Record<string, { date: string; value: number; count: number }>);

  return Object.values(byTime).sort((a, b) => a.date.localeCompare(b.date));
}

function processDefaultView(deals: Deal[]) {
  return deals.map(deal => ({
    name: deal.title,
    value: parseFloat(deal.value.replace(/[^0-9.-]+/g, "")),
    company: deal.company
  }));
}

function getTimeKey(date: Date, timeFrame: TimeFrame): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric'
  };
  
  if (timeFrame === 'day') {
    options.day = 'numeric';
  }
  
  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}