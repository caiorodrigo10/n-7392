import React, { useState } from "react";
import { Mic, PaperclipIcon, SendHorizontal, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AudioRecorder } from "@/services/audioRecorder";

interface ChatInputFormProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleAttachFile: () => void;
  suggestions?: string[];
}

export function ChatInputForm({
  input,
  setInput,
  handleSubmit,
  handleAttachFile,
  suggestions,
}: ChatInputFormProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioRecorder] = useState(() => new AudioRecorder());

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleAudioRecord = async () => {
    if (isRecording) {
      try {
        const audioBlob = await audioRecorder.stopRecording();
        console.log("Áudio gravado:", audioBlob);
        // Aqui você pode implementar o envio do áudio
        // Por exemplo: handleAudioSubmit(audioBlob);
      } catch (error) {
        console.error("Erro ao parar gravação:", error);
      }
      setIsRecording(false);
    } else {
      try {
        await audioRecorder.startRecording();
        setIsRecording(true);
      } catch (error) {
        console.error("Erro ao iniciar gravação:", error);
      }
    }
  };

  return (
    <div className="relative">
      {suggestions && suggestions.length > 0 && (
        <div className="absolute bottom-full left-0 right-0 mb-2 flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm hover:bg-muted/80"
              onClick={() => setInput(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
            className={cn(
              "min-h-[40px] w-full resize-none rounded-md px-4 py-2 pr-20",
              "focus:outline-none focus:ring-2 focus:ring-primary"
            )}
            rows={1}
          />
          <div className="absolute right-1 top-1 flex items-center gap-1">
            <Button
              type="button"
              variant={isRecording ? "destructive" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={handleAudioRecord}
            >
              {isRecording ? (
                <Square className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleAttachFile}
            >
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            <Button type="submit" variant="ghost" size="icon" className="h-8 w-8">
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}