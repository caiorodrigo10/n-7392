import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat-input";
import { Paperclip, Mic, CornerDownLeft, Loader2 } from "lucide-react";
import { AudioRecorder } from "@/services/audioRecorder";
import { transcribeAudio } from "@/services/openai";
import { toast } from "@/hooks/use-toast";

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
}: ChatInputFormProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioRecorder] = useState(() => new AudioRecorder());

  const handleMicrophoneClick = async () => {
    try {
      if (!isRecording) {
        await audioRecorder.startRecording();
        setIsRecording(true);
        toast({
          title: "Gravação iniciada",
          description: "Fale sua mensagem. Clique novamente para finalizar.",
        });
      } else {
        setIsRecording(false);
        const audioBlob = await audioRecorder.stopRecording();
        toast({
          title: "Processando áudio",
          description: "Aguarde enquanto transcrevemos sua mensagem...",
        });
        
        const transcription = await transcribeAudio(audioBlob);
        setInput(transcription);
        
        toast({
          title: "Transcrição concluída",
          description: "Sua mensagem foi transcrita com sucesso!",
        });
      }
    } catch (error) {
      console.error('Error handling audio:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar o áudio. Tente novamente.",
        variant: "destructive",
      });
      setIsRecording(false);
    }
  };

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

          <Button 
            variant="ghost" 
            size="icon" 
            type="button" 
            onClick={handleMicrophoneClick}
            className={isRecording ? "text-red-500 animate-pulse" : ""}
          >
            {isRecording ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Mic className="size-4" />
            )}
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