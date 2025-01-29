import { ParsedData } from "./dataParser";

export class DataTransformer {
  static aggregate(data: ParsedData[], by: string): ParsedData[] {
    const aggregated = data.reduce((acc, item) => {
      const key = item.metadata?.[by] || item.key;
      if (!acc[key]) {
        acc[key] = {
          key,
          value: 0,
          metadata: { count: 0 }
        };
      }
      acc[key].value += item.value;
      acc[key].metadata!.count += 1;
      return acc;
    }, {} as Record<string, ParsedData>);

    return Object.values(aggregated);
  }

  static sort(data: ParsedData[], order: 'asc' | 'desc' = 'desc'): ParsedData[] {
    return [...data].sort((a, b) => 
      order === 'desc' ? b.value - a.value : a.value - b.value
    );
  }

  static limit(data: ParsedData[], limit: number): ParsedData[] {
    return data.slice(0, limit);
  }
}