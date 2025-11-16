export type Lang = "en" | "ja";

const dict: Record<Lang, Record<string, string>> = {
  en: {
    "app.title": "Anya",
    "app.subtitle": "Your fashion assistant",
    "download": "Download Chat",
    "clear": "Clear",
    "placeholder": "Type your message here...",
    "processingAudio": "Processing audio…",
    "processing": "Processing…",
    "stop": "Stop"
  },
  ja: {
    "app.title": "Anya",
    "app.subtitle": "あなたのファッションアシスタント",
    "download": "チャットをダウンロード",
    "clear": "クリア",
    "placeholder": "ここにメッセージを入力...",
    "processingAudio": "音声を処理中…",
    "processing": "処理中…",
    "stop": "停止"
  }
};

export function t(key: string, lang: Lang = "en"): string {
  return dict[lang][key] ?? dict.en[key] ?? key;
}
