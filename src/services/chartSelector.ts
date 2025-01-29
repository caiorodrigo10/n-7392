import { ChartType } from '@/types/charts';

interface AnalysisResult {
  type: 'comparison' | 'trend' | 'distribution' | 'relationship' | 'hierarchy' | 'flow';
  dimension?: string;
  timeFrame?: string;
}

export function selectChartType(analysis: AnalysisResult): ChartType {
  switch (analysis.type) {
    case 'trend':
      return 'line';
    case 'distribution':
      return analysis.dimension ? 'pie' : 'bar';
    case 'relationship':
      return 'scatter';
    case 'hierarchy':
      return 'treemap';
    case 'flow':
      return 'sankey';
    case 'comparison':
    default:
      return 'bar';
  }
}