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
}

export interface RelationshipData {
  x: number;
  y: number;
  z?: number;
  name?: string;
}

export interface ChartProps {
  data: ChartData[] | RelationshipData[];
  type?: ChartType;
  title?: string;
}