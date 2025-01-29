import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat-input";
import { Paperclip, Mic, CornerDownLeft } from "lucide-react";

interface ChatInputFormProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  handleAttachFile: () => void;
  handleMicrophoneClick: () => void;
}

export function ChatInputForm({
  input,
  setInput,
  handleSubmit,
  handleAttachFile,
  handleMicrophoneClick,
}: ChatInputFormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
    >
      <ChatInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite sua mensagem..."
        className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
      />
      <div className="flex items-center p-3 pt-0 justify-between">
        <div className="flex">
          <Button variant="ghost" size="icon" type="button" onClick={handleAttachFile}>
            <Paperclip className="size-4" />
          </Button>

          <Button variant="ghost" size="icon" type="button" onClick={handleMicrophoneClick}>
            <Mic className="size-4" />
          </Button>
        </div>
        <Button type="submit" size="sm" className="ml-auto gap-1.5">
          Enviar Mensagem
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  );
}