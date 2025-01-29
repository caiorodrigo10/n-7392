export interface AnalysisResult {
  dimension: string;
  timeFrame?: string;
  metric?: string;
  filters?: Record<string, any>;
}

export function analyzeQuery(query: string): AnalysisResult {
  // Basic NLP analysis
  const hasTime = query.match(/tempo|período|mês|ano|semana/i);
  const hasDimension = query.match(/região|vendedor|produto|categoria/i);
  
  return {
    dimension: hasDimension ? hasDimension[0].toLowerCase() : 'general',
    timeFrame: hasTime ? hasTime[0].toLowerCase() : undefined,
    filters: {}
  };
}