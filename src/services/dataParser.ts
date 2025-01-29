import { Deal, DealsState } from "@/types/deals";

export interface ParsedData {
  key: string;
  value: number;
  metadata?: Record<string, any>;
}

export class DataParser {
  static parseDeals(deals: Deal[]): ParsedData[] {
    return deals.map(deal => ({
      key: deal.title,
      value: parseFloat(deal.value.replace(/[^0-9.-]+/g, "")),
      metadata: {
        company: deal.company,
        assignee: deal.assignee.name,
        date: deal.stageEnteredAt
      }
    }));
  }

  static parseStageData(dealsState: DealsState): ParsedData[] {
    return Object.entries(dealsState).map(([stage, deals]) => ({
      key: stage,
      value: deals.reduce((sum, deal) => 
        sum + parseFloat(deal.value.replace(/[^0-9.-]+/g, "")), 0
      ),
      metadata: {
        count: deals.length,
        avgValue: deals.length > 0 
          ? parseFloat((deals.reduce((sum, deal) => 
              sum + parseFloat(deal.value.replace(/[^0-9.-]+/g, "")), 0
            ) / deals.length).toFixed(2))
          : 0
      }
    }));
  }
}