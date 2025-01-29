import { AnalysisResult } from './nlpAnalysis';

type ChartType = 'bar' | 'line' | 'pie' | 'scatter' | 'area' | 'funnel';

export function selectChartType(analysis: AnalysisResult): ChartType {
  switch (analysis.intent) {
    case 'trend':
      return 'line';
    case 'distribution':
      return analysis.dimension ? 'pie' : 'bar';
    case 'relationship':
      return 'scatter';
    case 'comparison':
    default:
      return 'bar';
  }
}