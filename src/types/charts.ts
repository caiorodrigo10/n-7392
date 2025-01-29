export type ChartType = 
  | 'bar' 
  | 'line' 
  | 'area' 
  | 'pie' 
  | 'donut' 
  | 'scatter' 
  | 'bubble' 
  | 'treemap' 
  | 'sankey';

export interface ChartData {
  name: string;
  value: number;
  children?: ChartData[];
}

export interface RelationshipData {
  x: number;
  y: number;
  z?: number;
  name?: string;
}

export interface SankeyData {
  nodes: Array<{ name: string }>;
  links: Array<{
    source: number;
    target: number;
    value: number;
  }>;
}

export interface ChartProps {
  data: ChartData[] | RelationshipData[] | SankeyData;
  type?: ChartType;
  title?: string;
}