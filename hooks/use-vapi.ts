import { useState, useEffect, useCallback, useRef } from "react";
import Vapi from "@vapi-ai/web";

export function useVapi() {
  const vapiRef = useRef<Vapi | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isThinking, setIsThinking] = useState(false); // AI is processing
  const [isSpeaking, setIsSpeaking] = useState(false); // AI is talking
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [lastTranscript, setLastTranscript] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Initialize Vapi instance
  useEffect(() => {
    if (typeof window !== 'undefined' && !vapiRef.current) {
        const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
        if (!publicKey) {
            console.error("Vapi Public Key is missing!");
        }
        vapiRef.current = new Vapi(publicKey || "");
    }
    
    const vapi = vapiRef.current;
    if (!vapi) return;
    const onCallStart = () => {
      console.log('Vapi Call started');
      setIsCallActive(true);
      setIsThinking(false);
      setIsSpeaking(false);
      setError(null);
    };

    const onCallEnd = () => {
      console.log('Vapi Call ended');
      setIsCallActive(false);
      setIsThinking(false);
      setIsSpeaking(false);
      setVolumeLevel(0);
    };

    const onSpeechStart = () => {
      console.log('Assistant started speaking');
      setIsSpeaking(true);
      setIsThinking(false);
    };

    const onSpeechEnd = () => {
      console.log('Assistant stopped speaking');
      setIsSpeaking(false);
    };

    const onVolumeLevel = (level: number) => {
      setVolumeLevel(level);
    };

    const onMessage = (message: any) => {
      if (message.type === "transcript") {
        setLastTranscript(message.transcript);
        // Only add to history if it's final
        if (message.transcriptType === "final") {
          setMessages((prev) => [...prev, message]);
        }
      }
      
      // Handle assistant thinking state via message events if possible
      // Or use the 'speech-start' as an indicator that thinking ended
      console.log("Vapi Message:", message);
    };

    const onVapiError = (err: any) => {
      console.error("Vapi Error:", err);
      setError(err.message || 'Unknown Vapi error');
      setIsCallActive(false);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("volume-level", onVolumeLevel);
    vapi.on("message", onMessage);
    vapi.on("error", onVapiError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("volume-level", onVolumeLevel);
      vapi.off("message", onMessage);
      vapi.off("error", onVapiError);
    };
  }, []);

  const startCall = useCallback(async (assistantOverrides?: any) => {
    const vapi = vapiRef.current;
    if (!vapi) return;

    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
    if (!assistantId) {
      const errorMsg = "NEXT_PUBLIC_VAPI_ASSISTANT_ID is not set in environment";
      console.error(errorMsg);
      setError(errorMsg);
      return;
    }
    
    try {
      setError(null);
      await vapi.start(assistantId, assistantOverrides);
    } catch (err: any) {
      console.error('Failed to start Vapi call:', err);
      setError(err.message || 'Failed to start call');
    }
  }, []);

  const endCall = useCallback(() => {
    vapiRef.current?.stop();
  }, []);

  const toggleCall = useCallback(() => {
    if (isCallActive) {
      endCall();
    } else {
      startCall();
    }
  }, [isCallActive, startCall, endCall]);

  return {
    isCallActive,
    isThinking,
    isSpeaking,
    volumeLevel,
    lastTranscript,
    messages,
    error,
    startCall,
    endCall,
    toggleCall,
  };
}
