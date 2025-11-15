export type Lang = "en" | "ja";

const dict: Record<Lang, Record<string, string>> = {
  en: {
    "app.title": "AI Assistant",
    "app.subtitle": "Your intelligent chat companion",
    "download": "Download History",
    "placeholder": "Type your message here...",
    "processingAudio": "Processing audio…",
    "processing": "Processing…",
    "stop": "Stop",
    "toast.audioProcessed.title": "Audio Processed",
    "toast.audioProcessed.desc": "Your voice message was successfully transcribed and processed.",
    "toast.error.title": "Error",
    "toast.error.generic": "Something went wrong. Please try again.",
    "recording.title": "Recording...",
    "recording.subtitle": "Speak clearly into your microphone",
     "recording.stop": "Stop Recording",
     "wake.on": "Wake: On",
     "wake.off": "Wake: Off",
     "wake.unsupported": "Wake word not supported in this browser",
     "wake.detected": "Wake word detected"
  },
  ja: {
    "app.title": "AIアシスタント",
    "app.subtitle": "あなたの賢いチャットパートナー",
    "download": "履歴をダウンロード",
    "placeholder": "ここにメッセージを入力...",
    "processingAudio": "音声を処理中…",
    "processing": "処理中…",
    "stop": "停止",
    "toast.audioProcessed.title": "音声を処理しました",
    "toast.audioProcessed.desc": "音声メッセージの文字起こしと処理が完了しました。",
    "toast.error.title": "エラー",
    "toast.error.generic": "問題が発生しました。もう一度お試しください。",
    "recording.title": "録音中...",
    "recording.subtitle": "マイクに向かってはっきり話してください",
     "recording.stop": "録音を停止",
     "wake.on": "ウェイク: オン",
     "wake.off": "ウェイク: オフ",
     "wake.unsupported": "このブラウザはウェイクワード非対応です",
     "wake.detected": "ウェイクワードを検出しました"
  }
};

export function t(key: string, lang: Lang = "en"): string {
  return dict[lang][key] ?? dict.en[key] ?? key;
}
