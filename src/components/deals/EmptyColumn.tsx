import { Inbox } from "lucide-react";

export const EmptyColumn = () => {
  return (
    <div className="flex flex-col items-center justify-center h-32 text-[#8E9196]/40">
      <Inbox className="w-8 h-8 mb-2" />
      <p className="text-sm">Etapa vazia</p>
    </div>
  );
};