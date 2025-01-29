import { useState } from 'react';
import { analyzeQuery } from '@/services/nlpAnalysis';
import { selectChartType } from '@/services/chartSelector';
import { processDealsData, DataPoint } from '@/services/dataAccess';
import { DealsState } from '@/types/deals';

export function useDataVisualization(deals: DealsState) {
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [visualizationType, setVisualizationType] = useState<string>('bar');
  const [processedData, setProcessedData] = useState<DataPoint[]>([]);

  const analyzeData = (query: string) => {
    // Analisa a query usando NLP
    const analysis = analyzeQuery(query);
    
    // Seleciona o tipo de visualização apropriado
    const chartType = selectChartType(analysis);
    
    // Processa os dados de acordo com a análise
    const data = processDealsData(deals, analysis.dimension, analysis.timeFrame);
    
    setCurrentQuery(query);
    setVisualizationType(chartType);
    setProcessedData(data);
    
    return {
      data,
      type: chartType,
      analysis
    };
  };

  return {
    currentQuery,
    visualizationType,
    processedData,
    analyzeData
  };
}