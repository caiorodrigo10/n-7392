export interface AnalysisResult {
  dimension: string;
  timeFrame?: string;
  metric?: string;
  filters?: Record<string, any>;
  type: 'comparison' | 'trend' | 'distribution' | 'relationship' | 'hierarchy' | 'flow';
}

export function analyzeQuery(query: string): AnalysisResult {
  const hasTime = query.match(/tempo|período|mês|ano|semana/i);
  const hasDimension = query.match(/região|vendedor|produto|categoria/i);
  const hasHierarchy = query.match(/hierarquia|estrutura|organização/i);
  const hasFlow = query.match(/fluxo|processo|sequência/i);
  
  let type: AnalysisResult['type'] = 'comparison';
  
  if (hasTime) type = 'trend';
  if (hasHierarchy) type = 'hierarchy';
  if (hasFlow) type = 'flow';
  
  return {
    dimension: hasDimension ? hasDimension[0].toLowerCase() : 'general',
    timeFrame: hasTime ? hasTime[0].toLowerCase() : undefined,
    type,
    filters: {}
  };
}