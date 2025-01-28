import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export const AiChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90 shadow-lg"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[400px] h-[600px] bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="p-4">
            <h2 className="text-lg font-semibold">AI Assistant</h2>
            {/* Chat content will go here */}
          </div>
        </div>
      )}
    </div>
  );
};
