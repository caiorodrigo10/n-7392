type AnalysisResult = {
  intent: 'comparison' | 'trend' | 'distribution' | 'relationship';
  metric: string;
  timeFrame?: 'day' | 'week' | 'month' | 'quarter' | 'year';
  dimension?: string;
  aggregation?: 'sum' | 'average' | 'count';
};

export function analyzeQuery(query: string): AnalysisResult {
  // Análise básica de intenção baseada em palavras-chave
  const result: AnalysisResult = {
    intent: 'comparison',
    metric: 'value'
  };

  // Detecta intenção
  if (query.includes('evolução') || query.includes('tendência') || query.includes('ao longo')) {
    result.intent = 'trend';
  } else if (query.includes('distribuição') || query.includes('proporção')) {
    result.intent = 'distribution';
  } else if (query.includes('relação') || query.includes('correlação')) {
    result.intent = 'relationship';
  }

  // Detecta período
  if (query.includes('dia')) {
    result.timeFrame = 'day';
  } else if (query.includes('semana')) {
    result.timeFrame = 'week';
  } else if (query.includes('mês')) {
    result.timeFrame = 'month';
  } else if (query.includes('trimestre')) {
    result.timeFrame = 'quarter';
  } else if (query.includes('ano')) {
    result.timeFrame = 'year';
  }

  // Detecta dimensão
  if (query.includes('por vendedor')) {
    result.dimension = 'assignee';
  } else if (query.includes('por empresa')) {
    result.dimension = 'company';
  }

  return result;
}