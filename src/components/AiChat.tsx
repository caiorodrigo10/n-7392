import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const AiChat = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <Brain className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>AI Assistant</SheetTitle>
            <SheetDescription>
              Como posso ajudar você hoje?
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            {/* Chat content will be added here later */}
            <div className="h-[500px] flex items-center justify-center text-gray-500">
              Chat interface será implementada em breve
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};