'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, User, UserCheck } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  transcript: string;
}

interface TranscriptionDisplayProps {
  messages: Message[];
  lastTranscript: string;
}

export function TranscriptionDisplay({ messages, lastTranscript }: TranscriptionDisplayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, lastTranscript]);

  return (
    <Card className="h-full flex flex-col bg-white/5 border-white/10 overflow-hidden">
      <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
        <h3 className="text-sm font-semibold mb-4 text-primary flex items-center gap-2">
          <Volume2 className="w-4 h-4" /> Live Transcription
        </h3>
        
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar"
        >
          {messages.length === 0 && !lastTranscript ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 opacity-20">
                <Volume2 className="w-6 h-6" />
              </div>
              <p className="text-sm text-muted-foreground italic">
                Start speaking to begin transcribing...
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                    msg.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-white/10' : 'bg-primary/20 text-primary'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-white/10 rounded-tr-none' 
                      : 'bg-primary/10 border-l-2 border-primary rounded-tl-none'
                  }`}>
                    {msg.transcript}
                  </div>
                </div>
              ))}
              
              {lastTranscript && !messages.find(m => m.transcript === lastTranscript) && (
                <div className="flex gap-3 flex-row-reverse animate-in fade-in duration-200">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 opacity-50">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="max-w-[80%] p-3 rounded-2xl rounded-tr-none bg-white/5 text-sm italic opacity-70">
                    {lastTranscript}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
