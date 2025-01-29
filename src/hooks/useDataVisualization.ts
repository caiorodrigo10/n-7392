import { useState } from 'react';
import { analyzeIntent, determineVisualizationType, processDealsData } from '@/services/dataAnalysis';
import { DealsState } from '@/types/deals';

export function useDataVisualization(deals: DealsState) {
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [visualizationType, setVisualizationType] = useState<string>('bar');

  const analyzeData = (query: string) => {
    console.log('Analisando query:', query);
    
    // Analisa a intenção da query
    const context = analyzeIntent(query);
    
    // Processa os dados baseado no contexto
    const processedData = processDealsData(deals, context);
    
    // Determina o melhor tipo de visualização
    const vizType = determineVisualizationType(context, processedData);
    
    setCurrentQuery(query);
    setVisualizationType(vizType);
    
    return {
      data: processedData,
      type: vizType,
      context
    };
  };

  return {
    currentQuery,
    visualizationType,
    analyzeData
  };
}