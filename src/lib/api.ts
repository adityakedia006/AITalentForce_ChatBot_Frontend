// API Service for connecting to FastAPI backend

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:8000";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  message: string;
  conversation_history?: ChatMessage[];
  system_prompt?: string;
}

export interface ChatResponse {
  response: string;
  conversation_history: ChatMessage[];
}

export interface AssistResponse {
  input_type: "text" | "audio";
  transcribed_text?: string;
  response: string;
  conversation_history: ChatMessage[];
}



export interface TranslateRequest {
  text: string;
  target_lang: "en" | "ja";
}

export interface TranslateResponse {
  translated_text: string;
}

/**
 * Convert text to speech (Deepgram TTS)
 */
export async function textToSpeech(
  text: string,
  options?: { model?: string; encoding?: string; container?: string }
): Promise<Blob> {
  const response = await fetch(`${API_BASE_URL}/api/text-to-speech`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, ...options }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || "Failed to synthesize speech");
  }

  return response.blob();
}

/**
 * Send a chat message to the AI assistant
 */
export async function sendChatMessage(
  message: string,
  conversationHistory?: ChatMessage[],
  systemPrompt?: string
): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      conversation_history: conversationHistory,
      system_prompt: systemPrompt,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || "Failed to get chat response");
  }

  return response.json();
}

/**
 * Unified assist endpoint (text or audio)
 */
export async function assist(
  options: {
    message?: string;
    audioBlob?: Blob;
    conversationHistory?: ChatMessage[];
    systemPrompt?: string;
    signal?: AbortSignal;
  }
): Promise<AssistResponse> {
  const formData = new FormData();
  
  if (options.message) {
    formData.append("message", options.message);
  }
  
  if (options.audioBlob) {
    formData.append("audio_file", options.audioBlob, "recording.webm");
  }
  
  if (options.conversationHistory) {
    formData.append("conversation_history", JSON.stringify(options.conversationHistory));
  }
  
  if (options.systemPrompt) {
    formData.append("system_prompt", options.systemPrompt);
  }

  const response = await fetch(`${API_BASE_URL}/api/assist`, {
    method: "POST",
    body: formData,
    signal: options.signal,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || "Failed to process assist request");
  }

  return response.json();
}

export async function translateText(req: TranslateRequest): Promise<TranslateResponse> {
  const response = await fetch(`${API_BASE_URL}/api/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || "Failed to translate text");
  }
  return response.json();
}
