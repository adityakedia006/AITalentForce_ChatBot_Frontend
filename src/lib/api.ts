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

export interface VoiceChatResponse {
  transcribed_text: string;
  response: string;
  conversation_history: ChatMessage[];
}

export interface AssistResponse {
  input_type: "text" | "audio";
  transcribed_text?: string;
  response: string;
  conversation_history: ChatMessage[];
}

export interface SpeechToTextResponse {
  text: string;
}

export interface WeatherResponse {
  location: string;
  temperature: number;
  // Backend returns `weather_description`; keep `description` optional for backwards compatibility
  weather_description: string;
  description?: string;
  humidity?: number;
  wind_speed?: number;
}

export interface HealthResponse {
  status: string;
  message: string;
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
 * Check API health status
 */
export async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error("Health check failed");
  }
  return response.json();
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
 * Convert speech to text
 */
export async function speechToText(audioBlob: Blob): Promise<SpeechToTextResponse> {
  const formData = new FormData();
  formData.append("audio_file", audioBlob, "recording.webm");

  const response = await fetch(`${API_BASE_URL}/api/speech-to-text`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || "Failed to transcribe audio");
  }

  return response.json();
}

/**
 * Complete voice chat flow (speech-to-text + chat completion)
 */
export async function voiceChat(
  audioBlob: Blob,
  conversationHistory?: ChatMessage[],
  systemPrompt?: string
): Promise<VoiceChatResponse> {
  const formData = new FormData();
  formData.append("audio_file", audioBlob, "recording.webm");
  
  if (conversationHistory) {
    formData.append("conversation_history", JSON.stringify(conversationHistory));
  }
  
  if (systemPrompt) {
    formData.append("system_prompt", systemPrompt);
  }

  const response = await fetch(`${API_BASE_URL}/api/voice-chat`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || "Failed to process voice chat");
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

/**
 * Get weather information for a location
 */
export async function getWeather(location: string): Promise<WeatherResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/weather?location=${encodeURIComponent(location)}`
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || "Failed to get weather information");
  }

  return response.json();
}

/**
 * Get API information
 */
export async function getApiInfo(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/api/info`);
  
  if (!response.ok) {
    throw new Error("Failed to get API info");
  }
  
  return response.json();
}

/**
 * Translate text between English and Japanese
 */
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
