import { Deal, DealsState } from "@/types/deals";
import { toast } from "@/hooks/use-toast";
import { triggerWinConfetti } from "@/utils/confetti";

export const handleDealStatusChange = (
  deals: DealsState,
  setDeals: (deals: DealsState) => void,
  dealId: string, 
  status: string
): boolean => {
  let foundDeal: Deal | null = null;
  let sourceColumn: keyof DealsState | null = null;

  // Find the deal and its source column
  Object.entries(deals).forEach(([column, columnDeals]) => {
    const deal = columnDeals.find((d) => d.id === dealId);
    if (deal) {
      foundDeal = deal;
      sourceColumn = column as keyof DealsState;
    }
  });

  if (foundDeal && sourceColumn) {
    // Remove the deal from its source column
    setDeals({
      ...deals,
      [sourceColumn]: deals[sourceColumn].filter((d) => d.id !== dealId),
    });

    // Show appropriate notification and animation
    if (status === 'won') {
      setTimeout(() => {
        triggerWinConfetti();
        toast({
          title: "🎉 Deal Won!",
          description: `Congratulations! ${foundDeal!.title} has been won!`,
          className: "animate-enter",
        });
      }, 100);
    } else {
      toast({
        title: `Deal marked as ${status}`,
        description: `${foundDeal!.title} has been marked as ${status}`,
        className: "animate-enter",
      });
    }

    return true;
  }

  return false;
};