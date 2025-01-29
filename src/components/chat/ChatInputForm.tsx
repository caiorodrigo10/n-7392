import { PaperclipIcon, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent } from "react";

interface ChatInputFormProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  handleAttachFile: () => void;
  suggestions?: string[];
}

export function ChatInputForm({
  input,
  setInput,
  handleSubmit,
  handleAttachFile,
  suggestions = [],
}: ChatInputFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInput(suggestion)}
              type="button"
              className="text-xs"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}
      
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleAttachFile}
        >
          <PaperclipIcon className="h-4 w-4" />
        </Button>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="min-h-[44px] w-full resize-none"
        />
        <Button type="submit" size="icon" disabled={!input.trim()}>
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}